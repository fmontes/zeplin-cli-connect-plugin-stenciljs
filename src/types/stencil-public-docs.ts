export interface DocsSources {
    components: DocsComponents[];
    timestamp: string
}

export interface DocsComponents {
    docs: string;
    tag: string;
    props: DocsComponentsProps[];
    filePath: string;
}

export interface DocsComponentsProps {
    name: string;
    type: string;
}
