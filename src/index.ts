let observerInit = false;
let lastSubText: string | undefined = undefined;
let subsHistory: string[] = [];

let subIsOpen = false;
let subsHistoryIsOpen = false;

let init = false;
let spanForHistory: HTMLInputElement;

document.onkeydown = function (e) {
    const key = e.key;

    if (key === 'c') {
        subIsOpen = !subIsOpen;
        !subIsOpen ? showSub() : hideSub();
    }

    if (key === 'v') {
        subsHistoryIsOpen = !subsHistoryIsOpen;
        !subsHistoryIsOpen ? showSubsHistory() : hideSubsHistory();
    }
}

_waitForCondition(hasSubBlock).then(() => {
    runObserver();
    addDivForSubsHistory();

    const firstChild = getLastBlock().firstChild;

    if (firstChild) {
        spanForHistory = firstChild.cloneNode(false) as HTMLInputElement;
    }
    init = true;
});

function showSub() {
    if (hasSubBlock()) {
        getLastBlock().style.opacity = '1';
    }
}

function hideSub() {
    if (hasSubBlock()) {
        getLastBlock().style.opacity = '0';
    }
}

function hideSubsHistory() {
    getSubHistoryBlock().style.opacity = '0';
}

function showSubsHistory() {
    if (init) {
        let newElForSub = getSubHistoryBlock();
        newElForSub.childNodes.forEach(n => n.remove());

        let index = 0;

        for (const lastSub of subsHistory) {
            let span = spanForHistory.cloneNode(false) as HTMLInputElement;
            span.innerHTML = index === 0 ? lastSub : '<br>' + lastSub;
            newElForSub.appendChild(span);
            index++;
        }
        newElForSub.style.opacity = '1';
    }
}

function addDivForSubsHistory() {
    if (getSubHistoryBlock()) {
        return;
    }

    let newElForSub: HTMLInputElement = getLastBlock().cloneNode(false) as HTMLInputElement;

    newElForSub.style.zIndex = '9999';
    newElForSub.classList.add('div-for-subs');
    document.getElementById('oframecdnplayer')?.prepend(newElForSub);
}

function runObserver() {
    if (observerInit) {
        return;
    }

    observerInit = true;

    const callback = function (mutationsList: MutationRecord[]) {
        for (let mutation of mutationsList) {
            const removedNodes = mutation.removedNodes[0] as HTMLInputElement;

            if (mutation.type === 'childList' && removedNodes) {
                let text = removedNodes.innerHTML.replace('<br>', ' ');
                if (text !== lastSubText) {
                    lastSubText = text;
                    subsHistory.push(lastSubText);

                    if (subsHistory.length > 4) {
                        subsHistory = subsHistory.slice(1, 5);
                    }
                }
            }
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(getLastBlock(), {
        childList: true,
        subtree: true
    });
}

function hasSubBlock(): boolean {
    return !!getLastBlock().firstChild && getLastBlock().firstChild?.nodeName === 'SPAN';
}

function getSubHistoryBlock(): HTMLInputElement {
    const res = document.querySelector<HTMLInputElement>('#oframecdnplayer .div-for-subs');

    if (!res) {
        throw new Error(' no result for getSubHistoryBlock');
    }
    return res;
}

function getLastBlock(): HTMLInputElement {
    // noinspection CssInvalidHtmlTagReference
    const res = document.querySelector<HTMLInputElement>('#oframecdnplayer > pjsdiv:last-child');

    if (!res) {
        throw new Error(' no result for getSubHistoryBlock');
    }
    return res;
}

function _waitForCondition(conditionCallback: () => {}, delay = 500): Promise<any> {
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