const btnCarrinho = document.getElementById('botao-carrinho');
const carrinho = document.getElementById('carrinho');
const adicionarAoCarrinho = document.querySelector('main');
const totalItens = document.getElementById('totalItens');
const sutotal = document.getElementById('subtotal');

// Variável onde vai os itens que estão no carrinho
let itensNoCarrinho = [];

// Função abrir carrinho
function addCarrinho() {
  // Abrinco carrinho
  carrinho.classList.remove('carrinho-fechado');
  carrinho.classList.add('carrinho-aberto');

  // verificando contador
  let contador = 0;
  if (itensNoCarrinho.length >= 1) {
    itensNoCarrinho.forEach((item)=>{
      contador += item.quantidade
    })
  }
  let total = 0;

  // adicionando itens no carrinho
  carrinho.innerHTML = `
        <div class='divTitulo'>
        <h2>Carrinho</h2>
        <button class='btnFechar'>X</button>
        </div>
        <p>Itens adicionados: ${contador}</p>
        <div id="itens-carrinho"></div>`;

  // caso haja alguma coisa dentro do itensNoCarinho, irá fazer um forEach, percorrendo cada item e adicionando item no carrinho.
  if (itensNoCarrinho.length >= 1) {
    itensNoCarrinho.forEach((item) => {
      console.log(itensNoCarrinho)
      let preco = item.preco * item.quantidade
      document.getElementById('itens-carrinho').innerHTML += `
               <div class="carrinho-item" id="carrinho-item${item.id}">
                  <img src="${item.imagem}" alt="${item.nome}" class="carrinho-item-img">
                  <div class="carrinho-item-info">
                    <span class="carrinho-item-nome">${item.nome}</span>
                    <span class="carrinho-item-tamanho">Tamanho: ${item.tamanho}</span>
                    <div class="carrinho-item-qtd">
                      <button class="btnQtd btnMenos" id= "btnMenos${item.id}-${item.tamanho}">-</button>
                      <span class="carrinho-item-quantidade" id='quantidade${item.id}-${item.tamanho}'>${item.quantidade}</span>
                      <button class="btnQtd btnMais" id="btnMais${item.id}-${item.tamanho}">+</button>
                    </div>
                  </div>
                  <div class="carrinho-item-valor">
                    <span class="carrinho-item-preco">R$ ${String(preco.toFixed(2)).replace('.', ',')}</span>
                  </div>
                </div>

            
    `;
      // Váriável total
      total += preco;
    });
  }

  // Ultima parte do carrinho.
  carrinho.innerHTML += `
        <p>Subtotal: ${String(total.toFixed(2)).replace('.', ',')}</p>
        <button>Finalizar Compra</button>`;

  // Fechamento do carrinho, quando botão for clicado
  document.querySelector('.btnFechar').addEventListener('click', () => {
    carrinho.classList.remove('carrinho-aberto');
    carrinho.classList.add('carrinho-fechado');
  });

  // const selecioando = document.querySelectorAll('.tamanhoEscolhido');
  // selecioando.forEach((cada) => {
  //   cada.classList.remove('tamanhoEscolhido');
  // });

  // adicioando informações no carrinho do header
  totalItens.innerText = `Itens adicionados: ${contador}`;
  sutotal.innerText = `Subtotal: R$ ${String(total.toFixed(2)).replace('.', ',')}`;

  // botão para adicionar ou retirar produtos no carrinho
  document.getElementById('itens-carrinho').addEventListener('click', (e) => {
    if (e.target.closest('.btnMais') || e.target.closest('.btnMenos')) {
      const idButton = e.target.id;
      const tamanho = idButton.split("-")
      const id = idButton.replace(/\D/g, '');
      itensNoCarrinho.forEach((item) => {
        if (item.id == id && item.tamanho == tamanho[1]) {
          if (idButton == `btnMais${id}-${tamanho[1]}`) {
            item.quantidade = item.quantidade + 1;
            document.getElementById(`quantidade${id}-${tamanho[1]}`).innerText = item.quantidade
            addCarrinho(itensNoCarrinho)

          } else if(idButton == `btnMenos${id}-${tamanho[1]}`) {
            item.quantidade = item.quantidade - 1;
            document.getElementById(`quantidade${id}-${tamanho[1]}`).innerText = item.quantidade
            addCarrinho(itensNoCarrinho)
            if(item.quantidade <= 0){
              itensNoCarrinho = itensNoCarrinho.filter(itensNoCarrinho => itensNoCarrinho !== item)
              addCarrinho(itensNoCarrinho)
            }
          }
        }
      });
    }
  });
}
// btn para o usuário abrir o carrinho, chama função addCarrinho
btnCarrinho.addEventListener('click', addCarrinho);

// btn de adicionar ao carrinho de cada item
adicionarAoCarrinho.addEventListener('click', (e) => {
  // pega o id do botão
  const idDiv = e.target.id;
  // deixa apenas o número, retira a string
  const id = idDiv.match(/\d+/);
  if (e.target.closest('.addCarrinho')) {
    // Pega todos os tamanhos escolhidos
    const itensSelecionados = document.querySelectorAll('.tamanhoEscolhido');
    // array onde vai ser adicionado os itens
    itens = [];
    if (itensSelecionados.length >= 1) {
      // forEach nos produtos selecionados para peegar cada um deles.
      itensSelecionados.forEach((item) => {
        // separa o id do tamanho (ex : 1_GG), salva o id no id e o tamanho
        const separado = item.id.split('_');
        itens.push({ id: separado[0], tamanho: separado[1] });
      });

      // forEach nos objetos Produtos, para percorrer cada um.
      produtos.forEach((produto) => {
        // forEach no itens, para ver se tem no objeto produtos.
        itens.forEach((item) => {
          // verifica para ver se o produto que foi selecionado foi adicionado aos itens,
          if (id == item.id) {
            // quando o id do produto for igual é o item.id quer dizer que é o mesmo produto.
            if (item.id == produto.id) {
              produto.tamanhos.forEach((tamanho) => {
                // faz a mesma coisa com o tamanho, para salvar o mesmo tamanho.
                if (item.tamanho === tamanho) {
                  // salva o objeto no itensNoCarrinho
                  itensNoCarrinho.push({
                    id: produto.id,
                    categoria: produto.categoria,
                    nome: produto.nome,
                    imagem: produto.imagem,
                    preco: produto.preco,
                    tamanho: tamanho,
                    quantidade: 1,
                  });
                  // chama a função addCarrinho com o argumento intensNoCarrinho
                  addCarrinho(itensNoCarrinho);
                }
              });
            }
          }
        });
      });
    }
  }
});
