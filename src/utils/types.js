import TextBlock from '@/components/blocks/TextBlock.vue';
import DividerBlock from '@/components/blocks/DividerBlock.vue';
import HeadingBlock from '@/components/blocks/HeadingBlock.vue';
import QuoteBlock from '@/components/blocks/QuoteBlock.vue';
export var BlockType;
(function (BlockType) {
    BlockType["Text"] = "TEXT";
    BlockType["H1"] = "H1";
    BlockType["H2"] = "H2";
    BlockType["H3"] = "H3";
    BlockType["Divider"] = "DIVIDER";
    BlockType["Quote"] = "QUOTE";
})(BlockType || (BlockType = {}));
export const BlockComponents = {
    [BlockType.Text]: TextBlock,
    [BlockType.H1]: HeadingBlock,
    [BlockType.H2]: HeadingBlock,
    [BlockType.H3]: HeadingBlock,
    [BlockType.Divider]: DividerBlock,
    [BlockType.Quote]: QuoteBlock,
};
export const textBlockMap = [BlockType.Text, BlockType.Quote];
export const isTextBlock = (type) => {
    return textBlockMap.some(textBlock => textBlock === type);
};
export const availableBlockTypes = [
    {
        type: 'Turn into',
        icon: 'bi-text-left',
        label: 'Text',
        blockType: BlockType.Text,
        canSplit: true,
    }, {
        type: 'Turn into',
        icon: 'bi-type-h1',
        label: 'Heading 1',
        blockType: BlockType.H1,
        canSplit: true,
    }, {
        type: 'Turn into',
        icon: 'bi-type-h2',
        label: 'Heading 2',
        blockType: BlockType.H2,
        canSplit: true,
    }, {
        type: 'Turn into',
        icon: 'bi-type-h3',
        label: 'Heading 3',
        blockType: BlockType.H3,
        canSplit: true,
    }, {
        type: 'Turn into',
        icon: 'bi-hr',
        label: 'Divider',
        blockType: BlockType.Divider,
        canSplit: false,
    }, {
        type: 'Turn into',
        icon: 'bi-quote',
        label: 'Quote',
        blockType: BlockType.Quote,
        canSplit: true,
    },
];
//# sourceMappingURL=types.js.map