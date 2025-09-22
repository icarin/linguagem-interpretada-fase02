// //section da api de preços
// const priceUrl = 'https://www.cheapshark.com/api/1.0/games?title=';

// function searchPrice(){

// }
//section da api de games info


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

// const cepInput = document.getElementById("cep");
    // const ruaInput = document.getElementById("rua");
    // const bairroInput = document.getElementById("bairro");
    // const cidadeInput = document.getElementById("cidade");
    // const ufInput = document.getElementById("uf");
    // const mensagemDiv = document.getElementById("mensagem");


    //     function limparFormulario() {
    //     ruaInput.value = "";
    //     bairroInput.value = "";
    //     cidadeInput.value = "";
    //     ufInput.value = "";
    //     mensagemDiv.textContent = "";
    //     ruaInput.disabled = true;
    //     bairroInput.disabled = true;
    //     cidadeInput.disabled = true;
    //     ufInput.disabled = true;
    // }

    //     function habilitarPreenchimentoManual(msg) {
    //     ruaInput.disabled = false;
    //     bairroInput.disabled = false;
    //     cidadeInput.disabled = false;
    //     ufInput.disabled = false;
    //     mensagemDiv.textContent = msg;
    //     mensagemDiv.style.color = "red";
    // }

    // //tentativa de fazer mascara
    // cepInput.addEventListener("input", (e) => {
    //     let valor = e.target.value.replace(/\D/g, ""); 
    //     if (valor.length > 5) {
    //         e.target.value = valor.substring(0, 5) + "-" + valor.substring(5, 8);
    //     } else {
    //         e.target.value = valor;
    //     }
    // });


    // cepInput.addEventListener("blur" , async() => {
    //     const cep = cepInput.value.replace (/\D/g,"");
    //     limparFormulario();

    //     if (cep.length > 0 && cep.length !== 8 ){
    //             habilitarPreenchimentoManual("Cep invalido. Preencha manualmente.");
    //         return;
    //     }

    //     try {
    //         const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

    //         const resposta = await response.json();

    //         if(resposta.erro){
    //             habilitarPreenchimentoManual("CEP não encontrado. Preencha manualmente.");
    //             return;
    //         }
    //         ruaInput.value = data.logradouro;
    //         bairroInput.value = data.bairro;
    //         cidadeInput.value = data.localidade;
    //         ufInput.value = data.uf;
    //     } catch (error) {
            
    //     }
    // })
    