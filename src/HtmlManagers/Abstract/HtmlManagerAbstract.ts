export default abstract class HtmlManagerAbstract {
	static hasSubBlock: () => boolean;
	static blockWithSubSelector: string;
	static blockWithSubHistorySelector: string;

	abstract beforeInit(): void;

	abstract getSubHistoryBlock(): HTMLElement;

	abstract getBlockWithSub(): HTMLElement;

	abstract getSpanForHistory(): HTMLElement;

	abstract addDivForSubsHistory(): HTMLElement;

	parseSubs(el: HTMLElement): string {
		return el.outerHTML.replace('<br>', ' ').replace(/<\/?[^>]+(>|$)/g, '')
	}
}