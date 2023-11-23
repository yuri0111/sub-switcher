import HtmlManagerAbstract from "./HtmlManagers/Abstract/HtmlManagerAbstract";

export default class VisibilityService {
	subIsOpen: boolean = false;
	subsHistoryIsOpen: boolean = false;

	htmlManager: HtmlManagerAbstract;

	constructor(htmlManager: HtmlManagerAbstract) {
		this.htmlManager = htmlManager;

		this.hideSubHistory();
	}

	toggleSub(): void {
		this.subIsOpen ? this.hideSub() : this.showSub();
	}

	toggleSubHistory(): void {
		this.subsHistoryIsOpen ? this.hideSubHistory() : this.showSubHistory();
	}

	showSub(): void {
		this._changeVisibility('blockWithSubSelector', true);
		this.subIsOpen = true;

		this.hideSubHistory();
	}

	hideSub(): void {
		this._changeVisibility('blockWithSubSelector', false);
		this.subIsOpen = false;
	}

	showSubHistory(): void {
		this._changeVisibility('blockWithSubHistorySelector', true);
		this.subsHistoryIsOpen = true;

		this.hideSub();
	}

	hideSubHistory(): void {
		this._changeVisibility('blockWithSubHistorySelector', false);
		this.subsHistoryIsOpen = false;
	}

	_changeVisibility(selectorName: string, visible: boolean) {
		const selector = Object.getPrototypeOf(this.htmlManager).constructor[selectorName];

		const style = visible ?
			`${selector}{display: inherit!important;}` :
			`${selector}{display: none!important;}`;

		this._addStyle(style, selectorName);
	}

	_addStyle(style: string, name: string, override: boolean = true) {
		const dataAttrName = `data-subtitle-manager-${name}`;

		let css = document.querySelector<HTMLElement>(`style[${dataAttrName}='style']`);
		if (!css) {
			css = document.createElement('style');
		}

		css.setAttribute(dataAttrName, 'style');
		css.setAttribute('type', 'text/css');

		if (override) {
			css.innerHTML = style;
		} else {
			css.innerHTML += style;
		}

		document.getElementsByTagName("head")[0].appendChild(css);
	}
}
