import SubtitleService from "./SubtitleService";
import HtmlManagerRezka from "./HtmlManagers/HtmlManagerRezka";
import HtmlManagerI from "./HtmlManagers/Abstract/HtmlManagerI";

let subIsOpen = false;
let subsHistoryIsOpen = false;

const htmlManagerName: string = 'HtmlManagerRezka';

let subtitleService: SubtitleService|undefined;

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

_waitForCondition(eval(`${htmlManagerName}.hasSubBlock()`)).then(() => {
    const htmlManager: HtmlManagerI = eval(`new ${htmlManagerName}()`);
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