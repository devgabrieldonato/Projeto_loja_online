// Definição de um dicionário com os possíveis filtros:
const filtrosAtivos = {
  categoria: 'Todos',
  cor: 'Todas',
};

// Define-se uma função que analisa a cor do produto contida no nome:
function descobrirCor(produto) {
  // Transformar todo o texto e lower case:
  const nome = produto.nome.toLowerCase();

  if (nome.includes('branc')) return 'Branco';
  if (nome.includes('azul')) return 'Azul';
  if (nome.includes('cinza')) return 'Cinza';
  if (nome.includes('pret')) return 'Preto';
  if (nome.includes('verde')) return 'Verde';
  if (nome.includes('vermelh')) return 'Vermelho';

  return 'Outra';
}

// Função que trata casos como: categoria: CalçaMoletom -> Calça Moletom
function nomeCategoria(categoria) {
  let categoria_formatada = categoria.replace(/([A-Z])/g, ' $1').trim();
  return categoria_formatada;
}

function aplicarFiltros() {
  const produtosFiltrados = produtos.filter((produto) => {
    const categoriaCorresponde =
      filtrosAtivos.categoria === 'Todos' ||
      produto.categoria === filtrosAtivos.categoria;

    const corCorresponde =
      filtrosAtivos.cor === 'Todas' || descobrirCor(produto) === filtrosAtivos.cor;

    return categoriaCorresponde && corCorresponde;
  });

  renderizarProdutos(produtosFiltrados);
}

function marcarFiltroAtivo(grupo, valor) {
  document.querySelectorAll(`[data-filter-group="${grupo}"]`).forEach((botao) => {
    botao.classList.toggle('filtro-ativo', botao.dataset.filterValue === valor);
  });
}

function criarBotaoFiltro(grupo, valor, texto) {
  const botao = document.createElement('button');
  botao.classList.add('botao_filtro');
  botao.type = 'button';
  botao.dataset.filterGroup = grupo;
  botao.dataset.filterValue = valor;
  botao.textContent = texto;

  botao.addEventListener('click', () => {
    filtrosAtivos[grupo] = valor;
    marcarFiltroAtivo(grupo, valor);
    aplicarFiltros();
  });

  return botao;
}

document.addEventListener('DOMContentLoaded', () => {
  const listaCategorias = document.querySelector('.filter-options-type');
  const listaCores = document.querySelector('.filter-options-color');

  const categorias = ['Todos', ...new Set(produtos.map((produto) => produto.categoria))];
  const cores = ['Todas', ...new Set(produtos.map((produto) => descobrirCor(produto)))];

  categorias.forEach((categoria) => {
    const item = document.createElement('li');
    item.append(criarBotaoFiltro('categoria', categoria, nomeCategoria(categoria)));
    listaCategorias.append(item);
  });

  cores.forEach((cor) => {
    const item = document.createElement('li');
    item.append(criarBotaoFiltro('cor', cor, cor));
    listaCores.append(item);
  });

  marcarFiltroAtivo('categoria', filtrosAtivos.categoria);
  marcarFiltroAtivo('cor', filtrosAtivos.cor);
});
