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

        npmDefaults = {
          pname = "knowledge-base";
          version = "0.0.1";
          src = self;

          # VitePress requires Git and Node.js ≥ 20
          nativeBuildInputs = [ pkgs.git ];
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

        # Since the Git history itself isn't available when building with Nix,
        # VitePress cannot generate its list of `lastUpdated` timestamps.
        # Instead, `docs/.vitepress/timestamps.json` is injected,
        # which is updated whenever this script is run locally.
        updateTimestamps = pkgs.writeShellApplication {
          name = "update-timestamps";
          runtimeInputs = [
            pkgs.git
            pkgs.jq
          ];
          inheritPath = false;
          text = ''
            # Obtain the latest timestamp for every Markdown file
            cd "$(git rev-parse --show-toplevel)/${base}"
            git ls-files '*.md' | while IFS= read -r file; do
              timestamp="$(git log -1 --format=%ct -- "$file")"
              printf '{ "%s": %s }\n' "$file" "$timestamp"
            done | jq --slurp 'add // {}' > .vitepress/timestamps.json
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

          updateTimestamps = {
            type = "app";
            program = lib.getExe updateTimestamps;
            meta.description = "Update page timestamps based on Git history";
          };
        };

        # Verify that the VitePress site builds successfully
        checks.default = self.packages.${system}.default;
      }
    );
}
