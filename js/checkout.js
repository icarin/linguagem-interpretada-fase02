import { carrinhoDeCompras } from "./details.js";

function atualizarCarrinho(carrinho){
    let container = document.querySelector(".container-lista")
    
    container.innerHTML = ""

    carrinho.array.forEach(game => {
        container.innerHTML += `
                    <li class="card list-group-item py-3">
                        <div class="row g-3">

                            <!-- IMAGEM -->
                            <div class="col-3">
                                <a href="#">
                                    <img src="${game.background_image}" 
                                    class="img-fluid" alt="img teste">
                                </a>
                            </div>

                            <!-- DESCRICAO-->
                            <div class="col-6">
                                <h4><b><a href="#" class="text-decoration-none text-danger">${game.name}</a></b></h4>
                                <p><small>${game.description}
                                </small></p>
                            </div>

                            <!-- BOTOES -->
                            <div class="col-3 pt-4">
                                <div class="d-flex justify-content-center">
                                        <div class="input-group input-group-sm" style="width: 110px;">
                                        <input type="text" class="form-control text-center border-dark" value="${game.quantity}">
                                    </div>
                                </div>
                                <!-- Botão de excluir -->
                                <div class="d-flex justify-content-center">
                                    <button type="button" class="btn btn-outline-danger btn-sm border-dark mt-2" onclick="removerDoCarrinho(${game.id})">
                                        <img src="./assets/delete.png" style="height: 20px;" alt="botão de excluir">
                                    </button>
                                </div>
                                <div class="text-right mt-2">
                                    <small class="text-secondary">Valor por item: R$ ${game.price}</small> <br>
                                    <span class="text-dark">Valor total: R$ ${game.quantity * game.price}</span>
                                </div>   
                            </div>
                            
                        </div>
                    </li>
        `
    });
};

atualizarCarrinho(carrinhoDeCompras);

function aplicarMobile(mobile){
    if (mobile.matches){
        let containerLink = document.querySelector(".container-checkout");
        let buttonLink = document.querySelector(".botao");
        let formularioLink = document.querySelector(".formulario");

        containerLink.classList.remove("d-flex");
        containerLink.classList.add("d-grid");
        buttonLink.classList.add("d-flex", "justify-content-center");
        formularioLink.removeAttribute("style");
    } else {
        let containerLink = document.querySelector(".container-checkout");
        let buttonLink = document.querySelector(".botao");
        let formularioLink = document.querySelector(".formulario");

        containerLink.classList.add("d-flex");
        containerLink.classList.remove("d-grid");
        buttonLink.classList.remove("d-flex", "justify-content-center");
        formularioLink.setAttribute("style", "height: 50%;");
    }
}

let mobile = window.matchMedia("(max-width: 768px)");
aplicarMobile(mobile);

mobile.addEventListener("change", aplicarMobile);