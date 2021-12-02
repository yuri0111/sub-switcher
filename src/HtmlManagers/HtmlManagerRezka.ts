import HtmlManagerAbstract from "./Abstract/HtmlManagerAbstract";

export default class HtmlManagerRezka implements HtmlManagerAbstract {
    static blockWithSubSelector = '#oframecdnplayer > pjsdiv.sub-block';
    static blockWithSubHistorySelector = '#oframecdnplayer .div-for-subs';

    static hasSubBlock(): boolean {
        // noinspection CssInvalidHtmlTagReference
        const el = document.querySelector<HTMLInputElement>('#oframecdnplayer > pjsdiv:last-child');
        return !!(el && el.firstChild && el.firstChild?.nodeName === 'SPAN');
    }

    beforeInit(): void {
        if(!HtmlManagerRezka.hasSubBlock()) {
            throw new Error("beforeInit error, dont have SubBlock");
        }
        // noinspection CssInvalidHtmlTagReference
        const el = document.querySelector<HTMLInputElement>('#oframecdnplayer > pjsdiv:last-child');

        if(!el) {
            throw new Error("beforeInit error, dont have el");
        }

        el.classList.add('sub-block');
    }

    addDivForSubsHistory(): HTMLInputElement {
        let newElForSub: HTMLInputElement = this.getBlockWithSub().cloneNode(false) as HTMLInputElement;
        newElForSub.style.zIndex = '9999';
        newElForSub.className = '';
        newElForSub.classList.add('div-for-subs');
        document.getElementById('oframecdnplayer')?.prepend(newElForSub);

        return newElForSub;
    }

    getBlockWithSub(): HTMLInputElement {
        // noinspection CssInvalidHtmlTagReference
        const res = document.querySelector<HTMLInputElement>(HtmlManagerRezka.blockWithSubSelector);

        if (!res) {
            throw new Error(' no result for getBlockWithSub');
        }
        return res;
    }

    getSpanForHistory(): HTMLInputElement {
        // noinspection CssInvalidHtmlTagReference
        const res = this.getBlockWithSub().firstChild as HTMLInputElement;

        if (!res) {
            throw new Error(' no result for getBlockWithSub');
        }
        return res.cloneNode(false) as HTMLInputElement;
    }

    getSubHistoryBlock(): HTMLInputElement {
        const res = document.querySelector<HTMLInputElement>(HtmlManagerRezka.blockWithSubHistorySelector);

        if (!res) {
            throw new Error(' no result for getSubHistoryBlock');
        }
        return res;
    }

    parseSubs(el: HTMLInputElement): string {
        return el.innerHTML.replace('<br>', ' ');
    }
}
