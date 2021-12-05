import HtmlManagerAbstract from "./HtmlManagers/Abstract/HtmlManagerAbstract";

export default class VisibilityService {
    subIsOpen: boolean = false;
    subsHistoryIsOpen: boolean = false;
    translatorModalIsOpen: boolean = false;

    htmlManager: HtmlManagerAbstract;

    constructor(htmlManager: HtmlManagerAbstract) {
        this.htmlManager = htmlManager;

        this.hideSubHistory();
        this.hideTransModal();
    }

    toggleSub(): void {
        this.subIsOpen ? this.hideSub() : this.showSub();
    }

    toggleSubHistory(): void {
        this.subsHistoryIsOpen ? this.hideSubHistory() : this.showSubHistory();
    }

    toggleTransModal(): void {
        this.translatorModalIsOpen ? this.hideTransModal() : this.showTransModal();
    }

    showSub(): void {
        this._changeVisibility('blockWithSubSelector', true);
        this.subIsOpen = true;

        this.hideSubHistory();
    }

    hideSub(): void {
        this._changeVisibility('blockWithSubSelector', false);
        this.subIsOpen = false;

        this.hideTransModal();
    }

    showSubHistory(): void {
        this._changeVisibility('blockWithSubHistorySelector', true);
        this.subsHistoryIsOpen = true;

        this.hideSub();
    }

    hideSubHistory(): void {
        this._changeVisibility('blockWithSubHistorySelector', false);
        this.subsHistoryIsOpen = false;

        this.hideTransModal();
    }

    showTransModal(): void {
        this._changeVisibility('translatorModalSelector', true);
        this.translatorModalIsOpen = true;
    }

    hideTransModal(): void {
        this._changeVisibility('translatorModalSelector', false);
        this.translatorModalIsOpen = false;
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
