const btnCarrinho = document.getElementById('botao-carrinho');
const carrinho = document.getElementById('carrinho');
const adicionarAoCarrinho = document.querySelector('main');

function addCarrinho() {
  carrinho.classList.remove('carrinho-fechado');
  carrinho.classList.add('carrinho-aberto');

  carrinho.innerHTML = `
        <div class='divTitulo'>
        <h2>Carrinho</h2>
        <button class='btnFechar'>X</button>
        </div>
        <p>Itens adicionados: 0</p>
        <div id="itens-carrinho"></div>
        <p>Subtotal: R$ 0,00</p>
        <button>Finalizar Compra</button>

  `;
  document.querySelector('.btnFechar').addEventListener('click', () => {
    carrinho.classList.remove('carrinho-aberto');
    carrinho.classList.add('carrinho-fechado');
  });
}

btnCarrinho.addEventListener('click', addCarrinho);

adicionarAoCarrinho.addEventListener('click', (e) => {
  if (e.target.closest('.addCarrinho')) {
    const itensSelecionados = document.querySelectorAll('.tamanhoEscolhido');
    itens = [];
    if (itensSelecionados.length >= 1) {
      itensSelecionados.forEach((item) => {
        const id = Number(item.id.split('_', [1]));
        const tamanho = item.id.split('_', [2]);
        itens.push([id, tamanho]);
      });
      const dictItens = Object.fromEntries(itens);
      console.log(dictItens);
      produtos.forEach((produto) => {});
    }
  }
});
