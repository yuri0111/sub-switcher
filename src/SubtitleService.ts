import HtmlManagerI from "./HtmlManagers/Abstract/HtmlManagerI";
import HtmlManagerAbstract from "./HtmlManagers/Abstract/HtmlManagerAbstract";

export default class SubtitleService {
    lastSubText?: string;
    subsHistory: string[] = [];
    spanForHistory: HTMLInputElement;

    htmlManager: HtmlManagerAbstract;

    constructor(htmlManager: HtmlManagerI) {
        this.htmlManager = htmlManager;
        this.spanForHistory = htmlManager.getSpanForHistory();
        this.init();
    }

    init() {
        this.htmlManager.addDivForSubsHistory();
        this.runObserver();
    }


    showSub() {
        const selector = Object.getPrototypeOf(this.htmlManager).constructor.blockWithSubSelector;
        const style = `${selector}{display: inherit!important;}`
        this._addStyle(style, 'sub');

        this.hideSubsHistory();
    }

    hideSub() {
        const selector = Object.getPrototypeOf(this.htmlManager).constructor.blockWithSubSelector;
        const style = `${selector}{display: none!important;}`
        this._addStyle(style, 'sub');
    }

    hideSubsHistory() {
        const selector = Object.getPrototypeOf(this.htmlManager).constructor.blockWithSubHistorySelector;
        const style = `${selector}{display: none!important;}`
        this._addStyle(style, 'sub-history');
    }

    showSubsHistory() {
        let newElForSub = this.htmlManager.getSubHistoryBlock();
        newElForSub.childNodes.forEach(n => n.remove());

        let index = 0;
        for (const lastSub of this.subsHistory) {
            let span = this.spanForHistory.cloneNode(false) as HTMLInputElement;
            span.innerHTML = index === 0 ? lastSub : '<br>' + lastSub;
            newElForSub.appendChild(span);
            index++;
        }

        const selector = Object.getPrototypeOf(this.htmlManager).constructor.blockWithSubHistorySelector;
        const style = `${selector}{display: inherit!important;}`
        this._addStyle(style, 'sub-history');

        this.hideSub();
    }

    runObserver() {
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
