const apiKey = '7c3ab28bec964f1abe8c837c7803eec8';
const urlGames = `https://api.rawg.io/api/games?key=${apiKey}`;
const gamesRow = document.getElementById('games-row');
let games = [];
const barraDePesquisa = document.getElementById("barraDePesquisa");

function getCarrinho() {
    const carrinho = localStorage.getItem('carrinho');
    if (carrinho) {
        return JSON.parse(carrinho);
    } else {
        return [];
    }
}
function saveCarrinho(carrinho) {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

async function adicionarAoCarrinho(gameData) {

    try {
        const gameName = gameData.name;
        const priceResponse = await fetch(`https://www.cheapshark.com/api/1.0/games?title=${encodeURIComponent(gameName)}`);
        if (!priceResponse.ok) {
            throw new Error('Não foi possível buscar o preço.');
        }
        const priceData = await priceResponse.json();
        const cheapestPrice = (priceData && priceData.length > 0) ? priceData[0].cheapest : 'Indisponível';

        const gameParaCarrinho = {
            id: gameData.id,
            name: gameData.name,
            img: gameData.background_image,
            price: cheapestPrice,
            description: gameData.description || '', 
            quantity: 1
        };
        
        let carrinho = getCarrinho();
        const gameExistente = carrinho.find(item => item.id === gameParaCarrinho.id);

        if (gameExistente) {
            gameExistente.quantity++;
        } else {
            carrinho.push(gameParaCarrinho);
        }

        saveCarrinho(carrinho);
        notificacao(`${gameData.name} foi adicionado ao carrinho!`, "btn-success");

    } catch (error) {
        console.error("Erro ao adicionar ao carrinho:", error);
        notificacao("Não foi possível adicionar o item. Tente novamente.", "btn-danger");
    } finally {
        buttonElement.disabled = false;
        buttonElement.innerHTML = 'Add to Cart';
    }
}

fetch(urlGames)
    .then(response => response.json())
    .then(data => {
        games = data.results;

        redenrizarCards(games);
    })
    .catch(error => {
        console.error('Houve um erro:', error);
    });

function redenrizarCards(games){
    gamesRow.innerHTML = '';

    for (let i = 0; i < 18; i++) {
        const imageUrl = games[i].background_image || 'https://placehold.co/600x400?text=Sem+Imagem';
        const cardHTML = `
            <div class="col">
                <div class="card h-100 shadow-sm card-game">
                    <a href="game-details.html?game_id=${games[i].id}" class="card-link-wrapper">
                        <img src="${imageUrl}" class="card-img-top card-img-uniform" alt="Capa do jogo ${games[i].name}">
                    </a>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${games[i].name}</h5>
                        <button class="btn btn-primary btn-add-to-cart mt-auto" data-game-index="${i}">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
        gamesRow.innerHTML += cardHTML;
    }
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', event => {
            const gameIndex = event.target.getAttribute('data-game-index');
            const gameData = games[gameIndex];
            adicionarAoCarrinho(gameData);
        });
    });
}

barraDePesquisa.addEventListener("keyup", () => {
    const termo = barraDePesquisa.value.toLowerCase();

    const gamesFiltrados = games.filter(game => {
        return game.name.toLowerCase().includes(termo);
    });

    redenrizarCards(gamesFiltrados);
});

function notificacao(msg, cor) {
    const notificacao = document.createElement("div");
    notificacao.classList.add("notificacao", "btn", cor);
    notificacao.textContent = msg;
    document.body.appendChild(notificacao);

    setTimeout(() => {
        notificacao.remove();
    }, 2000);
}