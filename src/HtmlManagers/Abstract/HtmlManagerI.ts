export default interface HtmlManagerI {
    getSubHistoryBlock(): HTMLInputElement;

    getBlockWithSub(): HTMLInputElement;

    getSpanForHistory(): HTMLInputElement;

    addDivForSubsHistory(): HTMLInputElement;

    parseSubs(el: HTMLInputElement): string;
}