/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/functions/index.js":
/*!***********************************!*\
  !*** ./src/js/functions/index.js ***!
  \***********************************/
/*! namespace exports */
/*! export showFishes [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "showFishes": () => /* binding */ showFishes
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

const showFishes = () => {
    const timeoutTime = Math.floor(Math.random() * 5000) + 2000;

    // Render a fish after a random time
    setTimeout(() => {

        // Render one fish
        renderFish(timeoutTime);
        // Recursively call this function
        showFishes();

    }, timeoutTime);
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