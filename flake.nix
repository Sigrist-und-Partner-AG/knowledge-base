{
  description = "H. Sigrist & Partner AG Knowledge Base";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.11";
  };

  outputs =
    { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs { inherit system; };
      inherit (pkgs) lib;

      npmDefaults = {
        pname = "knowledge-base";
        version = "0.0.1";
        src = self;

        # VitePress invokes Git to obtain `lastUpdated` timestamps
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
        text = ''
          echo Built site served at ${url}/${base}/

          { 2>/dev/null caddy fmt ${caddyfile} || :; } \
          | exec caddy run --adapter caddyfile --config -
        '';
      };
    in
    {
      devShells.${system}.default = pkgs.mkShell {
        packages = npmDefaults.nativeBuildInputs ++ [ npmDefaults.nodejs ];
      };

      packages.${system}.default = pkgs.buildNpmPackage (
        npmDefaults
        // {
          npmBuildScript = "docs:build";
          installPhase = ''
            mkdir -p "$out/"
            cp -R docs/.vitepress/dist/. "$out/"
          '';

          # VitePress hangs if "$CI" is unset
          CI = "1";
        }
      );

      apps.${system}.default = {
        type = "app";
        program = lib.getExe serveDocs;
        meta.description = "Serve the knowledge base locally";
      };

      # Verify that the VitePress site builds successfully
      checks.${system}.default = self.packages.${system}.default;
    };
}
