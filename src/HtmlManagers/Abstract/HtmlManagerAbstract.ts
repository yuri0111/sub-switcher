import HtmlManagerI from "./HtmlManagerI";

export default abstract class HtmlManagerAbstract implements HtmlManagerI {
    static hasSubBlock: () => boolean;
    static blockWithSubSelector: string;

    abstract getSubHistoryBlock(): HTMLInputElement;

    abstract getBlockWithSub(): HTMLInputElement;

    abstract getBlockWithSubChild(): HTMLInputElement;

    abstract addDivForSubsHistory(newElForSub: HTMLInputElement): HTMLInputElement;
}