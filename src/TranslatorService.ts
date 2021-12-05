import HtmlManagerAbstract from "./HtmlManagers/Abstract/HtmlManagerAbstract";
import VisibilityService from "./VisibilityService";

export default class TranslatorService {

    htmlManager: HtmlManagerAbstract;
    visibilityService: VisibilityService;

    lastTranslationResult: string = '';
    lastTranslatedText: string = '';

    constructor(htmlManager: HtmlManagerAbstract, visibilityService: VisibilityService) {
        this.htmlManager = htmlManager;
        this.visibilityService = visibilityService;

        this.htmlManager.addTranslatorModal();
    }

    runTranslator(el: HTMLElement) {
        el.addEventListener('mousedown', (e) => {
            if (e.button === 2) {
                const selection = window.getSelection()?.toString();
                this._onSelectedClick(selection).then();
            }
        });
    }

    async _onSelectedClick(selectedText?: string) {
        this.visibilityService.toggleTransModal();

        if (!selectedText) {
            return;
        }

        let res: string;

        if (this.lastTranslatedText === selectedText) {
            res = this.lastTranslationResult;
        } else {
            res = (await this._translate(selectedText)).translatedText;

            this.lastTranslatedText = selectedText;
            this.lastTranslationResult = res;
        }


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
}
