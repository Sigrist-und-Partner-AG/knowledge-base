{
  description = "H. Sigrist & Partner AG Knowledge Base";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.11";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    let
      systems = [
        "x86_64-linux"
        "aarch64-linux"
      ];
    in
    flake-utils.lib.eachSystem systems (
      system:
      let
        pkgs = import nixpkgs { inherit system; };
        inherit (pkgs) lib;

        # `self` contains the flake source tree, but not the `.git`
        # directory, so fetch a full remote clone for Git metadata.
        # The more recent this is, the better the timestamps will be.
        remoteFile = "nix/remote.json";
        remote = builtins.fromJSON (builtins.readFile (./. + "/${remoteFile}"));
        remoteSrc = pkgs.fetchFromGitHub remote;

        # Filter down the remote source tree to only the `.git` directory.
        # It will be symlinked into the source root during the build.
        gitHistory = lib.cleanSourceWith {
          name = "${remote.repo}-git";
          src = remoteSrc;
          filter =
            path: type:
            let
              pathStr = toString path;
              gitDir = "${remoteSrc}/.git";
            in
            pathStr == gitDir || lib.hasPrefix "${gitDir}/" pathStr;
        };

        npmDefaults = {
          pname = remote.repo;
          version = "0.0.1";
          src = self;

          # VitePress invokes Git to obtain `lastUpdated` timestamps
          nativeBuildInputs = [ pkgs.git ];
          postUnpack = ''
            ln -s ${gitHistory}/.git "$sourceRoot/.git"
          '';

          # VitePress requires Node.js ≥ 20
          nodejs = pkgs.nodejs_24;

          # Derive NPM dependency hashes from `package-lock.json`
          npmDeps = pkgs.importNpmLock {
            npmRoot = self;
          };
          npmConfigHook = pkgs.importNpmLock.npmConfigHook;
        };

        # Configure Caddy Web Server
        url = "http://localhost:4173";
        base = "docs";
        caddyfile = pkgs.writeText "Caddyfile" ''
          {
            log {
              level ERROR
              format console
            }

            # Disable local control endpoint
            admin off
          }

          ${url} {
            root * ${self.packages.${system}.default}

            # Redirect `/` and `/docs` to `/docs/`
            redir / /${base}/ 308
            redir /${base} /${base}/ 308

            # Implement canonical `cleanUrls` behavior
            handle_path /${base}/* {
              try_files {path} {path}.html {path}/ =404
              file_server
            }

            # Display 404 page for missing/forbidden pages
            handle_errors 404 403 {
              rewrite * /404.html
              file_server
            }
          }
        '';

        # Reimplement `docs:preview` by serving the built site with Caddy.
        # VitePress cannot be used here because it always serves from
        # `docs/.vitepress/dist` and doesn't support the `--outDir` flag.
        serveDocs = pkgs.writeShellApplication {
          name = "serve-docs";
          runtimeInputs = [ pkgs.caddy ];
          inheritPath = false;
          text = ''
            echo Built site served at ${url}/${base}/

            # Caddy complains if the Caddyfile is not formatted using tabs,
            # so auto-format it and pass it to the server via standard input.
            { caddy fmt ${caddyfile} 2>/dev/null || :; } \
            | exec caddy run --adapter caddyfile --config -
          '';
        };

        updateGitHistory = pkgs.writeShellApplication {
          name = "update-git-history";
          runtimeInputs = [
            pkgs.git
            pkgs.nix-prefetch-github
          ];
          inheritPath = false;
          text = ''
            prefetch() {
              nix-prefetch-github \
                --deep-clone \
                --leave-dot-git \
                ${remote.owner} \
                ${remote.repo}
            }

            if remote_json="$(prefetch 2>/dev/null)"; then
              printf '%s\n' "$remote_json" > ${remoteFile}
            else
              error=$?
              >&2 echo "Failed to update '${remoteFile}' (exit code $error)."
              >&2 echo "Are you connected to the internet?"
              exit $error
            fi
          '';
        };
      in
      {
        devShells.default = pkgs.mkShell {
          packages = npmDefaults.nativeBuildInputs ++ [ npmDefaults.nodejs ];
        };

        packages.default = pkgs.buildNpmPackage (
          npmDefaults
          // {
            npmBuildScript = "docs:build";
            installPhase = ''
              mkdir -p "$out/"
              cp -R docs/.vitepress/dist/. "$out/"
            '';

            # VitePress hangs if "$CI" is unset
            CI = "1";

            meta = {
              description = "The official H. Sigrist & Partner AG knowledge base";
              homepage = "https://dosiersysteme.ch/docs";
              license = lib.licenses.cc-by-40;
              platforms = systems;
            };
          }
        );

        apps = {

          default = {
            type = "app";
            program = lib.getExe serveDocs;
            meta.description = "Serve the knowledge base locally";
          };

          updateGitHistory = {
            type = "app";
            program = lib.getExe updateGitHistory;
            meta.description = "Pin Git metadata to remote HEAD for VitePress";
          };
        };

        # Verify that the VitePress site builds successfully
        checks.default = self.packages.${system}.default;
      }
    );
}
