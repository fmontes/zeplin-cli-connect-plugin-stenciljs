# Zeplin CLI Stencil JS Plugin

[Zeplin CLI](https://github.com/zeplin/cli) plugin to generate descriptions and code snippets for React components.

## Installation

Install the plugin using npm.

```sh
npm install -g zeplin-cli-connect-plugin-stenciljs
```

## Usage

1. Generate the [StencilJS](https://stenciljs.com/) json docs, update you `stencil.config.ts` file and inside the `outputTargets` property add:

```JSON
outputTargets: [
    { 
        "type": "docs-json",
        "file": "path/to/file.json"
    },
]
```
and then run `npm run build` to generate the file

2. In your `.zeplin/components.json` configuration file, add the plugin and pass the stencil docs file:

```JSON
"plugins": [
    {
        "name": "zeplin-cli-connect-plugin-stenciljs",
        "config": {
            "sourcePath": "path/to/file.json"
        }
    }
]
```

3. Run CLI `connect` command using the plugin.

```sh
zeplin connect
```

## About Connected Components

[Connected Components](https://blog.zeplin.io/introducing-connected-components-components-in-design-and-code-in-harmony-aa894ed5bd95) in Zeplin lets you access components in your codebase directly on designs in Zeplin, with links to Storybook, GitHub and any other source of documentation based on your workflow. 🧩

[Zeplin CLI](https://github.com/zeplin/cli) uses plugins like this one to analyze component source code and publishes a high-level overview to be displayed in Zeplin.
