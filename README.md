<!-- markdownlint-disable MD030 -->

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./docs/static/img/idrflow-logo-color-blue-bg.svg">
  <img src="./docs/static/img/idrflow-logo-color-black-solid.svg" alt="idrflow logo">
</picture>

[![PyPI - License](https://img.shields.io/badge/license-MIT-orange)](https://opensource.org/licenses/MIT)
[![PyPI - Downloads](https://img.shields.io/pypi/dm/langflow?style=flat-square)](https://pypistats.org/packages/langflow)

idrflow is a visual workflow builder for AI agents and applications. It provides a rebranded product experience on top of a Langflow-compatible runtime, so some package names, imports, and CLI commands still use `langflow`.

> **Canonical repository:** idrflow is now maintained from the internal GitLab repository at `http://218.50.209.93:9001/peter/idrflow.git`. The legacy GitHub fork remains a historical upstream reference during the cutover window.
>
> **Note:** idrflow currently runs on a Langflow-compatible runtime. Installation and execution commands still use the `langflow` package and CLI names.

## Highlights

- Visual flow builder for agentic and RAG workflows
- Built-in API and MCP server surfaces
- Custom Python components and source-level extensibility
- Local OSS runtime, Docker deployment, and desktop-ready UX work

## Quickstart

Install the runtime package:

```shell
uv pip install langflow -U
```

Run idrflow locally:

```shell
uv run langflow run
```

idrflow starts at `http://127.0.0.1:7860`.

## Desktop

idrflow Desktop distribution URLs are still being finalized. Until those installers are published, use the OSS Python package or Docker workflow described in the docs.

## Docker

You can run idrflow by using the current upstream-compatible container image:

```shell
docker run -p 7860:7860 langflowai/langflow:latest
```

The `langflowai/langflow` image name is retained here as an upstream runtime reference until idrflow-specific image publishing is available.

## Docs

- [Install idrflow](./docs/docs/Get-Started/get-started-installation.mdx)
- [Quickstart](./docs/docs/Get-Started/get-started-quickstart.mdx)
- [Deployment overview](./docs/docs/Deployment/deployment-overview.mdx)
- [Docker deployment](./docs/docs/Deployment/deployment-docker.mdx)
- [Security policy](./SECURITY.md)
- [Contributing guide](./CONTRIBUTING.md)

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md) for GitLab merge request and issue workflow guidance, and treat any remaining GitHub links in the docs as upstream Langflow source-code references rather than idrflow brand channels.
