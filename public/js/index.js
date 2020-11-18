/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/functions/index.js":
/*!***********************************!*\
  !*** ./src/js/functions/index.js ***!
  \***********************************/
/*! namespace exports */
/*! export initShipFight [provided] [no usage info] [missing usage info prevents renaming] */
/*! export showFishes [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "showFishes": () => /* binding */ showFishes,
/* harmony export */   "initShipFight": () => /* binding */ initShipFight
/* harmony export */ });
/* harmony import */ var _sea__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sea */ "./src/js/functions/sea.js");
/* harmony import */ var _shipFight__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shipFight */ "./src/js/functions/shipFight.js");
;


// Define function for showing fishes
const showFishes = () => {
    const timeoutTime = Math.floor(Math.random() * 5000) + 2000;

    // Render a fish after a random time
    setTimeout(() => {

        // Render one fish
        _sea__WEBPACK_IMPORTED_MODULE_0__.renderFish(timeoutTime);
        // Recursively call this function
        showFishes();

    }, timeoutTime);
}

// Define function to initialize ship fight
const initShipFight = () => {
    // Get contants
    const ENEMY_ARTILLERY_SPEED = 1000;
    const OUR_ARTILLERY_SPEED = 10000;
    const CANNONBALL_SPEED = 8000;

    // Get both cannons and ships & #game element
    const game = document.getElementById('game');
    const cannon = document.getElementById('cannon');
    const ship = document.getElementById('ship');
    const enemyCannon = document.getElementById('enemycannon');
    const enemyShip = document.getElementById('enemyship');

    // Store lifes of enemy and our ship
    const state = {
        lifes: {
            we: 3,
            enemy: 3
        },
        isSank: false,
        elems: { cannon, ship, enemyCannon, enemyShip, game },
        consts: { ENEMY_ARTILLERY_SPEED, OUR_ARTILLERY_SPEED, CANNONBALL_SPEED }
    }

    // Create array of fired cannonballs
    const cannonballs = [];

    // Set interval for firing enemy cannonballs
    const enemyArtillery = setInterval(() => {

        // Fire enemy cannonballs
        const cannonball = _shipFight__WEBPACK_IMPORTED_MODULE_1__.fire('ENEMY', state);

        // Listen for custom event 'shot'
        cannonball.addEventListener('shot', () => {

            // Remove one our life
            state.lifes.we -= 1;

            // Check for sank ship
            if (state.lifes.we < 1) {
                state.isSank = true;
            }
        })

        // Push cannonball to cannonballs array
        cannonballs.push(cannonball);

    }, ENEMY_ARTILLERY_SPEED);

    // Listen for pressed keys
    //window.addEventListener('keydown', e => shipFightFcns.checkKeyAndPotentiallyDestroyCannonball(e, cannonballs));
        // Check whether pressed key corresponds with any of fired enemy cannonballs

        // If it does, remove cannonball

    // Set timeout for firing our cannonballs
    const ourArillery = setInterval(() => {

        // Fire our cannonballs
        const cannonball = _shipFight__WEBPACK_IMPORTED_MODULE_1__.fire('WE');

    }, OUR_ARTILLERY_SPEED);

}

/***/ }),

/***/ "./src/js/functions/sea.js":
/*!*********************************!*\
  !*** ./src/js/functions/sea.js ***!
  \*********************************/
/*! namespace exports */
/*! export renderFish [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderFish": () => /* binding */ renderFish
/* harmony export */ });
// Define function for rendering one fish
const renderFish = (timeoutTime) => {
    // Create fish element
    const fish = document.createElement('img');
    fish.setAttribute('src', '/img/fisch.svg');
    fish.setAttribute('alt', 'A fisch');
    fish.classList.add('sea-map__fish');

    // Set styles
    fish.style.width = (Math.floor(Math.random() * 10) + 10) + 'rem';
    fish.style.height = (Math.floor(Math.random() * 5) + 5) + 'rem';
    fish.style.top = Math.floor(Math.random() * 100) + '%';
    fish.style.animation = `moveFish ${(timeoutTime / 1000) * 2}s linear`;

    // Prepend fish
    const fishtank = document.getElementById('fishtank');
    fishtank.prepend(fish);

    // Teach the fish how to swim up and down
    const interval = setInterval(() => {
        // Generate vertical movement
        const top = parseInt(fish.style.top);
        let newTop = top + (Math.round(Math.random() * 100) / 10) - 5;

        // Get angle of the fish
        const sinAlpha = ( newTop - top ) / ( (fishtank.offsetWidth / 10) * ( 510 / ( timeoutTime * 2 ) ) );
        console.log(sinAlpha);
        const alphaRad = Math.asin(sinAlpha) / 7;

        // Check for boundaries
        if (newTop > 100 || newTop < 0) newTop = top;

        // Adjust styles
        fish.style.top = newTop + '%';
        fish.style.transform = `translate(0, -50%) rotate(${alphaRad}rad)`;
    }, 800);

    // Kill fish after it swam to the other side
    setTimeout(() => {

        // Remove fish
        fish.remove();
        // Clear interval
        clearInterval(interval);

    }, timeoutTime * 2);
}

/***/ }),

/***/ "./src/js/functions/shipFight.js":
/*!***************************************!*\
  !*** ./src/js/functions/shipFight.js ***!
  \***************************************/
/*! namespace exports */
/*! export fire [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fire": () => /* binding */ fire
/* harmony export */ });
// Define function for firing cannonballs
const fire = (type, state) => {

    // Create cannonball element with class
    const cannonball  = document.createElement('div');
    cannonball.classList.add('game__cannonball');

    // Set styles for enemy cannonball
    if (type === 'ENEMY') {
        // Get starting position ( offset from top of viewport + scrolled from top + half of inner height )
        const enemyCannonPositionY = state.elems.enemyCannon.getBoundingClientRect().top + window.scrollY + ( state.elems.enemyCannon.offsetHeight / 2 );
        const enemyCannonPositionX = state.elems.enemyCannon.getBoundingClientRect().left + ( state.elems.enemyCannon.offsetWidth / 2 );

        // Get target position
        const cannonPositionY = state.elems.cannon.getBoundingClientRect().top + window.scrollY + ( state.elems.cannon.offsetHeight / 2 );
        const cannonPositionX = state.elems.cannon.getBoundingClientRect().left + ( state.elems.cannon.offsetWidth / 2 );

        // Set styles
        cannonball.style.width = '2rem';
        cannonball.style.height = '2rem';
        cannonball.style.top = enemyCannonPositionY + 'px';
        cannonball.style.left = enemyCannonPositionX + 'px';
        cannonball.style.transition = `all ${ state.consts.CANNONBALL_SPEED / 1000 }s ease-in`;

        // Prepend cannonball
        game.prepend(cannonball);

        // Set style which cannonball should transite to
        setTimeout(() => {
            cannonball.style.top = cannonPositionY + 'px';
            cannonball.style.left = cannonPositionX + 'px';
            cannonball.style.width = '10rem';
            cannonball.style.height = '10rem';
        }, 10);

        // Set timeout to emit 'shot' event
        setTimeout(() => {
            const shotEvent = new Event('shot');
            cannonball.dispatchEvent(shotEvent);
        }, state.consts.CANNONBALL_SPEED)

        return cannonball;
    } else if (type === 'WE') {
        return;
    }

}

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _functions_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions/index */ "./src/js/functions/index.js");
;

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
        case 'SHIP_FIGHT': {
            _functions_index__WEBPACK_IMPORTED_MODULE_0__.initShipFight();
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
        _functions_index__WEBPACK_IMPORTED_MODULE_0__.showFishes();
        _functions_index__WEBPACK_IMPORTED_MODULE_0__.showFishes();
    }
})

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/js/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=index.js.map