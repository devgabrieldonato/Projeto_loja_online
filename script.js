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
            preco: 49.90,
            tamanhos: ['PP', 'P', 'M', 'G', 'GG']
        }
]
const categoria_list = [];
main = document.querySelector('main');

document.addEventListener("DOMContentLoaded",()=>{

    let tamanho = produtos.length;
    
    const categorias = [...new Set(produtos.map((produto) => produto.categoria))];
    
    categorias.forEach(categoria =>{
        main.innerHTML += `<h2>${categoria}</h2>`
        produtos.forEach(produto2 => {
            if (produto2.categoria == categoria) {
                document.querySelector('main').innerHTML += `<article>
                    <img class="imagem-produto" src="${produto2.imagem}" alt="Camiseta branca">
                    <h3>${produto2.nome}</h3>
                    <p>R$ ${(String((produto2.preco).toFixed(2))).replace('.',',')}</p>
                    <p>Selecione o tamanho</p>
                    <div>
                        
                    </div>
                    <button>Adicionar ao carrinho</button>
                </article>
                <article>`
            }
            
        });
    })

   
    
})
