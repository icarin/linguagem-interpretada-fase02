const apiKey = '7c3ab28bec964f1abe8c837c7803eec8';

function getCarrinho() {
    const carrinho = localStorage.getItem('carrinho');
    return carrinho ? JSON.parse(carrinho) : [];
}

function saveCarrinho(carrinho) {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function verificarCarrinho() {
    const carrinho = getCarrinho();
    let imgLink = document.getElementById("img-carrinho");
    if (imgLink) {
        imgLink.setAttribute("src", carrinho.length > 0 ? "./assets/carrinho-cheio.png" : "./assets/carrinho.png");
    }
}

function adicionarAoCarrinho(id, name, img, price, description) {
    const game = { id, name, img, price, description, quantity: 1 };
    let carrinho = getCarrinho();
    const gameExistente = carrinho.find(item => item.id === id);

    if (gameExistente) {
        gameExistente.quantity++;
    } else {
        carrinho.push(game);
    }
    
    saveCarrinho(carrinho);
    verificarCarrinho();
    notificacao("Item adicionado ao carrinho com sucesso!");
}

async function loadGameDetails() {
    verificarCarrinho();
    
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('game_id');

    if (!gameId) {
        document.getElementById('game-content').innerHTML = '<p class="text-danger">ID não encontrado.</p>';
        return;
    }

    try {
        const apiGames = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${apiKey}`);
        if (!apiGames.ok) throw new Error('Erro ao buscar detalhes na API de jogos.');
        const game = await apiGames.json();

        const gameName = game.name;
        const priceReponse = await fetch(`https://www.cheapshark.com/api/1.0/games?title=${encodeURIComponent(gameName)}`);
        if (!priceReponse.ok) throw new Error('Erro ao buscar detalhes na API de preços.');
        const price = await priceReponse.json();

        const cheapestPrice = (price && price.length > 0) ? price[0].cheapest : 'Indisponível';

        document.getElementById('game-title').textContent = game.name;
        document.getElementById('game-image').src = game.background_image;
        document.getElementById('game-release-date').textContent = new Date(game.released).toLocaleDateString('pt-BR');
        document.getElementById('game-rating').textContent = game.rating;
        document.getElementById('game-price').textContent = cheapestPrice === 'Indisponível' ? cheapestPrice : `$${cheapestPrice}`;
        document.getElementById('game-description').innerHTML = game.description;
        
        document.querySelector(".addCart").addEventListener("click", () => { 
            adicionarAoCarrinho(game.id, game.name, game.background_image, cheapestPrice, game.description);
        });

    } catch (error) {
        console.error(error);
        const contentDiv = document.getElementById('game-content');
        if(contentDiv) contentDiv.innerHTML = `<p class="text-danger text-center">Não foi possível carregar os detalhes do jogo. Tente novamente mais tarde.</p>`;
    }
}

window.onload = loadGameDetails;

function notificacao(msg) {
    const notificacao = document.createElement("div");
    notificacao.className = "notificacao btn btn-success"; 
    notificacao.textContent = msg;
    document.body.appendChild(notificacao);

    setTimeout(() => {
        notificacao.remove();
    }, 2000);
}