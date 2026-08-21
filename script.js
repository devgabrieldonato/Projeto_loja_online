const produtos = [
         {      
            categoria : 'Camiseta',
            nome: 'Camiseta Branca',
            imagem: 'imagens/camisetas/branco.png',
            preco: 49.90,
            tamanhos: ['PP', 'P', 'M', 'G', 'GG']
        },
        {
            categoria : 'Camiseta',
            nome: 'Camiseta Azul',
            imagem: 'imagens/camisetas/azul.png',
            preco: 49.90,
            tamanhos: ['PP', 'P', 'M', 'G', 'GG']
        },
        {
            categoria : 'Moletom',
            nome: 'Moletom Branco',
            imagem: 'imagens/blusas-moletom/branco.png',
            preco: 49.90,
            tamanhos: ['PP', 'P', 'M', 'G', 'GG']
        },
        {
            categoria : 'Moletom',
            nome: 'Moletom Azul',
            imagem: 'imagens/blusas-moletom/azul.png',
            preco: 49.90,            tamanhos: ['PP', 'P', 'M', 'G', 'GG']
        }
]
const categoria_list = [];
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

                   /*  document.querySelector('main').innerHTML += `
                    </div>
                    <button>Adicionar ao carrinho</button>
                </article>` */
                    
            } 
            
        });
    })
  
})