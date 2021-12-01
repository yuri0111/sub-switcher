import HtmlManagerAbstract from "./Abstract/HtmlManagerAbstract";

export default class HtmlManagerNetflix implements HtmlManagerAbstract {

    static blockWithSubSelector = '.player-timedtext';
    static blockWithSubHistorySelector = '.div-for-subs';

    static hasSubBlock(): boolean {
        const el = document.querySelector<HTMLInputElement>(HtmlManagerNetflix.blockWithSubSelector);
        return !!el && !!el.firstChild;
    }

    beforeInit(): void {
    }

    addDivForSubsHistory(): HTMLInputElement {
        const el = document.querySelector<HTMLInputElement>('.player-timedtext > .player-timedtext-text-container') as HTMLInputElement;
        let newElForSub: HTMLInputElement = el.cloneNode(false) as HTMLInputElement;
        newElForSub.style.zIndex = '9999';
        newElForSub.classList.add('div-for-subs');
        document.querySelector<HTMLInputElement>('.watch-video--player-view [data-uia="video-canvas"] > div > div')?.prepend(newElForSub);

        return newElForSub;
    }

    getBlockWithSub(): HTMLInputElement {
        // noinspection CssInvalidHtmlTagReference
        const res = document.querySelector<HTMLInputElement>(HtmlManagerNetflix.blockWithSubSelector);

        if (!res) {
            throw new Error(' no result for getBlockWithSub');
        }
        return res;
    }

    getSpanForHistory(): HTMLInputElement {
        // noinspection CssInvalidHtmlTagReference
        const res = this.getBlockWithSub().firstChild?.firstChild as HTMLInputElement;

        if (!res) {
            throw new Error(' no result for getBlockWithSub');
        }
        return res.cloneNode(false) as HTMLInputElement;
    }

    getSubHistoryBlock(): HTMLInputElement {
        const res = document.querySelector<HTMLInputElement>(HtmlManagerNetflix.blockWithSubHistorySelector);

        if (!res) {
            throw new Error(' no result for getSubHistoryBlock');
        }
        return res;
    }

    parseSubs(el: HTMLInputElement): string {
        // @ts-ignore
        const child = el.childNodes as HTMLInputElement[];

        let res: string = '';
        child.forEach(i => {
            res += i.innerHTML.replace('<br>', ' ');
        });

        return res;
    }
}
