const carrinhoDeCompras = [];

function verificarCarrinho(){
    if(carrinhoDeCompras.length >= 1){
        let imgLink = document.getElementById("img-carrinho");

        imgLink.setAttribute("src", "./assets/carrinho-cheio.png");
    } else {
        let imgLink = document.getElementById("img-carrinho");

        imgLink.setAttribute("src", "./assets/carrinho.png");
    }
};

window.onload = verificarCarrinho;

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