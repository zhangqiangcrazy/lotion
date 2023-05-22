export declare function registerBlock(id: string, label: string, component: any, icon?: string, canSplit?: boolean): void;
export declare function markdownToHtml(mdString: string): string;
export declare function htmlToMarkdown(htmlString: string): string;
export declare function containsClientPoint(element: any, { x, y }: {
    x?: number | undefined;
    y?: number | undefined;
}): boolean;
