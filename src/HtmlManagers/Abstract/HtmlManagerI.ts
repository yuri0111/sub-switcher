export default interface HtmlManagerI {
    getSubHistoryBlock(): HTMLInputElement;

    getBlockWithSub(): HTMLInputElement;

    getBlockWithSubChild(): HTMLInputElement;

    addDivForSubsHistory(newElForSub: HTMLInputElement): HTMLInputElement;
}