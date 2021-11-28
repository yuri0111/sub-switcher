import HtmlManagerI from "./HtmlManagerI";

export default abstract class HtmlManagerAbstract implements HtmlManagerI {
    static hasSubBlock: () => boolean;
    static blockWithSubSelector: string;

    abstract getSubHistoryBlock(): HTMLInputElement;

    abstract getBlockWithSub(): HTMLInputElement;

    abstract getSpanForHistory(): HTMLInputElement;

    abstract addDivForSubsHistory(): HTMLInputElement;
}