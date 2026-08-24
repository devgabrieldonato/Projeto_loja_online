const produtos = [
  {
    id: 1,
    categoria: 'Camiseta',
    nome: 'Camiseta Branca',
    imagem: 'imagens/camisetas/branco.png',
    preco: 49.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 2,
    categoria: 'Camiseta',
    nome: 'Camiseta Azul',
    imagem: 'imagens/camisetas/azul.png',
    preco: 49.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 3,
    categoria: 'Moletom',
    nome: 'Moletom Branco',
    imagem: 'imagens/blusas-moletom/branco.png',
    preco: 49.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 4,
    categoria: 'Moletom',
    nome: 'Moletom Azul',
    imagem: 'imagens/blusas-moletom/azul.png',
    preco: 49.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 5,
    categoria: 'Calças',
    nome: 'Calça Branco',
    imagem: 'imagens/calcas-moletom/branco.png',
    preco: 49.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
];
const main = document.querySelector('main');

document.addEventListener('DOMContentLoaded', () => {
  const categorias = [
    ...new Set(produtos.map((produto2) => produto2.categoria)),
  ];

  let contador = 1;
  categorias.forEach((categoria) => {
    let incremento = `produtos${contador}`;
    const sectionCategoria = document.createElement('section');
    sectionCategoria.classList.add('categorias');
    sectionCategoria.id = contador;
    main.append(sectionCategoria);
    document.getElementById(contador).innerHTML += `<h2>${categoria}</h2>`;
    const divProdutos = document.createElement('div');
    divProdutos.classList.add('produtos');
    divProdutos.id = incremento;
    document.getElementById(contador).append(divProdutos);

    produtos.forEach((produto) => {
      if (produto.categoria === categoria) {
        // compara a categoria do produto com a categoria atual do loop. adicionado o ===;

        let botoesTamanho = ''; // variável para armazenar os botões de tamanho

        produto.tamanhos.forEach((tamanho) => {
          botoesTamanho += `<button id='${produto.id}_${tamanho}' class='buttonTamanho'>${tamanho}</button>`;
          let id = `${produto.id}_${tamanho}`;
        });
        // adicionado o dado-nome e dado-preco para caso queira pegar no carrinho, e adicionado o alt na imagem para acessibilidade.
        document.querySelector(`#${incremento}`).innerHTML +=
          `<article dado-nome=${produto.id} dado-preco=${produto.preco}> 
                    <img class="imagem-produto" src="${produto.imagem}" alt="${produto.nome}"> 
                    <h3>${produto.nome}</h3>
                    <p>R$ ${String(produto.preco.toFixed(2)).replace('.', ',')}</p>
                    <p>Selecione o tamanho</p>
                    <div id='conjuntoBotoes_${produto.id}'>
                        ${botoesTamanho}
                    </div>
                    <button>Adicionar ao carrinho</button>
                    </article>`;

        const conjunto = document.getElementById(
          `conjuntoBotoes_${produto.id}`,
        );
        conjunto.addEventListener('click', (e) => {
          const button = e.target.closest('.buttonTamanho');

          if (button) {
            const idButton = button.id;
            console.log(idButton);
          }
        });
      }
    });
    contador = contador + 1;
  });
});
