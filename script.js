const produtos = [
  // Camisetas
  {
    id: 1,
    categoria: "Camiseta",
    nome: "Camiseta Branca",
    imagem: "imagens/camisetas/branco.png",
    preco: 49.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: 2,
    categoria: "Camiseta",
    nome: "Camiseta Azul",
    imagem: "imagens/camisetas/azul.png",
    preco: 49.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: 3,
    categoria: "Camiseta",
    nome: "Camiseta Cinza",
    imagem: "imagens/camisetas/cinza.png",
    preco: 49.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: 4,
    categoria: "Camiseta",
    nome: "Camiseta Preta",
    imagem: "imagens/camisetas/preto.png",
    preco: 49.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: 5,
    categoria: "Camiseta",
    nome: "Camiseta Verde",
    imagem: "imagens/camisetas/verde.png",
    preco: 49.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: 6,
    categoria: "Camiseta",
    nome: "Camiseta Vermelha",
    imagem: "imagens/camisetas/vermelho.png",
    preco: 49.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },

  // Casacos de Moletom
  {
    id: 7,
    categoria: "Moletom",
    nome: "Moletom Branco",
    imagem: "imagens/blusas-moletom/branco.png",
    preco: 129.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: 8,
    categoria: "Moletom",
    nome: "Moletom Azul",
    imagem: "imagens/blusas-moletom/azul.png",
    preco: 129.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: 9,
    categoria: "Moletom",
    nome: "Moletom Cinza",
    imagem: "imagens/blusas-moletom/cinza.png",
    preco: 129.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: 10,
    categoria: "Moletom",
    nome: "Moletom Preto",
    imagem: "imagens/blusas-moletom/preto.png",
    preco: 129.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: 11,
    categoria: "Moletom",
    nome: "Moletom Verde",
    imagem: "imagens/blusas-moletom/verde.png",
    preco: 129.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: 12,
    categoria: "Moletom",
    nome: "Moletom Vermelho",
    imagem: "imagens/blusas-moletom/vermelho.png",
    preco: 129.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },

  // Bermudas
  {
    id: 13,
    categoria: "Bermuda",
    nome: "Bermuda Branca",
    imagem: "imagens/bermudas/branco.png",
    preco: 49.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: 14,
    categoria: "Bermuda",
    nome: "Bermuda Azul",
    imagem: "imagens/bermudas/azul.png",
    preco: 49.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: 15,
    categoria: "Bermuda",
    nome: "Bermuda Cinza",
    imagem: "imagens/bermudas/cinza.png",
    preco: 49.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: 16,
    categoria: "Bermuda",
    nome: "Bermuda Preta",
    imagem: "imagens/bermudas/preto.png",
    preco: 49.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: 17,
    categoria: "Bermuda",
    nome: "Bermuda Verde",
    imagem: "imagens/bermudas/verde.png",
    preco: 49.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: 18,
    categoria: "Bermuda",
    nome: "Bermuda Vermelha",
    imagem: "imagens/bermudas/vermelho.png",
    preco: 49.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },

  // Calças de Moletom
  {
    id: 19,
    categoria: "Calça Moletom",
    nome: "Calça Moletom Branca",
    imagem: "imagens/calcas-moletom/branco.png",
    preco: 99.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: 20,
    categoria: "Calça Moletom",
    nome: "Calça Moletom Azul",
    imagem: "imagens/calcas-moletom/azul.png",
    preco: 99.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: 21,
    categoria: "Calça Moletom",
    nome: "Calça Moletom Cinza",
    imagem: "imagens/calcas-moletom/cinza.png",
    preco: 99.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: 22,
    categoria: "Calça Moletom",
    nome: "Calça Moletom Preta",
    imagem: "imagens/calcas-moletom/preto.png",
    preco: 99.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: 23,
    categoria: "Calça Moletom",
    nome: "Calça Moletom Verde",
    imagem: "imagens/calcas-moletom/verde.png",
    preco: 99.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: 24,
    categoria: "Calça Moletom",
    nome: "Calça Moletom Vermelha",
    imagem: "imagens/calcas-moletom/vermelho.png",
    preco: 99.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },

  // Meias
  {
    id: 25,
    categoria: "Meia",
    nome: "Meia Branca",
    imagem: "imagens/meias/branco.png",
    preco: 14.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: 26,
    categoria: "Meia",
    nome: "Meia Azul",
    imagem: "imagens/meias/azul.png",
    preco: 14.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: 27,
    categoria: "Meia",
    nome: "Meia Cinza",
    imagem: "imagens/meias/cinza.png",
    preco: 14.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: 28,
    categoria: "Meia",
    nome: "Meia Preta",
    imagem: "imagens/meias/preto.png",
    preco: 14.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: 29,
    categoria: "Meia",
    nome: "Meia Verde",
    imagem: "imagens/meias/verde.png",
    preco: 14.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: 30,
    categoria: "Meia",
    nome: "Meia Vermelha",
    imagem: "imagens/meias/vermelho.png",
    preco: 14.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },

  // Cuecas
  {
    id: 31,
    categoria: "Cueca",
    nome: "Cueca Branca",
    imagem: "imagens/cuecas/branco.png",
    preco: 29.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: 32,
    categoria: "Cueca",
    nome: "Cueca Azul",
    imagem: "imagens/cuecas/azul.png",
    preco: 29.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: 33,
    categoria: "Cueca",
    nome: "Cueca Cinza",
    imagem: "imagens/cuecas/cinza.png",
    preco: 29.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: 34,
    categoria: "Cueca",
    nome: "Cueca Preta",
    imagem: "imagens/cuecas/preto.png",
    preco: 29.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: 35,
    categoria: "Cueca",
    nome: "Cueca Verde",
    imagem: "imagens/cuecas/verde.png",
    preco: 29.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: 36,
    categoria: "Cueca",
    nome: "Cueca Vermelha",
    imagem: "imagens/cuecas/vermelho.png",
    preco: 29.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },

  // Bonés
  {
    id: 37,
    categoria: "Boné",
    nome: "Boné Branco",
    imagem: "imagens/bones/branco.png",
    preco: 39.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: 38,
    categoria: "Boné",
    nome: "Boné Azul",
    imagem: "imagens/bones/azul.png",
    preco: 39.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: 39,
    categoria: "Boné",
    nome: "Boné Cinza",
    imagem: "imagens/bones/cinza.png",
    preco: 39.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: 40,
    categoria: "Boné",
    nome: "Boné Preto",
    imagem: "imagens/bones/preto.png",
    preco: 39.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: 41,
    categoria: "Boné",
    nome: "Boné Verde",
    imagem: "imagens/bones/verde.png",
    preco: 39.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: 42,
    categoria: "Boné",
    nome: "Boné Vermelho",
    imagem: "imagens/bones/vermelho.png",
    preco: 39.9,
    tamanhos: ["PP", "P", "M", "G", "GG"],
  },
];

const main = document.querySelector("main");
const vitrineProdutos = document.getElementById("vitrine-produtos");

function renderizarProdutos(listaProdutos) {
  vitrineProdutos
    .querySelectorAll(".categorias, .sem-produtos")
    .forEach((elemento) => {
      elemento.remove();
    });

  if (listaProdutos.length === 0) {
    const mensagem = document.createElement("p");
    mensagem.classList.add("sem-produtos");
    mensagem.textContent = "Nenhum produto encontrado com esses filtros.";
    vitrineProdutos.append(mensagem);
    return;
  }

  // salva as categorias em uma lista
  const categorias = [
    ...new Set(listaProdutos.map((produto2) => produto2.categoria)),
  ];

  let contador = 1;
  // forEach para percorrer a categoria, para ir adicionando os itens.
  categorias.forEach((categoria) => {
    // incremento para salvar o id depois.
    let incremento = `produtos${contador}`;
    // cria uma section no html
    const sectionCategoria = document.createElement("section");
    // cria uma classe 'categorias'
    sectionCategoria.classList.add("categorias");
    //  da um id pra ela que seria o contador, cada vez que o forEach percorre uma vez, aumenta 1 ( nunca vai ser o mesmo)
    sectionCategoria.id = contador;
    // faz o append ao HTML (adiciona)
    vitrineProdutos.append(sectionCategoria);
    // no id que demos antes na section, ele adiciona a Categoria
    document.getElementById(contador).innerHTML += `<h2>${categoria}</h2>`;
    // depois de adicionar a section cria uma div
    const divProdutos = document.createElement("div");
    // demos uma classe de produtos
    divProdutos.classList.add("produtos");
    // dou o id do incremento (ex : produtos1, produtos2), div onde vai os articles dos itens, onde vamos adicionar os itens
    divProdutos.id = incremento;
    // fizemos append para o HTML
    document.getElementById(contador).append(divProdutos);

    // forEach do produtos, para percorrer cada item
    listaProdutos.forEach((produto) => {
      // quando a categoria do item for igual a categoria
      if (produto.categoria === categoria) {
        let botoesTamanho = ""; // variável para armazenar os botões de tamanho

        // ForEach para criar a quantidade certa de botão, dependeno de quanto tamanho tem cada produto.
        produto.tamanhos.forEach((tamanho) => {
          botoesTamanho += `<button id='${produto.id}_${tamanho}' class='buttonTamanho'>${tamanho}</button>`;
          let id = `${produto.id}_${tamanho}`;
        });
        // adicionado o dado-nome e dado-preco para caso queira pegar no carrinho, e adicionado o alt na imagem para acessibilidade.

        // adicionando itens ao nosso id incremento que demos antes( a div), toda a vez que o for percorrer, ele irá adicionar ao html os itens abaixo.
        document.querySelector(`#${incremento}`).innerHTML +=
          `<article dado-nome=${produto.id} dado-preco=${produto.preco}>
                    <img class="imagem-produto" src="${produto.imagem}" alt="${produto.nome}">
                    <h3>${produto.nome}</h3>
                    <p>R$ ${String(produto.preco.toFixed(2)).replace(".", ",")}</p>
                    <p>Selecione o tamanho</p>
                    <div id='conjuntoBotoes_${produto.id}'>
                        ${botoesTamanho}
                    </div>
                    <button id='adicionarCarrinho${produto.id}' class='addCarrinho'>Adicionar ao carrinho</button>
            </article>`;
      }
    });

    contador = contador + 1;
  });
}

// Evento para acontecer quando á pagina for carregada
document.addEventListener("DOMContentLoaded", () => {
  renderizarProdutos(produtos);

  // event para o usuário escolher um tamanho.
  main.addEventListener("click", (e) => {
    const idButton = e.target.id;
    const button = document.getElementById(idButton);
    // caso haja mais de um tamanho escolhido ele procura todos
    const botoesEscolhidos = document.querySelectorAll(".tamanhoEscolhido");
    // se tiver ele vai percorrer esse forEach e remover a classe tamanhoEscolhido, para o usuário escolher apenas 1
    botoesEscolhidos.forEach((botao) => {
      botao.classList.remove("tamanhoEscolhido");
    });
    // verificando se o usuário clicou mesmo na classe 'buttonTamanho', onde está localizada em todos os botões de tamanho.
    if (e.target.closest(".buttonTamanho")) {
      if (button.classList.contains("tamanhoEscolhido")) {
        button.classList.remove("tamanhoEscolhido");
      } else {
        button.classList.add("tamanhoEscolhido");
      }
    }
  });
});
