import HtmlManagerAbstract from "./Abstract/HtmlManagerAbstract";

export default class HtmlManagerNetflix extends HtmlManagerAbstract {

	static blockWithSubSelector = '.player-timedtext';
	static blockWithSubHistorySelector = '.div-for-subs';

	static hasSubBlock(): boolean {
		const el = document.querySelector<HTMLElement>(HtmlManagerNetflix.blockWithSubSelector);
		return !!el && !!el.firstChild;
	}

	beforeInit(): void {
	}

	addDivForSubsHistory(): HTMLElement {
		const el = document.querySelector<HTMLElement>('.player-timedtext > .player-timedtext-text-container') as HTMLElement;
		let newElForSub: HTMLElement = el.cloneNode(false) as HTMLElement;
		newElForSub.style.zIndex = '9999';
		newElForSub.style.userSelect = 'text';
		newElForSub.style.width = '60%';
		newElForSub.style.left = '20%';

		newElForSub.classList.add('div-for-subs');
		document.querySelector<HTMLElement>('.watch-video--player-view [data-uia="video-canvas"] > div > div')?.prepend(newElForSub);

		return newElForSub;
	}

	getBlockWithSub(): HTMLElement {
		// noinspection CssInvalidHtmlTagReference
		const res = document.querySelector<HTMLElement>(HtmlManagerNetflix.blockWithSubSelector);

		if (!res) {
			throw new Error(' no result for getBlockWithSub');
		}
		return res;
	}

	getSpanForHistory(): HTMLElement {
		// noinspection CssInvalidHtmlTagReference
		const res = this.getBlockWithSub().firstChild?.firstChild as HTMLElement;

		if (!res) {
			throw new Error(' no result for getBlockWithSub');
		}
		let spanForSub: HTMLElement = res.cloneNode(false) as HTMLElement;
		spanForSub.style.fontSize = '3em';
		spanForSub.style.display = 'block';

		return spanForSub;
	}

	getSubHistoryBlock(): HTMLElement {
		const res = document.querySelector<HTMLElement>(HtmlManagerNetflix.blockWithSubHistorySelector);

		if (!res) {
			throw new Error(' no result for getSubHistoryBlock');
		}
		return res;
	}

	parseSubs(el: HTMLElement): string {
		// @ts-ignore
		const child = el.childNodes as HTMLElement[];

		let res: string = '';
		child.forEach(i => {
			res += i.innerHTML.replace('<br>', ' ');
		});

		return res;
	}
}
