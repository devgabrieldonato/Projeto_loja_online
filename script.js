const produtos = [
  {
    categoria: 'Camiseta',
    nome: 'Camiseta Branca',
    imagem: 'imagens/camisetas/branco.png',
    preco: 49.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    categoria: 'Camiseta',
    nome: 'Camiseta Azul',
    imagem: 'imagens/camisetas/azul.png',
    preco: 49.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    categoria: 'Moletom',
    nome: 'Moletom Branco',
    imagem: 'imagens/blusas-moletom/branco.png',
    preco: 49.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    categoria: 'Moletom',
    nome: 'Moletom Azul',
    imagem: 'imagens/blusas-moletom/azul.png',
    preco: 49.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
];
const main = document.querySelector('main');

document.addEventListener('DOMContentLoaded', () => {
  const categorias = [
    ...new Set(produtos.map((produto2) => produto2.categoria)),
  ];

  let contador_div = 1;
  let contador_section = 1;
  categorias.forEach((categoria) => {
    let incremento = `produtos${contador_div}`;
    const sectionCategoria = document.createElement('section');
    sectionCategoria.classList.add('categorias');
    sectionCategoria.id = contador_section;
    main.append(sectionCategoria);
    document.getElementById(contador_section).innerHTML +=
      `<h2>${categoria}</h2>`;
    const divProdutos = document.createElement('div');
    divProdutos.classList.add(incremento);
    document.querySelector('.categorias').append(divProdutos);

    produtos.forEach((produto) => {
      if (produto.categoria === categoria) {
        // compara a categoria do produto com a categoria atual do loop. adicionado o ===;

        let botoesTamanho = ''; // variável para armazenar os botões de tamanho

        produto.tamanhos.forEach((tamanho) => {
          botoesTamanho += `<button>${tamanho}</button>`;
        });
        // adicionado o dado-nome e dado-preco para caso queira pegar no carrinho, e adicionado o alt na imagem para acessibilidade.
        document.querySelector(`.${incremento}`).innerHTML +=
          `<article dado-nome=${produto.nome} dado-preco=${produto.preco}> 
                    <img class="imagem-produto" src="${produto.imagem}" alt="${produto.nome}"> 
                    <h3>${produto.nome}</h3>
                    <p>R$ ${String(produto.preco.toFixed(2)).replace('.', ',')}</p>
                    <p>Selecione o tamanho</p>
                    <div>
                        ${botoesTamanho}
                    </div>
                    <button>Adicionar ao carrinho</button>
                    </article>`;
        contador_div = contador_div + 1;
      }
    });
    contador_section = +1;
  });
});
