// Define function for firing cannonballs
export const fire = (type, state) => {

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