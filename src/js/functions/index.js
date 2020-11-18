import * as seaFcns from './sea';
import * as shipFightFcns from './shipFight';

// Define function for showing fishes
export const showFishes = () => {
    const timeoutTime = Math.floor(Math.random() * 5000) + 2000;

    // Render a fish after a random time
    setTimeout(() => {

        // Render one fish
        seaFcns.renderFish(timeoutTime);
        // Recursively call this function
        showFishes();

    }, timeoutTime);
}

// Define function to initialize ship fight
export const initShipFight = () => {
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
        const cannonball = shipFightFcns.fire('ENEMY', state);

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
        const cannonball = shipFightFcns.fire('WE');

    }, OUR_ARTILLERY_SPEED);

}