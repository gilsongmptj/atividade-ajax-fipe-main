const marcasLista = document.querySelector("#vehicles_brand");
const modelosLista = document.querySelector("#vehicles_model");
const anoLista = document.querySelector("#vehicles_year");
const veiculosTipo = document.querySelector("#vehicles_types");
const botao = document.querySelector("#button");
const modal = document.querySelector("#modal");


const baseUrl = "https://parallelum.com.br/fipe/api/v1/"

let novotipo;

veiculosTipo.addEventListener("click",(event) =>{
    const li = event.target;
    if(li.classList.contains("active")){
      li.classList.remove("active")
      marcasLista.innerHTML = '';
      modelosLista.innerHTML ='';
      anoLista.innerHTML ='';
      botao.classList.remove("search_button_show")
    }else{
      li.classList.add("active")
       const tipos = li.getAttribute('data-type')
       let novotipo = `${baseUrl}${tipos}/marcas`
       
       selectTipo(novotipo, tipos)
       
    }
})


function selectTipo(novotipo, tipos){
  if(tipos != null){
    fetch(novotipo)
      .then((response) => response.json())
      .then((data) => {
        data.map((marca) => {
          let itemLista = document.createElement("option");
          itemLista.innerText = marca.nome;
          itemLista.value = marca.codigo;
          marcasLista.appendChild(itemLista)
          
          marcasLista.addEventListener("change", (event) => {
            onchange  = (event) => {
              const marcaSelecionada = event.target.value;
              let novaMarca =  `${novotipo}/${marcaSelecionada}/modelos`

              fetch(novaMarca)
              .then((response) => response.json())
              .then((data) => {
                data.modelos.forEach((modelo) => {
                  let itemLista = document.createElement("option");
                  itemLista.innerText = modelo.nome;
                  itemLista.value = modelo.codigo;
                  modelosLista.appendChild(itemLista)  
                }) 
              }) 
              modelosLista.addEventListener("change", (event) => {
                
                onchange = (event) =>{
                  const modeloSelecionado = event.target.value;
                  let novoAno =  `${novotipo}/${marcaSelecionada}/modelos/${modeloSelecionado}/anos/`

                   fetch(novoAno)
                   .then((response) => response.json())
                   .then((data) => {
                    console.log(data)
                     data.forEach((ano) => {
                       let itemLista = document.createElement("option");
                       itemLista.innerText = ano.nome;
                       itemLista.value = ano.codigo;
                       anoLista.appendChild(itemLista)  
                     }) 
                   })

                   anoLista.addEventListener("change", (event) =>{
                    onchange = (event) =>{
                      const anoSelecionado = event.target.value
                      let novo  = `${novotipo}/${marcaSelecionada}/modelos/${modeloSelecionado}/anos/${anoSelecionado}`
                      botao.classList.add("search_button_show");

                      botao.addEventListener("click", (event) =>{
                        if(modal.classList.contains("hide_modal")){
                          modal.classList.remove("hide_modal");

                          fetch(novo)
                          .then((response) => response.json())
                          .then(data => {
                             document.querySelector(".reference_month .value").textContent = data.MesReferencia;
                             document.querySelector(".fipe_code .value").textContent = data.CodigoFipe;
                             document.querySelector(".brand .value").textContent = data.Marca;
                             document.querySelector(".year .value").textContent = data.AnoModelo;
                             document.querySelector(".vehicle_name").textContent = data.Modelo;
                             document.querySelector(".price").textContent = data.Valor;
                          })
                        }  
                          const modalClose = document.querySelector(".close");
                          modalClose.addEventListener("click", (event) =>{
                                 modal.classList.add("hide_modal");
                                 marcasLista.innerHTML = '';
                                 modelosLista.innerHTML ='';
                                 anoLista.innerHTML ='';
                                 botao.classList.remove("search_button_show")
                          })
                        
                      } )

                    }
                   })
                  }

                }
              )
              }
            }
          )            
        })
      }
    )
  }
}
