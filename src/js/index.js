import * as fcns from './functions/index';

/////
// ready function to execute when DOM is loaded
/////
const ready = callbackFunc => {
    if (document.readyState !== 'loading') {
        // Document is already ready, call the callback directly
        callbackFunc();
    } else if (document.addEventListener) {
        // All modern browsers to register DOMContentLoaded
        document.addEventListener('DOMContentLoaded', callbackFunc);
    } else {
        // Old IE browsers
        document.attachEvent('onreadystatechange', function() {
            if (document.readyState === 'complete') {
                callbackFunc();
            }
        });
    }
}

const initGame = (type) => {
    switch (type) {
        case 'VOLCANO': {
            break;
        }
        default: return;
    }
}

ready(() => {
    // Find out whether a game should be loaded
    const game = document.getElementById('game');
    if (game) {
        // Init game for given gametype
        initGame(game.dataset.gametype);
    }

    // Find out whether sea map is displayed
    const seamap = document.getElementById('seamap');
    if (seamap) {
        // Show swimming fishes
        fcns.showFishes();
        fcns.showFishes();
    }
})