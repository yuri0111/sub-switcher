
export default abstract class HtmlManagerAbstract{
    static hasSubBlock: () => boolean;
    static blockWithSubSelector: string;
    static blockWithSubHistorySelector: string;

    abstract beforeInit(): void;

    abstract getSubHistoryBlock(): HTMLInputElement;

    abstract getBlockWithSub(): HTMLInputElement;

    abstract getSpanForHistory(): HTMLInputElement;

    abstract addDivForSubsHistory(): HTMLInputElement;

    abstract parseSubs(el: HTMLInputElement): string;
}