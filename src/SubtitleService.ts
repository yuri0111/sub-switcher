import HtmlManagerAbstract from "./HtmlManagers/Abstract/HtmlManagerAbstract";

export default class SubtitleService {
    subIsOpen: boolean = false;
    subsHistoryIsOpen: boolean = false;
    translatorModalIsOpen: boolean = false;

    lastSubText?: string;
    subsHistory: string[] = [];
    spanForHistory: HTMLElement;

    htmlManager: HtmlManagerAbstract;

    constructor(htmlManager: HtmlManagerAbstract) {
        this.htmlManager = htmlManager;
        this.htmlManager.beforeInit();
        this.spanForHistory = htmlManager.getSpanForHistory();
        this.init();
    }

    init() {
        this.htmlManager.addDivForSubsHistory();
        this.htmlManager.addTranslatorModal();
        this._runObserver();
        this._runSubHistoryTranslator();
        this._changeVisibility('blockWithSubHistorySelector', false);
        this._changeVisibility('translatorModalSelector', false);
    }

    toggleSub(): void {
        this.subIsOpen = !this.subIsOpen;
        this._changeVisibility('blockWithSubSelector', this.subIsOpen);

        if(this.subIsOpen) {
            this._changeVisibility('blockWithSubHistorySelector', false);
            this.subsHistoryIsOpen = false;
        }
    }

    toggleSubHistory(): void {
        this.subsHistoryIsOpen = !this.subsHistoryIsOpen;
        this._changeVisibility('blockWithSubHistorySelector', this.subsHistoryIsOpen);

        if(this.subsHistoryIsOpen) {
            this._changeVisibility('blockWithSubSelector', false);
            this.subIsOpen = false;
        }
    }

    toggleTransModal(): void {
        this.translatorModalIsOpen = !this.translatorModalIsOpen;
        this._changeVisibility('translatorModalSelector', this.translatorModalIsOpen);
    }

    _changeVisibility(selectorName: string, visible: boolean) {
        const selector = Object.getPrototypeOf(this.htmlManager).constructor[selectorName];

        const style = visible ?
            `${selector}{display: inherit!important;}`:
            `${selector}{display: none!important;}`;

        this._addStyle(style, selectorName);
    }
    
    _runSubHistoryTranslator() {
        const subHistoryEl = this.htmlManager.getSubHistoryBlock();
        subHistoryEl.addEventListener('mousedown', (e) => {
            if (e.button === 2) {
                const selection = window.getSelection()?.toString();
                this._onSelectedClick(selection);
            }
        });
    }

    async _onSelectedClick(selectedText?: string) {
        this.toggleTransModal();

        if (!selectedText) {
            return;
        }
        
        const res: string = (await this._translate(selectedText)).translatedText;
        const elWithTrans = document.createElement("span");
        elWithTrans.innerHTML = res;

        this.htmlManager.getTranslatorModal().childNodes.forEach(n => n.remove());
        this.htmlManager.getTranslatorModal().append(elWithTrans);
    }

    async _translate(text: string) {
        const res = await fetch("https://libretranslate.de/translate", {
            method: "POST",
            body: JSON.stringify({
                q: text,
                source: "en",
                target: "ru"
            }),
            headers: {"Content-Type": "application/json"}
        });

        return await res.json();
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
