import { BlockComponents, availableBlockTypes } from './types';
export function registerBlock(id, label, component, icon = 'bi-text-left', canSplit = false) {
    BlockComponents[id] = component;
    availableBlockTypes.push({
        type: 'Turn into',
        icon,
        label,
        blockType: id,
        canSplit,
    });
}
export function markdownToHtml(mdString) {
    // Adapted from https://randyperkins2k.medium.com/writing-a-simple-markdown-parser-using-javascript-1f2e9449a558
    return mdString
        .replace(/\\\*/g, '\\*\\*')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replaceAll('\\<em>\\</em>', '*')
        // .replace(/(?<!\\)\*(?<!\\)\*(.*?)(?<!\\)\*(?<!\\)\*/g, '<strong>$1</strong>')
        // .replace(/(?<!\\)\*(.*?)(?<!\\)\*/g, '<em>$1</em>')
        // .replace(/\\\*/g, '*')
        .trim();
}
export function htmlToMarkdown(htmlString) {
    return htmlString
        .replaceAll('<p>', '')
        .replaceAll('</p>', '')
        .replaceAll('<strong>', '**')
        .replaceAll('</strong>', '**')
        .replaceAll('<em>', '*')
        .replaceAll('</em>', '*')
        .replaceAll(/\<br.*?\>/g, '');
}
export function containsClientPoint(element, { x = 0, y = 0 }) {
    if (!element)
        return false;
    let rect = element.getBoundingClientRect();
    return rect.x <= x && x <= rect.x + rect.width &&
        rect.y <= y && y <= rect.y + rect.height;
}
//# sourceMappingURL=utils.js.map