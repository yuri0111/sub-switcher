import HtmlManagerAbstract from "./Abstract/HtmlManagerAbstract";

export default class HtmlManagerRezka implements HtmlManagerAbstract {
	static blockWithSubSelector = '#oframecdnplayer > pjsdiv.sub-block';
	static blockWithSubHistorySelector = '#oframecdnplayer .div-for-subs';
	static translatorModalSelector = '#oframecdnplayer .translator-modal';

	static hasSubBlock(): boolean {
		// noinspection CssInvalidHtmlTagReference
		const el = document.querySelector<HTMLElement>('#oframecdnplayer > pjsdiv:last-child');
		return !!(el && el.firstChild && el.firstChild?.nodeName === 'SPAN');
	}

	beforeInit(): void {
		this._addClassToSubHistoryBlock();

	}

	_addClassToSubHistoryBlock() {
		if (!HtmlManagerRezka.hasSubBlock()) {
			throw new Error("beforeInit error, dont have SubBlock");
		}
		// noinspection CssInvalidHtmlTagReference
		const el = document.querySelector<HTMLElement>('#oframecdnplayer > pjsdiv:last-child');

		if (!el) {
			throw new Error("beforeInit error, dont have el");
		}

		el.classList.add('sub-block');
	}

	addDivForSubsHistory(): HTMLElement {
		let newElForSub: HTMLElement = this.getBlockWithSub().cloneNode(false) as HTMLElement;
		newElForSub.style.zIndex = '9999';
		newElForSub.style.userSelect = 'text';
		newElForSub.className = '';
		newElForSub.classList.add('div-for-subs');
		document.getElementById('oframecdnplayer')?.prepend(newElForSub);

		return newElForSub;
	}

	addTranslatorModal(): HTMLElement {
		const newDiv = document.createElement("div");
		newDiv.style.zIndex = '9999';
		newDiv.style.position = 'absolute';
		newDiv.style.left = '48%';
		newDiv.style.top = '100px';
		newDiv.style.textAlign = 'center';
		newDiv.style.background = '#222';
		newDiv.style.padding = '14px';

		newDiv.className = 'translator-modal';
		document.getElementById('oframecdnplayer')?.prepend(newDiv);

		return newDiv;
	}

	getTranslatorModal(): HTMLElement {
		const res = document.querySelector<HTMLElement>(HtmlManagerRezka.translatorModalSelector);

		if (!res) {
			throw new Error(' no result for getTranslatorModal');
		}
		return res;
	}

	getBlockWithSub(): HTMLElement {
		const res = document.querySelector<HTMLElement>(HtmlManagerRezka.blockWithSubSelector);

		if (!res) {
			throw new Error(' no result for getBlockWithSub');
		}
		return res;
	}

	getSpanForHistory(): HTMLElement {
		// noinspection CssInvalidHtmlTagReference
		const res = this.getBlockWithSub().firstChild as HTMLElement;

		if (!res) {
			throw new Error(' no result for getBlockWithSub');
		}
		return res.cloneNode(false) as HTMLElement;
	}

	getSubHistoryBlock(): HTMLElement {
		const res = document.querySelector<HTMLElement>(HtmlManagerRezka.blockWithSubHistorySelector);

		if (!res) {
			throw new Error(' no result for getSubHistoryBlock');
		}
		return res;
	}

	parseSubs(el: HTMLElement): string {
		return el.innerHTML.replace('<br>', ' ');
	}
}
