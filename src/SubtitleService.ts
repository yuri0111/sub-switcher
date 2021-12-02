import HtmlManagerAbstract from "./HtmlManagers/Abstract/HtmlManagerAbstract";

export default class SubtitleService {
    subIsOpen: boolean = false;
    subsHistoryIsOpen: boolean = false;

    lastSubText?: string;
    subsHistory: string[] = [];
    spanForHistory: HTMLInputElement;

    htmlManager: HtmlManagerAbstract;

    constructor(htmlManager: HtmlManagerAbstract) {
        this.htmlManager = htmlManager;
        this.htmlManager.beforeInit();
        this.spanForHistory = htmlManager.getSpanForHistory();
        this.init();
    }

    init() {
        this.htmlManager.addDivForSubsHistory();
        this.hideSubsHistory();
        this._runObserver();
    }

    toggleSub(): void {
        this.subIsOpen ? this.hideSub() : this.showSub();
    }

    toggleSubHistory(): void {
        this.subsHistoryIsOpen ? this.hideSubsHistory() : this.showSubsHistory();
    }


    showSub() {
        const selector = Object.getPrototypeOf(this.htmlManager).constructor.blockWithSubSelector;
        const style = `${selector}{display: inherit!important;}`
        this._addStyle(style, 'sub');

        this.subIsOpen = true;
        this.hideSubsHistory();
    }

    hideSub() {
        const selector = Object.getPrototypeOf(this.htmlManager).constructor.blockWithSubSelector;
        const style = `${selector}{display: none!important;}`
        this._addStyle(style, 'sub');

        this.subIsOpen = false;
    }

    showSubsHistory() {
        const selector = Object.getPrototypeOf(this.htmlManager).constructor.blockWithSubHistorySelector;
        const style = `${selector}{display: inherit!important;}`
        this._addStyle(style, 'sub-history');

        this.subsHistoryIsOpen = true;
        this.hideSub();
    }

    hideSubsHistory() {
        const selector = Object.getPrototypeOf(this.htmlManager).constructor.blockWithSubHistorySelector;
        const style = `${selector}{display: none!important;}`
        this._addStyle(style, 'sub-history');

        this.subsHistoryIsOpen = false;
    }

    _runObserver() {
        const callback = (mutationsList: MutationRecord[]) => {
            for (let mutation of mutationsList) {
                const removedNodes = mutation.removedNodes[0] as HTMLInputElement;

                if (mutation.type === 'childList' && removedNodes) {
                    let text = this.htmlManager.parseSubs(removedNodes);

                    if (text !== this.lastSubText) {
                        this.lastSubText = text;
                        this.subsHistory.push(this.lastSubText);

                        if (this.subsHistory.length > 4) {
                            this.subsHistory = this.subsHistory.slice(1, 5);
                        }

                        this._renderHistory();
                    }
                }
            }
        };

        const observer = new MutationObserver(callback);

        observer.observe(this.htmlManager.getBlockWithSub(), {
            childList: true,
            subtree: true
        });
    }

    _renderHistory() {
        let newElForSub = this.htmlManager.getSubHistoryBlock();
        newElForSub.childNodes.forEach(n => n.remove());

        let index = 0;
        for (const lastSub of this.subsHistory) {
            let span = this.spanForHistory.cloneNode(false) as HTMLInputElement;
            span.innerHTML = index === 0 ? lastSub : '<br>' + lastSub;
            newElForSub.appendChild(span);
            index++;
        }
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
