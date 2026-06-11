# Knowledge Base

The official H. Sigrist & Partner AG knowledge base.

## Quickstart

With Node.js ≥ 20 installed:

```shell
npm run docs:build
npm run docs:preview
```

If you are using Nix, you can preview the static site directly:

```shell
nix run
```

## Development

Generate the static site:

```shell
# Static site under 'docs/.vitepress/dist'
npm run docs:build
```

Preview the generated static site:

```shell
# Reachable via 'http://localhost:4173/docs/'
npm run docs:preview
```

Alternatively, start the VitePress development server with live reload:

```shell
# This does not require a prior `docs:build`
npm run docs:dev
```

### Nix Workflow

Verify the build:

```shell
nix flake check
```

Generate the static site:

```shell
# Static site under 'result'
nix build
```

Preview the generated static site:

```shell
# Reachable via 'http://localhost:4173/docs/'
nix run
```

Enter the development shell:

```shell
nix develop
```

> [!TIP]
> All documented `npm` commands work inside the development shell.

### Repository Maintenance

Refresh the pinned Git metadata:

```shell
# Updates 'nix/remote.json' to point to remote HEAD
nix run .#updateGitHistory
```

> [!IMPORTANT]
> VitePress reads the Git history of every file to populate
> the `lastUpdated` timestamp shown at the bottom of each page.
> Since Nix flakes do not include Git metadata automatically,
> it must be pinned explicitly.
