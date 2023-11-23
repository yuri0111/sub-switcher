export default abstract class HtmlManagerAbstract {
	static hasSubBlock: () => boolean;
	static blockWithSubSelector: string;
	static blockWithSubHistorySelector: string;
	static translatorModalSelector: string;

	abstract beforeInit(): void;

	abstract getSubHistoryBlock(): HTMLElement;

	abstract getBlockWithSub(): HTMLElement;

	abstract getSpanForHistory(): HTMLElement;

	abstract addDivForSubsHistory(): HTMLElement;

	abstract addTranslatorModal(): HTMLElement;

	abstract getTranslatorModal(): HTMLElement;

	abstract parseSubs(el: HTMLElement): string;
}