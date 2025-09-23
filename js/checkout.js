function getCarrinho() {
    const carrinho = localStorage.getItem('carrinho');
    return carrinho ? JSON.parse(carrinho) : [];
}

function saveCarrinho(carrinho) {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function removerDoCarrinho(id) {
    let carrinho = getCarrinho();
    const novoCarrinho = carrinho.filter(game => game.id !== Number(id));
    saveCarrinho(novoCarrinho);
    atualizarCarrinho(novoCarrinho); 
}

function atualizarCarrinho(carrinho) {
    let container = document.querySelector(".container-lista");
    if (!container) return; 

    container.innerHTML = "";

    let totalGeral = 0;

    if (carrinho.length === 0) {
        container.innerHTML = "<h4>Seu carrinho está vazio.</h4>";
        const totalContainer = document.querySelector("#total-container");
        if (totalContainer) totalContainer.innerHTML = "";
        return;
    }

    carrinho.forEach(game => {
        const priceAsNumber = parseFloat(game.price);
        const isValidPrice = !isNaN(priceAsNumber);
        
        const valorItem = isValidPrice ? priceAsNumber : 0;
        const valorTotalItem = valorItem * game.quantity;
        
        totalGeral += valorTotalItem;

        container.innerHTML += `
            <li class="card list-group-item py-3 mb-3">
                <div class="row g-3 align-items-center">
                    <div class="col-4 col-md-3">
                        <a href="game-details.html?game_id=${game.id}">
                            <img src="${game.img}" class="img-fluid" alt="${game.name}">
                        </a>
                    </div>

                    <div class="col-8 col-md-5">
                        <h5 class="mb-1"><b><a href="game-details.html?game_id=${game.id}" class="text-decoration-none text-danger">${game.name}</a></b></h5>
                        <small class="text-secondary">Valor por item: ${isValidPrice ? `R$ ${valorItem.toFixed(2)}` : 'N/A'}</small> <br>
                        <span class="text-dark">Valor total do item: R$ ${valorTotalItem.toFixed(2)}</span>
                    </div>

                    <div class="col-12 col-md-4 d-flex justify-content-end align-items-center">
                        <div class="input-group input-group-sm" style="width: 100px;">
                            <input type="text" class="form-control text-center border-dark" value="${game.quantity}" readonly>
                        </div>
                        
                        <button type="button" class="btn btn-outline-danger btn-sm border-dark ms-2 btn-remover" data-game-id="${game.id}">
                            <img src="./assets/delete.png" style="height: 20px;" alt="botão de excluir" class="pe-none">
                        </button>
                    </div>
                </div>
            </li>
        `;
    });

    const totalContainer = document.querySelector("#total-container") || document.createElement('div');
    totalContainer.id = "total-container";
    
    if (totalGeral > 0) {
        totalContainer.innerHTML = `
            <div class="text-end mt-4">
                <h3>Total da Compra: <span class="text-success">R$ ${totalGeral.toFixed(2)}</span></h3>
            </div>
        `;
    } else {
        totalContainer.innerHTML = "";
    }
    container.parentNode.appendChild(totalContainer);

    document.querySelectorAll('.btn-remover').forEach(button => {
        button.addEventListener('click', (event) => {
            const gameId = event.currentTarget.getAttribute('data-game-id');
            removerDoCarrinho(gameId);
        });
    });
}


const carrinhoDeCompras = getCarrinho();
atualizarCarrinho(carrinhoDeCompras);

function aplicarMobile(mobile){
    if (mobile.matches){
        let containerLink = document.querySelector(".container-checkout");
        let buttonLink = document.querySelector(".botao");
        let formularioLink = document.querySelector(".formulario");

        if (!containerLink || !buttonLink || !formularioLink) return; 

        containerLink.classList.remove("d-flex");
        containerLink.classList.add("d-grid");
        buttonLink.classList.add("d-flex", "justify-content-center");
        formularioLink.removeAttribute("style");
    } else {
        let containerLink = document.querySelector(".container-checkout");
        let buttonLink = document.querySelector(".botao");
        let formularioLink = document.querySelector(".formulario");

        if (!containerLink || !buttonLink || !formularioLink) return; 

        containerLink.classList.add("d-flex");
        containerLink.classList.remove("d-grid");
        buttonLink.classList.remove("d-flex", "justify-content-center");
        formularioLink.setAttribute("style", "height: 50%;");
    }
}

let mobile = window.matchMedia("(max-width: 768px)");
aplicarMobile(mobile);

mobile.addEventListener("change", aplicarMobile);