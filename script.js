const produtos = [
  // Camisetas
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
    categoria: 'Camiseta',
    nome: 'Camiseta Cinza',
    imagem: 'imagens/camisetas/cinza.png',
    preco: 49.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 4,
    categoria: 'Camiseta',
    nome: 'Camiseta Preta',
    imagem: 'imagens/camisetas/preto.png',
    preco: 49.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 5,
    categoria: 'Camiseta',
    nome: 'Camiseta Verde',
    imagem: 'imagens/camisetas/verde.png',
    preco: 49.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 6,
    categoria: 'Camiseta',
    nome: 'Camiseta Vermelha',
    imagem: 'imagens/camisetas/vermelho.png',
    preco: 49.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },

  // Casacos de Moletom
  {
    id: 7,
    categoria: 'Moletom',
    nome: 'Moletom Branco',
    imagem: 'imagens/blusas-moletom/branco.png',
    preco: 129.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 8,
    categoria: 'Moletom',
    nome: 'Moletom Azul',
    imagem: 'imagens/blusas-moletom/azul.png',
    preco: 129.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 9,
    categoria: 'Moletom',
    nome: 'Moletom Cinza',
    imagem: 'imagens/blusas-moletom/cinza.png',
    preco: 129.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 10,
    categoria: 'Moletom',
    nome: 'Moletom Preto',
    imagem: 'imagens/blusas-moletom/preto.png',
    preco: 129.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 11,
    categoria: 'Moletom',
    nome: 'Moletom Verde',
    imagem: 'imagens/blusas-moletom/verde.png',
    preco: 129.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 12,
    categoria: 'Moletom',
    nome: 'Moletom Vermelho',
    imagem: 'imagens/blusas-moletom/vermelho.png',
    preco: 129.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },

  // Bermudas
  {
    id: 13,
    categoria: 'Bermuda',
    nome: 'Bermuda Branca',
    imagem: 'imagens/bermudas/branco.png',
    preco: 49.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 14,
    categoria: 'Bermuda',
    nome: 'Bermuda Azul',
    imagem: 'imagens/bermudas/azul.png',
    preco: 49.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 15,
    categoria: 'Bermuda',
    nome: 'Bermuda Cinza',
    imagem: 'imagens/bermudas/cinza.png',
    preco: 49.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 16,
    categoria: 'Bermuda',
    nome: 'Bermuda Preta',
    imagem: 'imagens/bermudas/preto.png',
    preco: 49.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 17,
    categoria: 'Bermuda',
    nome: 'Bermuda Verde',
    imagem: 'imagens/bermudas/verde.png',
    preco: 49.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 18,
    categoria: 'Bermuda',
    nome: 'Bermuda Vermelha',
    imagem: 'imagens/bermudas/vermelho.png',
    preco: 49.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },

  // Calças de Moletom
  {
    id: 19,
    categoria: 'CalçaMoletom',
    nome: 'Calça Moletom Branca',
    imagem: 'imagens/calcas-moletom/branco.png',
    preco: 99.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 20,
    categoria: 'CalçaMoletom',
    nome: 'Calça Moletom Azul',
    imagem: 'imagens/calcas-moletom/azul.png',
    preco: 99.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 21,
    categoria: 'CalçaMoletom',
    nome: 'Calça Moletom Cinza',
    imagem: 'imagens/calcas-moletom/cinza.png',
    preco: 99.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 22,
    categoria: 'CalçaMoletom',
    nome: 'Calça Moletom Preta',
    imagem: 'imagens/calcas-moletom/preto.png',
    preco: 99.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 23,
    categoria: 'CalçaMoletom',
    nome: 'Calça Moletom Verde',
    imagem: 'imagens/calcas-moletom/verde.png',
    preco: 99.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 24,
    categoria: 'CalçaMoletom',
    nome: 'Calça Moletom Vermelha',
    imagem: 'imagens/calcas-moletom/vermelho.png',
    preco: 99.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },

  // Meias
  {
    id: 25,
    categoria: 'Meia',
    nome: 'Meia Branca',
    imagem: 'imagens/meias/branco.png',
    preco: 14.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 26,
    categoria: 'Meia',
    nome: 'Meia Azul',
    imagem: 'imagens/meias/azul.png',
    preco: 14.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 27,
    categoria: 'Meia',
    nome: 'Meia Cinza',
    imagem: 'imagens/meias/cinza.png',
    preco: 14.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 28,
    categoria: 'Meia',
    nome: 'Meia Preta',
    imagem: 'imagens/meias/preto.png',
    preco: 14.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 29,
    categoria: 'Meia',
    nome: 'Meia Verde',
    imagem: 'imagens/meias/verde.png',
    preco: 14.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 30,
    categoria: 'Meia',
    nome: 'Meia Vermelha',
    imagem: 'imagens/meias/vermelho.png',
    preco: 14.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },

  // Cuecas
  {
    id: 31,
    categoria: 'Cueca',
    nome: 'Cueca Branca',
    imagem: 'imagens/cuecas/branco.png',
    preco: 29.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 32,
    categoria: 'Cueca',
    nome: 'Cueca Azul',
    imagem: 'imagens/cuecas/azul.png',
    preco: 29.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 33,
    categoria: 'Cueca',
    nome: 'Cueca Cinza',
    imagem: 'imagens/cuecas/cinza.png',
    preco: 29.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 34,
    categoria: 'Cueca',
    nome: 'Cueca Preta',
    imagem: 'imagens/cuecas/preto.png',
    preco: 29.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 35,
    categoria: 'Cueca',
    nome: 'Cueca Verde',
    imagem: 'imagens/cuecas/verde.png',
    preco: 29.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 36,
    categoria: 'Cueca',
    nome: 'Cueca Vermelha',
    imagem: 'imagens/cuecas/vermelho.png',
    preco: 29.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },

  // Bonés
  {
    id: 37,
    categoria: 'Boné',
    nome: 'Boné Branco',
    imagem: 'imagens/bones/branco.png',
    preco: 39.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 38,
    categoria: 'Boné',
    nome: 'Boné Azul',
    imagem: 'imagens/bones/azul.png',
    preco: 39.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 39,
    categoria: 'Boné',
    nome: 'Boné Cinza',
    imagem: 'imagens/bones/cinza.png',
    preco: 39.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 40,
    categoria: 'Boné',
    nome: 'Boné Preto',
    imagem: 'imagens/bones/preto.png',
    preco: 39.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 41,
    categoria: 'Boné',
    nome: 'Boné Verde',
    imagem: 'imagens/bones/verde.png',
    preco: 39.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 42,
    categoria: 'Boné',
    nome: 'Boné Vermelho',
    imagem: 'imagens/bones/vermelho.png',
    preco: 39.9,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
  },
];
const main = document.querySelector('main');

document.addEventListener("DOMContentLoaded",()=>{

    let tamanho = produtos.length;
    
    const categorias = [...new Set(produtos.map((produto) => produto.categoria))];
    
    categorias.forEach(categoria =>{
        main.innerHTML += `<h2>${categoria}</h2>`
        produtos.forEach(produto2 => {
            if (produto2.categoria === categoria) { // compara a categoria do produto com a categoria atual do loop. adicionado o ===;
                
               /*  document.querySelector('main').innerHTML += `<article dado-nome=${produto2.nome} dado-preco=${produto2.preco}> 
                    <img class="imagem-produto" src="${produto2.imagem}" alt="${produto2.nome}"> 
                    <h3>${produto2.nome}</h3>
                    <p>R$ ${(String((produto2.preco).toFixed(2))).replace('.',',')}</p>
                    <p>Selecione o tamanho</p>
                    <div>` 
                    comentei todo esse bloco aqui não quis apagar para deixar visual como estava antes, quiser apagar pode apagar, mas foi mais para entender como que tava e como que ficou
                    o mesmo  serve para o bloco de baixo */

                    let botoesTamanho = ''; // variável para armazenar os botões de tamanho

                    produto2.tamanhos.forEach(tamanho => {
                        botoesTamanho += `<button>${tamanho}</button>`
                    });
                    // adicionado o dado-nome e dado-preco para caso queira pegar no carrinho, e adicionado o alt na imagem para acessibilidade.
                    document.querySelector('main').innerHTML += 
                    `<article dado-nome=${produto2.nome} dado-preco=${produto2.preco}> 
                    <img class="imagem-produto" src="${produto2.imagem}" alt="${produto2.nome}"> 
                    <h3>${produto2.nome}</h3>
                    <p>R$ ${(String((produto2.preco).toFixed(2))).replace('.',',')}</p>
                    <p>Selecione o tamanho</p>
                    <div>
                        ${botoesTamanho}
                    </div>
                    <button>Adicionar ao carrinho</button>
                    </article>`

  main.addEventListener('click', (e) => {
    const idButton = e.target.id;
    const button = document.getElementById(idButton);
    const botoesEscolhidos = document.querySelectorAll('.tamanhoEscolhido');
    botoesEscolhidos.forEach((botao) => {
      botao.classList.remove('tamanhoEscolhido');
    });
    if (e.target.closest('.buttonTamanho')) {
      if (button.classList.contains('tamanhoEscolhido')) {
        button.classList.remove('tamanhoEscolhido');
      } else {
        button.classList.add('tamanhoEscolhido');
      }
    }
  });
});
