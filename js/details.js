const apiKey = '7c3ab28bec964f1abe8c837c7803eec8';

const carrinhoDeCompras = [];

function verificarCarrinho() {
    let imgLink = document.getElementById("img-carrinho");

    if (carrinhoDeCompras.length >= 1) {
        imgLink.setAttribute("src", "./assets/carrinho-cheio.png");
    } else {
        imgLink.setAttribute("src", "./assets/carrinho.png");
    }
};

window.onload = verificarCarrinho();

async function loadGameDetails(){
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('game_id');

    if(!gameId){
        document.getElementById('game-content').innerHTML = '<p class="text-danger> ID not found.</p>';
    }

    try{
        const apiGames = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${apiKey}`);
        if(!apiGames.ok) throw new Error('Error while trying to search details on API(games).');
        const game = await apiGames.json();

        const gameName = game.name;

        const priceReponse = await fetch(`https://www.cheapshark.com/api/1.0/games?title=${encodeURIComponent(gameName)}`);
        if(!priceReponse.ok) throw new Error('Error while trying to search details on API(price).');
        const price = await priceReponse.json();

        document.getElementById('game-title').textContent = game.name;
        document.getElementById('game-image').src = game.background_image;
        document.getElementById('game-release-date').textContent = new Date(game.released).toLocaleDateString('pt-BR');
        document.getElementById('game-rating').textContent = game.rating;

        document.getElementById('game-price').textContent = price[0].cheapest;
    
        document.getElementById('game-description').innerHTML = game.description;
        
        document.querySelector(".addCart").addEventListener("click", () => { adicionarAoCarrinho(game.id, game.name, game.background_image, price[0].cheapest, game.description)});

    } catch (error){
        console.error(error);
    }
};

window.onload = loadGameDetails;

function adicionarAoCarrinho(id, name, img, price ,description){
    const game = {
        id,
        name,
        img,
        price,
        description,
        quantity: 1
    }

    const itemExistente = carrinhoDeCompras.find(carrinhoDeCompras => carrinhoDeCompras.id === id);

    if(itemExistente){
        itemExistente.quantity++
    } else {
        carrinhoDeCompras.push(game);
    }

    notificacao("Item adicionado ao carrinho com sucesso!");
};

function removerDoCarrinho(id){
    const index = carrinhoDeCompras.findIndex(game => game.id === id);

    if (id > -1) {
        carrinhoDeCompras.splice(id, 1);
        notificacao("Item retirado com sucesso!")
    };
};

function notificacao(msg){
    const notificacao = document.createElement("div");
    notificacao.className = "notificacao btn btn-danger";
    notificacao.textContent = msg;
    document.body.appendChild(notificacao);

    setTimeout(() => {
        notificacao.remove()
    }, 2 * 1000);
};