import { ConnectPlugin, ComponentConfig, ComponentData, PrismLang, PluginContext } from '@zeplin/cli';

import { readFileSync } from 'fs';

export default class implements ConnectPlugin {
    private source: any;
    /**
     * CLI invokes this method once the package is loaded.
     * pluginContext contains custom parameters defined in the configuration
     * file.
     *
     * This method is optional, implement it to initialize plugin locals and
     * so on.
     */
    async init({ config }: PluginContext): Promise<void> {
        if (config?.sourcePath) {
            this.source = JSON.parse(readFileSync(config.sourcePath as string, 'utf8'));
        }
    }

    /**
     * CLI invokes this method for each component in the configuration file.
     */
    async process(context: ComponentConfig): Promise<ComponentData> {
        const { docs, tag, props } = this.source.components.find(
            (item: { filePath: string }) => item.filePath.indexOf(context.path) > -1
        );

        const propsSnippet = props
            .map((prop: { name: string; type: string }) => {
                return `${prop.name}={${prop.type}}`;
            })
            .join('\n');

        return {
            description: docs,
            snippet: `<${tag}>
            ${propsSnippet}
            </${tag}>`,
            lang: PrismLang.HTML,
        };
    }

    /**
     * CLI invokes this method for each component in the configuration file
     * to determine if the plugin should process the component.
     */
    supports(context: ComponentConfig): boolean {
        return true;
    }
}
