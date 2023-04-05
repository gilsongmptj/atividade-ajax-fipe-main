const marcasLista = document.querySelector("#vehicles_brand");
const modelosLista = document.querySelector("#vehicles_model");
const anoLista = document.querySelector("#vehicles_year");
const veiculosTipo = document.querySelector("#vehicles_types")

const baseUrl = "https://parallelum.com.br/fipe/api/v1/"
// const endpointAno= `${baseUrl}carros/marcas/${}/modelos/${}/anos/`

let novotipo;

veiculosTipo.addEventListener("click",(event) =>{
    const li = event.target;
    if(li.classList.contains("active")){
      li.classList.remove("active")
      marcasLista.innerHTML = '';
      modelosLista.innerHTML ='';
    }else{
      li.classList.add("active")
       const tipos = li.getAttribute('data-type')
       let novotipo = `${baseUrl}${tipos}/marcas`
       
       selectTipo(novotipo, tipos)
       
    }
})


function selectTipo(novotipo, tipos){
  if(tipos != null){
    console.log(novotipo) // PESQUISA FABRICA
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
              console.log(novaMarca) // PESQUISA MODELO
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
                   console.log(novoAno) // PESQUISA ANO
                   fetch(novoAno)
                   .then((response) => response.json())
                   .then((data) => {
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
                      console.log(novo) // PESQUISA PREÇO , COLAR AS INFORMAÇÕES DENTRO DO MODAL, SE REMOVIDO O MODAL HIDE_MODAL A TELINHA NOVA APARECE
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
