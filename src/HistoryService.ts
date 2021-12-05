import HtmlManagerAbstract from "./HtmlManagers/Abstract/HtmlManagerAbstract";

export default class HistoryService {

    lastSubText?: string;
    subsHistory: string[] = [];
    spanForHistory: HTMLElement;

    htmlManager: HtmlManagerAbstract;

    constructor(htmlManager: HtmlManagerAbstract) {
        this.htmlManager = htmlManager;
        this.spanForHistory = htmlManager.getSpanForHistory();

        this.htmlManager.addDivForSubsHistory();
        this._runObserver();
    }

    _runObserver() {
        const callback = (mutationsList: MutationRecord[]) => {
            for (let mutation of mutationsList) {
                const removedNodes = mutation.removedNodes[0] as HTMLElement;

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
            let span = this.spanForHistory.cloneNode(false) as HTMLElement;
            span.innerHTML = index === 0 ? lastSub : '<br>' + lastSub;
            newElForSub.appendChild(span);
            index++;
        }
    }
}
