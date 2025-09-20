const apiKey = '7c3ab28bec964f1abe8c837c7803eec8';

async function loadGameDetails(){
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('game_id');

    if(!gameId){
        document.getElementById('game-content').innerHTML = '<p class="text-danger> ID not found.</p>';
    }

    try{
        const apiGames = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${apiKey}`);
        if(!apiGames.ok) throw new Error('Error while trying to search details on API.');
        const game = await apiGames.json();

        const gameName = game.name;

        document.getElementById('game-title').textContent = game.name;
        document.getElementById('game-image').src = game.background_image;
        document.getElementById('game-release-date').textContent = new Date(game.released).toLocaleDateString('pt-BR');
        document.getElementById('game-rating').textContent = game.rating;
        // document.getElementById('game-price').textContent = g

        document.getElementById('game-description').innerHTML = game.description;
    
    } catch (error){
        console.error(error);
    }
}

window.onload = loadGameDetails;