import HtmlManagerI from "./HtmlManagers/Abstract/HtmlManagerI";

export default class SubtitleService {
    lastSubText?: string;
    subsHistory: string[] = [];
    spanForHistory: HTMLInputElement;

    htmlManager: HtmlManagerI;

    constructor(htmlManager: HtmlManagerI) {
        this.htmlManager = htmlManager;
        this.spanForHistory = htmlManager.getBlockWithSubChild().cloneNode(false) as HTMLInputElement;
        this.init();
    }

    init() {
        this.htmlManager.addDivForSubsHistory();
        this.runObserver();
    }


    showSub() {
        this.htmlManager.getBlockWithSub().style.opacity = '1';
    }

    hideSub() {
        this.htmlManager.getBlockWithSub().style.opacity = '0';
    }

    hideSubsHistory() {
        this.htmlManager.getSubHistoryBlock().style.opacity = '0';
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
        newElForSub.style.opacity = '1';
    }

    runObserver() {
        const callback = (mutationsList: MutationRecord[]) => {
            for (let mutation of mutationsList) {
                const removedNodes = mutation.removedNodes[0] as HTMLInputElement;

                if (mutation.type === 'childList' && removedNodes) {
                    let text = removedNodes.innerHTML.replace('<br>', ' ');

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
}
