const btnCarrinho = document.getElementById('botao-carrinho');
const carrinho = document.getElementById('carrinho');
const adicionarAoCarrinho = document.querySelector('main');
const totalItens = document.getElementById('totalItens');
const sutotal = document.getElementById('subtotal');

function addCarrinho() {
  carrinho.classList.remove('carrinho-fechado');
  carrinho.classList.add('carrinho-aberto');
  let contador = '0';
  if (itensNoCarrinho.length >= 1) {
    contador = itensNoCarrinho.length;
  }
  let total = 0;
  carrinho.innerHTML = `
        <div class='divTitulo'>
        <h2>Carrinho</h2>
        <button class='btnFechar'>X</button>
        </div>
        <p>Itens adicionados: ${contador}</p>
        <div id="itens-carrinho"></div>`;

  if (itensNoCarrinho.length >= 1) {
    itensNoCarrinho.forEach((item) => {
      document.getElementById('itens-carrinho').innerHTML += `
                <div class="carrinho-item">
                  <img src="${item.imagem}" alt="${item.nome}" class="carrinho-item-img">
                  <div class="carrinho-item-info">
                    <span class="carrinho-item-nome">${item.nome}</span>
                    <span class="carrinho-item-tamanho">Tamanho: ${item.tamanho}</span>
                  </div>
                  <div class="carrinho-item-valor">
                    <span class="carrinho-item-preco">R$ ${String(item.preco.toFixed(2)).replace('.', ',')}</span>
                  </div>
                </div>
    `;
      total += item.preco;
    });
  }

  carrinho.innerHTML += `
        <p>Subtotal: ${String(total.toFixed(2)).replace('.', ',')}</p>
        <button>Finalizar Compra</button>`;

  document.querySelector('.btnFechar').addEventListener('click', () => {
    carrinho.classList.remove('carrinho-aberto');
    carrinho.classList.add('carrinho-fechado');
  });

  const selecioando = document.querySelectorAll('.tamanhoEscolhido');
  selecioando.forEach((cada) => {
    cada.classList.remove('tamanhoEscolhido');
  });

  totalItens.innerText = `Itens adicionados: ${contador}`;
  sutotal.innerText = `Subtotal: R$ ${String(total.toFixed(2)).replace('.', ',')}`;
}

let itensNoCarrinho = [];
btnCarrinho.addEventListener('click', addCarrinho);

adicionarAoCarrinho.addEventListener('click', (e) => {
  if (e.target.closest('.addCarrinho')) {
    const itensSelecionados = document.querySelectorAll('.tamanhoEscolhido');
    itens = [];
    if (itensSelecionados.length >= 1) {
      itensSelecionados.forEach((item) => {
        const separado = item.id.split('_');
        itens.push({ id: separado[0], tamanho: separado[1] });
      });

      produtos.forEach((produto) => {
        itens.forEach((item) => {
          if (item.id == produto.id) {
            produto.tamanhos.forEach((tamanho) => {
              if (item.tamanho === tamanho) {
                itensNoCarrinho.push({
                  id: produto.id,
                  categoria: produto.categoria,
                  nome: produto.nome,
                  imagem: produto.imagem,
                  preco: produto.preco,
                  tamanho: tamanho,
                });
                addCarrinho(itensNoCarrinho);
              }
            });
          }
        });
      });
    }
  }
});
