{
  description = "H. Sigrist & Partner Knowledge Base";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs?ref=nixos-25.11-small";
  };

  outputs =
    { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs { inherit system; };
    in
    {
      devShells.${system}.default = pkgs.mkShell {
        buildInputs = [ pkgs.nodejs_24 ];
      };
    };
}
