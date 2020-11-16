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

export const showFishes = () => {
    const timeoutTime = Math.floor(Math.random() * 5000) + 2000;

    // Render a fish after a random time
    setTimeout(() => {

        // Render one fish
        renderFish(timeoutTime);
        // Recursively call this function
        showFishes();

    }, timeoutTime);
}