import SubtitleService from "./SubtitleService";
import HtmlManagerRezka from "./HtmlManagers/HtmlManagerRezka";
import HtmlManagerI from "./HtmlManagers/Abstract/HtmlManagerI";
import HtmlManagerAbstract from "./HtmlManagers/Abstract/HtmlManagerAbstract";

let subIsOpen = false;
let subsHistoryIsOpen = false;

let subtitleService: SubtitleService|undefined;

const manager: typeof HtmlManagerAbstract = HtmlManagerRezka;

document.onkeydown = function (e) {
    if(!subtitleService) {
        return;
    }

    const key = e.key;

    if (key === 'c') {
        subIsOpen = !subIsOpen;
        !subIsOpen ? subtitleService.showSub() : subtitleService.hideSub();
    }

    if (key === 'v') {
        subsHistoryIsOpen = !subsHistoryIsOpen;
        !subsHistoryIsOpen ? subtitleService.showSubsHistory() : subtitleService.hideSubsHistory();
    }
}

_waitForCondition(manager.hasSubBlock).then(() => {
    // @ts-ignore
    const htmlManager: HtmlManagerI = new manager();
    subtitleService = new SubtitleService(htmlManager);
});


function _waitForCondition(conditionCallback: () => boolean, delay = 500): Promise<any> {
    function _search() {
        return new Promise((resolve) => {
            setTimeout(resolve, delay);
        });
    }

    if (!conditionCallback()) {
        return _search().then(() => _waitForCondition(conditionCallback, delay));
    } else {
        return Promise.resolve();
    }
}