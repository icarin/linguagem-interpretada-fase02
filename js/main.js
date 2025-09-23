const apiKey = '7c3ab28bec964f1abe8c837c7803eec8';
const urlGames = `https://api.rawg.io/api/games?key=${apiKey}`;
const gamesRow = document.getElementById('games-row');

fetch(urlGames).then(response => {
    if(!response.ok){
        throw new Error(`Erro de rede: ${response.status}`);
    }
    return response.json();
})
.then(data => {
    console.log('data recieved succesfully!', data);

    const games = data.results;

    gamesRow.innerHTML = '';

    for(var i = 0; i < 18; i++){
        
        const imageUrl = games[i].background_image;

        const cardHTML = `
                <div class="col">
                    <div class="card h-100 shadow-sm card-game">
                        <a href="game-details.html?game_id=${games[i].id}" class="card-link-wrapper">
                        <img src="${imageUrl}" class="card-img-top card-img-uniform" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${games[i].name}</h5>
                            <button class="btn btn-primary">Add to Cart</button>
                        </div>

                    </div>                        </a>
                </div>
        `;

                gamesRow.innerHTML += cardHTML;

    };

})
.catch(error => {
    console.error('There was an error:', error);
});

