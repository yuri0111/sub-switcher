import SubtitleService from "./SubtitleService";
import HtmlManagerRezka from "./HtmlManagers/HtmlManagerRezka";
import HtmlManagerI from "./HtmlManagers/Abstract/HtmlManagerI";
import HtmlManagerAbstract from "./HtmlManagers/Abstract/HtmlManagerAbstract";
import HtmlManagerNetflix from "./HtmlManagers/HtmlManagerNetflix";

let subtitleService: SubtitleService | undefined;

const manager: typeof HtmlManagerAbstract = (() => {
    switch (window.location.host) {
        case 'rezka.ag' :
            return HtmlManagerRezka;
        case 'www.netflix.com' :
            return HtmlManagerNetflix;
        default:
            return HtmlManagerRezka;
    }
})();

document.onkeydown = function (e) {
    if (!subtitleService) {
        return;
    }

    const key = e.key;

    if (key === 'c') {
        subtitleService.toggleSub();
    }

    if (key === 'v') {
        subtitleService.toggleSubHistory();
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