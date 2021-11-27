let observerInit = false;
let lastSubText = null;
let subsHistory = [];

let subIsOpen = false;
let subsHistoryIsOpen = false;

let init = false;
let spanForHistory = null;

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
    spanForHistory = getLastBlock().firstChild.cloneNode(false);
    init = true;
});

function showSub() {
    if (hasSubBlock()) {
        getLastBlock().style.opacity = 1;
    }
}

function hideSub() {
    if (hasSubBlock()) {
        getLastBlock().style.opacity = 0;
    }
}

function hideSubsHistory() {
    getSubHistoryBlock().style.opacity = 0;
}

function showSubsHistory() {
    if (init) {
        let newElForSub = getSubHistoryBlock();
        newElForSub.replaceChildren();

        let index = 0;

        for (const lastSub of subsHistory) {
            let span = spanForHistory.cloneNode(false);
            span.innerHTML = index === 0 ? lastSub : '<br>' + lastSub;
            newElForSub.appendChild(span);
            index++;
        }
        newElForSub.style.opacity = 1;
    }
}

function addDivForSubsHistory() {
    if (getSubHistoryBlock()) {
        return;
    }

    let newElForSub = getLastBlock().cloneNode(false);

    newElForSub.style.zIndex = 9999;
    newElForSub.classList.add('div-for-subs');
    document.getElementById('oframecdnplayer').prepend(newElForSub);
}

function runObserver() {
    if (observerInit) {
        return;
    }

    observerInit = true;

    const callback = function (mutationsList) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.removedNodes[0]) {
                let text = mutation.removedNodes[0].innerHTML.replace('<br>', ' ');
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

function hasSubBlock() {
    return getLastBlock().firstChild && getLastBlock().firstChild.nodeName === 'SPAN';
}

function getSubHistoryBlock() {
    return document.querySelector('#oframecdnplayer .div-for-subs');
}

function getLastBlock() {
    // noinspection CssInvalidHtmlTagReference
    return document.querySelector('#oframecdnplayer > pjsdiv:last-child');
}

function _waitForCondition(conditionCallback, delay = 500) {
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