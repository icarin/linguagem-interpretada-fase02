
//section da api de games info
const apiKey = '7c3ab28bec964f1abe8c837c7803eec8';

const urlGames = `https://api.rawg.io/api/games?key=${apiKey}`;


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
    