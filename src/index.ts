import { ConnectPlugin, ComponentConfig, ComponentData, PrismLang, PluginContext } from '@zeplin/cli';

import { readFileSync } from 'fs';
import pug from 'pug';
import path from 'path';

import { DocsSources } from './types/stencil-public-docs';

export default class implements ConnectPlugin {
    private supportedFileExtensions = ['.ts', '.tsx'];
    private source: DocsSources;

    template = pug.compileFile(path.join(__dirname, 'template/snippet.pug'));
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
            try {
                this.source = JSON.parse(readFileSync(config.sourcePath as string, 'utf8')) as DocsSources;
            } catch (error) {
                throw new Error(`Can't parse your documentation json file. More information in: https://xxxx.com`);
            }
        } else {
            throw new Error('You need to pass a valid document json file. More information in: https://xxxx.com');
        }
    }

    /**
     * CLI invokes this method for each component in the configuration file.
     */
    async process(context: ComponentConfig): Promise<ComponentData> {
        const { docs, tag, props } =
            this.source.components.find((item: { filePath: string }) => item.filePath.indexOf(context.path) > -1) || {};

        return {
            description: `${docs}\n\nLast update: ${this.source.timestamp}`,
            snippet: this.template({
                tag,
                props: props?.map((prop: { name: string; type: string }) => {
                    return {
                        ...prop,
                        type: prop.type.replace(/\"/g, ''),
                    };
                }),
            }),
            lang: PrismLang.HTML,
        };
    }

    /**
     * CLI invokes this method for each component in the configuration file
     * to determine if the plugin should process the component.
     */
    supports(x: ComponentConfig): boolean {
        const fileExtension = path.extname(x.path);
        return this.supportedFileExtensions.includes(fileExtension);
    }
}
