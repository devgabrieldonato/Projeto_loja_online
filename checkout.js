// Chaves usadas para identificar os dados salvos pelo projeto no navegador.
const CHAVE_CARRINHO = 'basicShopCarrinho';
const CHAVE_PEDIDO = 'basicShopUltimoPedido';
const CHAVE_AVALIACOES = 'basicShopAvaliacoes';

// Configurações da loja e do serviço responsável pelo envio do e-mail.
const UF_ORIGEM_LOJA = 'RS';
const EMAILJS_CONFIG = {
  serviceId: 'service_5s7e0ul',
  templateId: 'template_4dca80h',
  publicKey: 'XlTIDKsFxfk5-3n8a',
};

// Regras fixas do cupom e do tamanho máximo permitido para o comentário.
const CUPOM_VALIDO = 'kurtcobain10';
const PERCENTUAL_DESCONTO = 0.1;
const LIMITE_COMENTARIO = 500;

//DDs brasileiros aceitos para a validação do celular informado no checkout
const DDDS_VALIDOS = new Set([
  '11', '12', '13', '14', '15', '16', '17', '18', '19',
  '21', '22', '24', '27', '28',
  '31', '32', '33', '34', '35', '37', '38',
  '41', '42', '43', '44', '45', '46', '47', '48', '49',
  '51', '53', '54', '55', 
  '61', '62', '63', '64', '65', '66', '67', '68', '69',
  '71', '73', '74', '75', '77', '79', 
  '81', '82', '83', '84', '85', '86', '87', '88', '89',
  '91', '92', '93', '94', '95', '96', '97', '98', '99' 
]);

// Relaciona cada UF com sua região para selecionar a regra de frete correspondente.
const REGIOES_POR_UF = {
  AC: 'Norte', AL: 'Nordeste', AP: 'Norte', AM: 'Norte', BA: 'Nordeste',
  CE: 'Nordeste', DF: 'Centro-Oeste', ES: 'Sudeste', GO: 'Centro-Oeste',
  MA: 'Nordeste', MT: 'Centro-Oeste', MS: 'Centro-Oeste', MG: 'Sudeste',
  PA: 'Norte', PB: 'Nordeste', PR: 'Sul', PE: 'Nordeste', PI: 'Nordeste',
  RJ: 'Sudeste', RN: 'Nordeste', RS: 'Sul', RO: 'Norte', RR: 'Norte',
  SC: 'Sul', SP: 'Sudeste', SE: 'Nordeste', TO: 'Norte',
};

// Tabela acadêmica de valor e prazo utilizada no cálculo do frete.
const FRETES_POR_REGIAO = {
  Sudeste: { valor: 15.9, prazo: '4 a 7 dias úteis' },
  Sul: { valor: 19.9, prazo: '5 a 8 dias úteis' },
  'Centro-Oeste': { valor: 19.9, prazo: '5 a 8 dias úteis' },
  Nordeste: { valor: 24.9, prazo: '7 a 10 dias úteis' },
  Norte: { valor: 29.9, prazo: '8 a 12 dias úteis' },
};

// Intl.NumberFormat transforma números em valores monetários no padrão brasileiro.
const formatadorMoeda = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

// Centraliza as referências aos elementos do HTML para reutilizá-las nas funções.
// getElementById localiza um elemento pelo atributo id e devolve sua referência.
const elementos = {
  vazio: document.getElementById('checkout-vazio'),
  conteudo: document.getElementById('checkout-conteudo'),
  confirmacao: document.getElementById('checkout-confirmacao'),
  formulario: document.getElementById('form-checkout'),
  statusCarrinho: document.getElementById('status-carrinho'),
  listaItens: document.getElementById('lista-itens'),
  nome: document.getElementById('nome'),
  email: document.getElementById('email'),
  telefone: document.getElementById('telefone'),
  cep: document.getElementById('cep'),
  consultarCep: document.getElementById('consultar-cep'),
  statusCep: document.getElementById('status-cep'),
  logradouro: document.getElementById('logradouro'),
  numero: document.getElementById('numero'),
  complemento: document.getElementById('complemento'),
  bairro: document.getElementById('bairro'),
  cidade: document.getElementById('cidade'),
  uf: document.getElementById('uf'),
  statusFrete: document.getElementById('status-frete'),
  valorFreteCard: document.getElementById('valor-frete-card'),
  codigoCupom: document.getElementById('codigo-cupom'),
  aplicarCupom: document.getElementById('aplicar-cupom'),
  mensagemCupom: document.getElementById('mensagem-cupom'),
  linhaCupom: document.getElementById('linha-cupom'),
  linhaDesconto: document.getElementById('linha-desconto'),
  resumoSubtotal: document.getElementById('resumo-subtotal'),
  resumoDesconto: document.getElementById('resumo-desconto'),
  resumoFrete: document.getElementById('resumo-frete'),
  resumoTotal: document.getElementById('resumo-total'),
  finalizar: document.getElementById('finalizar-pedido'),
  statusFinalizacao: document.getElementById('status-finalizacao'),
  statusEmail: document.getElementById('status-email'),
  formAvaliacao: document.getElementById('form-avaliacao'),
  comentario: document.getElementById('comentario'),
  contadorComentario: document.getElementById('contador-comentario'),
  enviarAvaliacao: document.getElementById('enviar-avaliacao'),
  statusAvaliacao: document.getElementById('status-avaliacao'),
};

// Variáveis que representam o estado atual da página durante a navegação.
let ultimoCepConsultado = '';
let consultaCepEmAndamento = false;
let preenchimentoEnderecoManual = false;
let freteAtual = null;
let cupomAplicado = false;
let finalizando = false;
let pedidoAtual = null;

/**
 * Converte o valor em texto e remove tudo que não for número.
 * O método replace usa uma expressão regular para limpar CEP e telefone.
 */
function somenteDigitos(valor) {
  return String(valor || '').replace(/\D/g, '');
}

/**
 * Garante que o valor seja uma string e remove espaços do começo e do fim.
 * O operador ?? evita erros quando o valor recebido é null ou undefined.
 */
function textoSeguro(valor) {
  return String(valor ?? '').trim();
}

/**
 * Confere se um objeto possui todos os dados necessários para ser usado como produto.
 * Boolean converte o resultado de todas as verificações em true ou false.
 */
function itemCarrinhoValido(item) {
  return Boolean(
    item &&
    (typeof item.id === 'number' || typeof item.id === 'string') &&
    textoSeguro(item.nome) &&
    textoSeguro(item.imagem) &&
    Number.isFinite(Number(item.preco)) &&
    Number(item.preco) >= 0 &&
    textoSeguro(item.tamanho) &&
    Number.isInteger(Number(item.quantidade)) &&
    Number(item.quantidade) > 0
  );
}

/**
 * Cria uma cópia padronizada do produto, corrigindo textos e tipos numéricos.
 */
function normalizarItem(item) {
  return {
    id: item.id,
    nome: textoSeguro(item.nome),
    imagem: textoSeguro(item.imagem),
    preco: Number(item.preco),
    tamanho: textoSeguro(item.tamanho),
    quantidade: Number(item.quantidade),
  };
}

/**
 * Recupera e converte um JSON do sessionStorage ou localStorage.
 * JSON.parse reconstrói o objeto; se o conteúdo estiver inválido, o catch remove
 * o dado corrompido e devolve o valor padrão recebido pela função.
 */
function recuperarJsonArmazenado(armazenamento, chave, valorPadrao) {
  const valorSalvo = armazenamento.getItem(chave);
  if (!valorSalvo) return valorPadrao;

  try {
    return JSON.parse(valorSalvo);
  } catch {
    armazenamento.removeItem(chave);
    return valorPadrao;
  }
}

/**
 * Busca o carrinho da sessão, mantém apenas produtos válidos com filter e
 * padroniza cada produto com map antes de utilizá-lo no checkout.
 */
function recuperarCarrinho() {
  const dados = recuperarJsonArmazenado(sessionStorage, CHAVE_CARRINHO, []);
  if (!Array.isArray(dados)) return [];
  return dados.filter(itemCarrinhoValido).map(normalizarItem);
}

/**
 * Valida os dados mínimos do comprovante antes de restaurá-lo na página.
 */
function pedidoSalvoValido(pedido) {
  return Boolean(
    pedido &&
    textoSeguro(pedido.id) &&
    pedido.cliente &&
    textoSeguro(pedido.cliente.nome) &&
    textoSeguro(pedido.cliente.email) &&
    pedido.entrega &&
    textoSeguro(pedido.entrega.prazo) &&
    Number.isInteger(Number(pedido.quantidadeTotal)) &&
    Number(pedido.quantidadeTotal) > 0 &&
    Number.isFinite(Number(pedido.subtotal)) &&
    Number.isFinite(Number(pedido.frete)) &&
    Number.isFinite(Number(pedido.total))
  );
}

// Dados calculados do carrinho; são atualizados sempre que a quantidade muda.
let itensNoCarrinho = recuperarCarrinho();
let quantidadeTotal = 0;
let subtotal = 0;

/**
 * Recalcula a quantidade e o subtotal. O método reduce percorre todos os itens
 * e acumula um único resultado para cada cálculo.
 */
function recalcularCarrinho() {
  quantidadeTotal = itensNoCarrinho.reduce(
    (total, item) => total + item.quantidade,
    0,
  );
  subtotal = itensNoCarrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0,
  );
}

recalcularCarrinho();

/**
 * Reúne subtotal, desconto, frete e total conforme o estado atual do checkout.
 */
function valoresAtuais() {
  const desconto = cupomAplicado
    ? Math.min(subtotal, subtotal * PERCENTUAL_DESCONTO)
    : 0;
  const frete = freteAtual ? freteAtual.valor : 0;
  return {
    subtotal,
    desconto,
    frete,
    total: Math.max(0, subtotal - desconto) + frete,
  };
}

/**
 * Cria elementos HTML de modo seguro. createElement monta a tag, className
 * atribui a classe e textContent adiciona texto sem interpretar código HTML.
 */
function criarElemento(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto !== undefined) elemento.textContent = texto;
  return elemento;
}

/**
 * Reconstrói visualmente a lista de produtos e seus controles de quantidade.
 * replaceChildren limpa a lista, forEach percorre os itens e append insere os
 * novos elementos. dataset guarda a ação e o índice usados no clique.
 */
function renderizarItens() {
  elementos.listaItens.replaceChildren();

  itensNoCarrinho.forEach((item, indice) => {
    const artigo = criarElemento('article', 'checkout-item');
    const imagem = criarElemento('img', 'checkout-item-imagem');
    imagem.src = item.imagem;
    imagem.alt = item.nome;

    const informacoes = criarElemento('div', 'checkout-item-informacoes');
    const controles = criarElemento('div', 'checkout-item-controles');
    const diminuir = criarElemento('button', 'checkout-quantidade-botao', '−');
    diminuir.type = 'button';
    diminuir.dataset.acao = 'diminuir';
    diminuir.dataset.indice = String(indice);
    diminuir.setAttribute('aria-label', `Diminuir quantidade de ${item.nome}`);

    const quantidade = criarElemento('span', 'checkout-item-quantidade', String(item.quantidade));
    quantidade.setAttribute('aria-label', `Quantidade: ${item.quantidade}`);

    const aumentar = criarElemento('button', 'checkout-quantidade-botao', '+');
    aumentar.type = 'button';
    aumentar.dataset.acao = 'aumentar';
    aumentar.dataset.indice = String(indice);
    aumentar.setAttribute('aria-label', `Aumentar quantidade de ${item.nome}`);

    [diminuir, aumentar].forEach((botao) => {
      botao.addEventListener('click', alterarQuantidadeItem);
    });
    controles.append(diminuir, quantidade, aumentar);

    informacoes.append(
      criarElemento('h3', '', item.nome),
      criarElemento('p', '', `Tamanho: ${item.tamanho}`),
      criarElemento('small', '', `${formatadorMoeda.format(item.preco)} cada`),
      controles,
    );

    const totalItem = criarElemento(
      'strong',
      'checkout-item-total',
      formatadorMoeda.format(item.preco * item.quantidade),
    );
    artigo.append(imagem, informacoes, totalItem);
    elementos.listaItens.append(artigo);
  });

  elementos.statusCarrinho.textContent =
    `${quantidadeTotal} ${quantidadeTotal === 1 ? 'item' : 'itens'} no pedido`;
}

/**
 * Salva o carrinho atualizado na sessão ou remove a chave se ele estiver vazio.
 * JSON.stringify converte o array em texto antes do armazenamento.
 */
function salvarCarrinhoAtualizado() {
  if (itensNoCarrinho.length > 0) {
    sessionStorage.setItem(CHAVE_CARRINHO, JSON.stringify(itensNoCarrinho));
  } else {
    sessionStorage.removeItem(CHAVE_CARRINHO);
  }
}

/**
 * Sincroniza cálculos, sessionStorage e interface depois de qualquer alteração.
 */
function atualizarCarrinhoNaTela() {
  recalcularCarrinho();
  salvarCarrinhoAtualizado();

  if (itensNoCarrinho.length === 0) {
    elementos.conteudo.hidden = true;
    elementos.vazio.hidden = false;
    return;
  }

  renderizarItens();
  atualizarResumo();
}

/**
 * Trata os cliques em + e −. closest encontra o botão acionado, dataset informa
 * qual operação executar e splice remove o produto quando sua quantidade zera.
 */
function alterarQuantidadeItem(evento) {
  const botao = evento.target.closest('button[data-acao][data-indice]');
  if (!botao) return;

  const indice = Number(botao.dataset.indice);
  const item = itensNoCarrinho[indice];
  if (!item) return;

  if (botao.dataset.acao === 'aumentar') {
    item.quantidade += 1;
  } else if (botao.dataset.acao === 'diminuir') {
    item.quantidade -= 1;
    if (item.quantidade <= 0) itensNoCarrinho.splice(indice, 1);
  }
  atualizarCarrinhoNaTela();
}

/**
 * Atualiza os valores apresentados no resumo e mostra ou esconde as linhas
 * referentes ao cupom e ao desconto.
 */
function atualizarResumo() {
  const valores = valoresAtuais();
  elementos.resumoSubtotal.textContent = formatadorMoeda.format(valores.subtotal);
  elementos.resumoTotal.textContent = formatadorMoeda.format(valores.total);
  elementos.resumoFrete.textContent = freteAtual
    ? formatadorMoeda.format(valores.frete)
    : 'A calcular';

  elementos.linhaCupom.hidden = !cupomAplicado;
  elementos.linhaDesconto.hidden = !cupomAplicado;
  elementos.resumoDesconto.textContent = `- ${formatadorMoeda.format(valores.desconto)}`;
}

/**
 * Exibe ou remove o erro de um campo e atualiza seus atributos de acessibilidade.
 * classList.toggle adiciona a classe visual somente quando existe uma mensagem.
 */
function definirErro(campo, mensagem) {
  const elementoErro = document.getElementById(`erro-${campo.id}`);
  campo.setAttribute('aria-invalid', mensagem ? 'true' : 'false');
  campo.classList.toggle('checkout-input-erro', Boolean(mensagem));
  if (elementoErro) elementoErro.textContent = mensagem;
  return !mensagem;
}

/** Remove a mensagem e o destaque de erro do campo informado. */
function limparErro(campo) {
  definirErro(campo, '');
}

/** Testa o formato básico do e-mail por meio de uma expressão regular. */
function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Retorna a mensagem de erro correspondente ao celular informado. */
function obterErroCelular(telefone) {
  const digitos = somenteDigitos(telefone);

  // Campo vazio é válido porque o celular é opcional.
  if (!digitos) {
    return '';
  }

  // DDD + celular precisam totalizar 11 dígitos.
  if (digitos.length !== 11) {
    return 'Informe um número de celular válido.';
  }

  const ddd = digitos.slice(0, 2);
  const celular = digitos.slice(2);

  // Mensagem específica para um DDD inexistente.
  if (!DDDS_VALIDOS.has(ddd)) {
    return 'Informe um celular com DDD válido.';
  }

  // Verifica se o celular possui nove dígitos e começa com 9.
  if (!/^9\d{8}$/.test(celular)) {
    return 'Informe um número de celular válido.';
  }

  // Rejeita sequências artificiais.
  if (/^9(\d)\1{7}$/.test(celular)) {
    return 'Informe um número de celular válido.';
  }

  // String vazia significa que não existe erro.
  return '';
}

/**
 * Valida todos os campos obrigatórios, a consulta do CEP e o cálculo do frete.
 * forEach aplica as validações e focus leva o usuário ao primeiro erro encontrado.
 */
function validarFormulario() {
  const erroCelular = obterErroCelular(elementos.telefone.value);

  const validacoes = [
    [elementos.nome, textoSeguro(elementos.nome.value).length >= 3, 'Informe seu nome completo.'],
    [elementos.email, validarEmail(textoSeguro(elementos.email.value)), 'Informe um e-mail válido.'],
    [
      elementos.telefone,
      !erroCelular,
      erroCelular,
    ],
    [elementos.cep, somenteDigitos(elementos.cep.value).length === 8, 'Informe um CEP com oito dígitos.'],
    [elementos.logradouro, Boolean(textoSeguro(elementos.logradouro.value)), 'Informe o logradouro.'],
    [elementos.numero, Boolean(textoSeguro(elementos.numero.value)), 'Informe o número.'],
    [elementos.bairro, Boolean(textoSeguro(elementos.bairro.value)), 'Informe o bairro.'],
    [elementos.cidade, Boolean(textoSeguro(elementos.cidade.value)), 'Informe a cidade.'],
    [elementos.uf, Boolean(REGIOES_POR_UF[textoSeguro(elementos.uf.value).toUpperCase()]), 'Informe uma UF válida.'],
  ];

  let primeiroInvalido = null;
  validacoes.forEach(([campo, valido, mensagem]) => {
    definirErro(campo, valido ? '' : mensagem);
    if (!valido && !primeiroInvalido) primeiroInvalido = campo;
  });

  if (somenteDigitos(elementos.cep.value) !== ultimoCepConsultado) {
    definirErro(elementos.cep, 'Consulte o CEP antes de finalizar.');
    primeiroInvalido ||= elementos.cep;
  }

  if (!freteAtual) {
    elementos.statusFinalizacao.textContent = UF_ORIGEM_LOJA === 'PREENCHER_UF'
      ? 'Configure a UF de origem da loja para calcular o frete.'
      : 'Consulte o CEP para calcular o frete antes de finalizar.';
    primeiroInvalido ||= elementos.cep;
  } else {
    elementos.statusFinalizacao.textContent = '';
  }

  primeiroInvalido?.focus();
  return !primeiroInvalido && Boolean(freteAtual);
}

/** Formata progressivamente o telefone no padrão brasileiro durante a digitação. */
function mascararTelefone(valor) {
  const numeros = somenteDigitos(valor).slice(0, 11);
  if (numeros.length <= 2) return numeros.replace(/^(\d{0,2})/, '($1');
  if (numeros.length <= 6) return numeros.replace(/^(\d{2})(\d+)/, '($1) $2');
  if (numeros.length <= 10) return numeros.replace(/^(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
  return numeros.replace(/^(\d{2})(\d{5})(\d+)/, '($1) $2-$3');
}

/** Limita o CEP a oito números e acrescenta o hífen após o quinto dígito. */
function mascararCep(valor) {
  const numeros = somenteDigitos(valor).slice(0, 8);
  return numeros.length > 5
    ? `${numeros.slice(0, 5)}-${numeros.slice(5)}`
    : numeros;
}

/** Limpa um frete antigo quando CEP ou UF é alterado e atualiza o resumo. */
function invalidarFrete() {
  freteAtual = null;
  elementos.statusFrete.textContent = 'Consulte o CEP para calcular o frete.';
  elementos.valorFreteCard.textContent = '—';
  atualizarResumo();
}

/**
 * Calcula valor e prazo com base na UF de origem e na região do destino.
 * Entregas dentro do RS recebem a regra especial para o mesmo estado.
 */
function calcularFrete(ufDestino) {
  const origem = textoSeguro(UF_ORIGEM_LOJA).toUpperCase();
  const destino = textoSeguro(ufDestino).toUpperCase();

  if (!REGIOES_POR_UF[origem]) {
    freteAtual = null;
    elementos.statusFrete.textContent = 'A UF de origem da loja ainda precisa ser configurada.';
    elementos.valorFreteCard.textContent = 'Pendente';
    atualizarResumo();
    return;
  }

  if (!REGIOES_POR_UF[destino]) {
    invalidarFrete();
    return;
  }

  const regra = origem === destino
    ? { valor: 12.9, prazo: '3 a 5 dias úteis' }
    : FRETES_POR_REGIAO[REGIOES_POR_UF[destino]];

  freteAtual = {
    regiao: REGIOES_POR_UF[destino],
    valor: regra.valor,
    prazo: regra.prazo,
  };
  elementos.statusFrete.textContent = `Entrega estimada em ${regra.prazo}.`;
  elementos.valorFreteCard.textContent = formatadorMoeda.format(regra.valor);
  atualizarResumo();
}

/**
 * Consulta o ViaCEP de forma assíncrona. fetch envia a requisição, await aguarda
 * a resposta e response.json converte o retorno. try/catch/finally trata sucesso,
 * falha e a restauração obrigatória do botão ao terminar a consulta.
 */
async function consultarCep() {
  if (consultaCepEmAndamento) return;
  const cep = somenteDigitos(elementos.cep.value);

  if (cep.length !== 8) {
    definirErro(elementos.cep, 'Informe um CEP com oito dígitos.');
    elementos.cep.focus();
    return;
  }

  if (cep === ultimoCepConsultado && freteAtual) {
    elementos.statusCep.textContent = 'Endereço já consultado.';
    return;
  }

  consultaCepEmAndamento = true;
  elementos.consultarCep.disabled = true;
  elementos.consultarCep.textContent = 'Consultando...';
  elementos.statusCep.textContent = 'Consultando CEP...';
  limparErro(elementos.cep);
  preenchimentoEnderecoManual = false;
  invalidarFrete();

  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!resposta.ok) throw new Error('Falha HTTP');
    const endereco = await resposta.json();

    if (endereco.erro) {
      ultimoCepConsultado = '';
      definirErro(elementos.cep, 'CEP não encontrado. Verifique o número informado.');
      elementos.statusCep.textContent = '';
      elementos.cep.focus();
      return;
    }

    elementos.logradouro.value = endereco.logradouro || '';
    elementos.bairro.value = endereco.bairro || '';
    elementos.cidade.value = endereco.localidade || '';
    elementos.uf.value = endereco.uf || '';
    [elementos.logradouro, elementos.bairro, elementos.cidade, elementos.uf].forEach(limparErro);

    ultimoCepConsultado = cep;
    preenchimentoEnderecoManual = false;
    elementos.statusCep.textContent = 'Endereço encontrado.';
    calcularFrete(endereco.uf);
    elementos.numero.focus();
  } catch {
    ultimoCepConsultado = cep;
    preenchimentoEnderecoManual = true;
    limparErro(elementos.cep);
    elementos.statusCep.textContent =
      'ViaCEP indisponível. Preencha o endereço e a UF manualmente para calcular o frete.';
    elementos.logradouro.focus();
  } finally {
    consultaCepEmAndamento = false;
    elementos.consultarCep.disabled = false;
    elementos.consultarCep.textContent = 'Consultar CEP';
  }
}

/** Atualiza a mensagem e o estado visual do campo de cupom. */
function informarCupom(mensagem, tipo = '') {
  elementos.mensagemCupom.textContent = mensagem;
  elementos.mensagemCupom.className = 'checkout-mensagem-cupom';
  if (tipo) elementos.mensagemCupom.classList.add(`checkout-cupom-${tipo}`);
  elementos.codigoCupom.setAttribute('aria-invalid', tipo === 'erro' ? 'true' : 'false');
}

/**
 * Aplica ou remove o cupom. toLowerCase torna a comparação independente de
 * maiúsculas e minúsculas e classList altera a aparência do bloco.
 */
function alternarCupom() {
  if (cupomAplicado) {
    cupomAplicado = false;
    elementos.codigoCupom.disabled = false;
    elementos.codigoCupom.value = '';
    elementos.aplicarCupom.textContent = 'Aplicar cupom';
    elementos.codigoCupom.closest('.checkout-cupom').classList.remove('checkout-cupom-aplicado');
    informarCupom('Cupom removido.');
    atualizarResumo();
    elementos.codigoCupom.focus();
    return;
  }

  const codigo = textoSeguro(elementos.codigoCupom.value).toLowerCase();
  if (!codigo) {
    informarCupom('Informe um cupom antes de aplicar.', 'erro');
    elementos.codigoCupom.focus();
    return;
  }
  if (codigo !== CUPOM_VALIDO) {
    informarCupom('Cupom inválido. Verifique o código informado.', 'erro');
    elementos.codigoCupom.focus();
    return;
  }

  cupomAplicado = true;
  elementos.codigoCupom.value = CUPOM_VALIDO;
  elementos.codigoCupom.disabled = true;
  elementos.aplicarCupom.textContent = 'Remover cupom';
  elementos.codigoCupom.closest('.checkout-cupom').classList.add('checkout-cupom-aplicado');
  informarCupom('Cupom aplicado! Você recebeu 10% de desconto.', 'aplicado');
  atualizarResumo();
}

/**
 * Gera um identificador com data e sufixo aleatório. crypto.getRandomValues
 * fornece um número aleatório mais confiável que Math.random.
 */
function gerarNumeroPedido() {
  const agora = new Date();
  const data = agora.toISOString().slice(0, 10).replaceAll('-', '');
  const sufixo = crypto.getRandomValues(new Uint32Array(1))[0]
    .toString(36)
    .slice(0, 5)
    .toUpperCase()
    .padStart(5, '0');
  return `BS-${data}-${sufixo}`;
}

/**
 * Reúne cliente, endereço, entrega, cupom, produtos e valores em um único objeto.
 * map e o operador spread criam cópias dos itens para preservar o comprovante.
 */
function montarPedido() {
  const valores = valoresAtuais();
  return {
    id: gerarNumeroPedido(),
    criadoEm: new Date().toISOString(),
    cliente: {
      nome: textoSeguro(elementos.nome.value),
      email: textoSeguro(elementos.email.value).toLowerCase(),
      telefone: somenteDigitos(elementos.telefone.value),
    },
    endereco: {
      cep: somenteDigitos(elementos.cep.value),
      logradouro: textoSeguro(elementos.logradouro.value),
      numero: textoSeguro(elementos.numero.value),
      complemento: textoSeguro(elementos.complemento.value),
      bairro: textoSeguro(elementos.bairro.value),
      cidade: textoSeguro(elementos.cidade.value),
      uf: textoSeguro(elementos.uf.value).toUpperCase(),
    },
    entrega: { ...freteAtual },
    cupom: cupomAplicado
      ? { codigo: CUPOM_VALIDO, percentual: 10, valor: valores.desconto }
      : null,
    itens: itensNoCarrinho.map((item) => ({ ...item })),
    quantidadeTotal,
    subtotal: valores.subtotal,
    desconto: valores.desconto,
    frete: valores.frete,
    total: valores.total,
  };
}

/**
 * Preenche o comprovante visual, controla as linhas opcionais do cupom e troca
 * o formulário pela tela de sucesso.
 */
function preencherConfirmacao(pedido) {
  document.getElementById('confirmacao-introducao').textContent =
    'Confira os dados abaixo. Você pode voltar para a loja quando desejar.';
  document.getElementById('confirmacao-id').textContent = pedido.id;
  document.getElementById('confirmacao-cliente').textContent = pedido.cliente.nome;
  document.getElementById('confirmacao-email').textContent = pedido.cliente.email;
  document.getElementById('confirmacao-itens').textContent =
    `${pedido.quantidadeTotal} ${pedido.quantidadeTotal === 1 ? 'item' : 'itens'}`;
  document.getElementById('confirmacao-subtotal').textContent = formatadorMoeda.format(pedido.subtotal);
  document.getElementById('confirmacao-frete').textContent = formatadorMoeda.format(pedido.frete);
  document.getElementById('confirmacao-total').textContent = formatadorMoeda.format(pedido.total);
  document.getElementById('confirmacao-prazo').textContent = pedido.entrega.prazo;

  const linhaCupom = document.getElementById('confirmacao-linha-cupom');
  const linhaDesconto = document.getElementById('confirmacao-linha-desconto');
  linhaCupom.hidden = !pedido.cupom;
  linhaDesconto.hidden = !pedido.cupom;
  if (pedido.cupom) {
    document.getElementById('confirmacao-cupom').textContent =
      `${pedido.cupom.codigo} — ${pedido.cupom.percentual}%`;
    document.getElementById('confirmacao-desconto').textContent =
      `- ${formatadorMoeda.format(pedido.desconto)}`;
  }

  elementos.conteudo.hidden = true;
  elementos.vazio.hidden = true;
  elementos.confirmacao.hidden = false;
  elementos.confirmacao.focus();
  prepararAvaliacao(pedido.id);
}

/** Confirma que as três configurações obrigatórias do EmailJS foram preenchidas. */
function emailJsConfigurado() {
  return Object.values(EMAILJS_CONFIG).every(
    (valor) => textoSeguro(valor) && !valor.startsWith('PREENCHER_'),
  );
}

/**
 * Transforma os itens em texto para o e-mail; map cria cada linha e join une
 * todas elas usando uma quebra de linha.
 */
function resumoItensEmail(pedido) {
  return pedido.itens
    .map((item) =>
      `${item.quantidade}x ${item.nome} (${item.tamanho}) — ` +
      formatadorMoeda.format(item.preco * item.quantidade),
    )
    .join('\n');
}

/**
 * Inicializa o EmailJS e envia os dados do pedido ao template configurado.
 * A Promise devolvida por emailjs.send é aguardada para informar sucesso ou erro.
 */
async function enviarConfirmacaoEmail(pedido) {
  if (!emailJsConfigurado()) {
    elementos.statusEmail.textContent =
      'Pedido realizado. O e-mail aguarda a configuração do Service ID, Template ID e Public Key do EmailJS.';
    return;
  }
  if (!window.emailjs) {
    elementos.statusEmail.textContent =
      'Pedido realizado com sucesso, mas o serviço de e-mail não pôde ser carregado.';
    return;
  }

  elementos.statusEmail.textContent = 'Enviando e-mail de confirmação...';
  const endereco = pedido.endereco;
  const parametros = {
    name: pedido.cliente.nome,
    email: pedido.cliente.email,
    to_email: pedido.cliente.email,
    nome_cliente: pedido.cliente.nome,
    email_cliente: pedido.cliente.email,
    telefone_cliente: pedido.cliente.telefone || 'Não informado',
    numero_pedido: pedido.id,
    order_id: pedido.id,
    resumo_pedido: resumoItensEmail(pedido),
    message: resumoItensEmail(pedido),
    endereco_entrega:
      `${endereco.logradouro}, ${endereco.numero}` +
      `${endereco.complemento ? `, ${endereco.complemento}` : ''} — ` +
      `${endereco.bairro}, ${endereco.cidade}/${endereco.uf} — CEP ${endereco.cep}`,
    codigo_cupom: pedido.cupom?.codigo || 'Nenhum',
    percentual_desconto: pedido.cupom ? '10%' : '0%',
    valor_subtotal: formatadorMoeda.format(pedido.subtotal),
    valor_desconto: formatadorMoeda.format(pedido.desconto),
    valor_frete: formatadorMoeda.format(pedido.frete),
    valor_total: formatadorMoeda.format(pedido.total),
    prazo_entrega: pedido.entrega.prazo,
  };

  try {
    window.emailjs.init({
      publicKey: EMAILJS_CONFIG.publicKey,
      blockHeadless: true,
      limitRate: { id: pedido.id, throttle: 10000 },
    });
    await window.emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      parametros,
    );
    elementos.statusEmail.textContent =
      `E-mail enviado com sucesso para ${pedido.cliente.email}.`;
  } catch (erro) {
    const detalhe = textoSeguro(erro?.text);
    elementos.statusEmail.textContent = detalhe
      ? `Pedido realizado, mas o EmailJS recusou o envio: ${detalhe}`
      : 'Pedido realizado com sucesso, mas não foi possível enviar o e-mail de confirmação.';
  }
}

/**
 * Interrompe o envio tradicional do formulário, valida os campos, salva o
 * comprovante, limpa o carrinho, mostra a confirmação e solicita o e-mail.
 */
async function finalizarPedido(evento) {
  evento.preventDefault();
  if (finalizando || !validarFormulario()) return;

  finalizando = true;
  elementos.finalizar.disabled = true;
  elementos.finalizar.textContent = 'Finalizando...';
  elementos.statusFinalizacao.textContent = 'Finalizando pedido...';

  pedidoAtual = montarPedido();
  sessionStorage.setItem(CHAVE_PEDIDO, JSON.stringify(pedidoAtual));
  sessionStorage.removeItem(CHAVE_CARRINHO);
  preencherConfirmacao(pedidoAtual);
  await enviarConfirmacaoEmail(pedidoAtual);
}

/** Recupera do localStorage a lista de avaliações salvas neste navegador. */
function recuperarAvaliacoes() {
  const avaliacoes = recuperarJsonArmazenado(localStorage, CHAVE_AVALIACOES, []);
  return Array.isArray(avaliacoes) ? avaliacoes : [];
}

/**
 * Verifica com some se o pedido já foi avaliado e, nesse caso, bloqueia um
 * segundo envio e restaura o texto final do botão.
 */
function prepararAvaliacao(pedidoId) {
  const avaliacaoExistente = recuperarAvaliacoes().some(
    (avaliacao) => avaliacao.pedidoId === pedidoId,
  );
  if (avaliacaoExistente) {
    elementos.statusAvaliacao.textContent = 'Este pedido já foi avaliado. Obrigado pela sua opinião!';
    elementos.enviarAvaliacao.textContent = 'Avaliação enviada';
    elementos.formAvaliacao.querySelectorAll('input, textarea, button').forEach((controle) => {
      controle.disabled = true;
    });
  }
}

/**
 * Valida a nota e o comentário, evita duplicidade e armazena a opinião no
 * localStorage. preventDefault impede o recarregamento do formulário.
 */
function enviarAvaliacao(evento) {
  evento.preventDefault();
  if (!pedidoAtual) return;

  const notaSelecionada = elementos.formAvaliacao.querySelector('input[name="nota"]:checked');
  const comentario = textoSeguro(elementos.comentario.value);
  const erroNota = document.getElementById('erro-nota');
  const erroComentario = document.getElementById('erro-comentario');
  erroNota.textContent = notaSelecionada ? '' : 'Selecione uma nota de 1 a 5 estrelas.';
  erroComentario.textContent = comentario.length <= LIMITE_COMENTARIO
    ? ''
    : `O comentário deve ter no máximo ${LIMITE_COMENTARIO} caracteres.`;

  if (!notaSelecionada) {
    elementos.formAvaliacao.querySelector('input[name="nota"]').focus();
    return;
  }
  if (comentario.length > LIMITE_COMENTARIO) {
    elementos.comentario.focus();
    return;
  }

  const avaliacoes = recuperarAvaliacoes();
  if (avaliacoes.some((avaliacao) => avaliacao.pedidoId === pedidoAtual.id)) {
    elementos.statusAvaliacao.textContent = 'Este pedido já foi avaliado.';
    return;
  }

  avaliacoes.push({
    pedidoId: pedidoAtual.id,
    nota: Number(notaSelecionada.value),
    comentario,
    data: new Date().toISOString(),
  });
  localStorage.setItem(CHAVE_AVALIACOES, JSON.stringify(avaliacoes));
  elementos.statusAvaliacao.textContent = 'Obrigado pela sua opinião!';
  elementos.enviarAvaliacao.textContent = 'Avaliação enviada';
  elementos.formAvaliacao.querySelectorAll('input, textarea, button').forEach((controle) => {
    controle.disabled = true;
  });
}

/** Recupera o último pedido da sessão e volta a exibir seu comprovante. */
function restaurarPedidoSalvo() {
  const salvo = recuperarJsonArmazenado(sessionStorage, CHAVE_PEDIDO, null);
  if (!pedidoSalvoValido(salvo)) return false;
  pedidoAtual = salvo;
  preencherConfirmacao(salvo);
  elementos.statusEmail.textContent = 'Comprovante recuperado desta sessão.';
  return true;
}

/**
 * Inicializa a página, escolhe entre carrinho, estado vazio e comprovante e
 * registra todos os addEventListener necessários para as interações do usuário.
 */
function iniciarCheckout() {
  // Atualiza e limita o contador sempre que o usuário digita no comentário.
  elementos.comentario.addEventListener('input', () => {
    elementos.comentario.value = elementos.comentario.value.slice(0, LIMITE_COMENTARIO);
    elementos.contadorComentario.textContent =
      `${elementos.comentario.value.length}/${LIMITE_COMENTARIO}`;
  });
  // Intercepta o submit da avaliação e direciona o evento para a função responsável.
  elementos.formAvaliacao.addEventListener('submit', enviarAvaliacao);

  // Sem produtos, tenta restaurar o comprovante; se não existir, mostra o estado vazio.
  if (itensNoCarrinho.length === 0) {
    if (!restaurarPedidoSalvo()) elementos.vazio.hidden = false;
    return;
  }

  elementos.conteudo.hidden = false;
  renderizarItens();
  atualizarResumo();

  // Aplica a máscara e remove a mensagem de erro durante a digitação do telefone.
  elementos.telefone.addEventListener('input', () => {
    elementos.telefone.value = mascararTelefone(elementos.telefone.value);
    limparErro(elementos.telefone);
  });
  // Formata o CEP e invalida um frete antigo quando seu valor é alterado.
  elementos.cep.addEventListener('input', () => {
    elementos.cep.value = mascararCep(elementos.cep.value);
    limparErro(elementos.cep);
    elementos.statusCep.textContent = '';
    if (somenteDigitos(elementos.cep.value) !== ultimoCepConsultado) {
      preenchimentoEnderecoManual = false;
      invalidarFrete();
    }
  });
  // Mantém a UF em duas letras maiúsculas e recalcula o fallback manual do frete.
  elementos.uf.addEventListener('input', () => {
    elementos.uf.value = elementos.uf.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 2);
    invalidarFrete();
    if (preenchimentoEnderecoManual && elementos.uf.value.length === 2) {
      calcularFrete(elementos.uf.value);
    }
  });

  // Remove o erro de cada campo comum assim que o usuário começa a corrigi-lo.
  elementos.formulario.querySelectorAll('input').forEach((campo) => {
    campo.addEventListener('input', () => {
      if (campo !== elementos.cep && campo !== elementos.telefone) limparErro(campo);
    });
  });

  // Liga os botões e formulários às respectivas funções de regra de negócio.
  elementos.consultarCep.addEventListener('click', consultarCep);
  // Permite consultar o CEP também pressionando Enter dentro do campo.
  elementos.cep.addEventListener('keydown', (evento) => {
    if (evento.key === 'Enter') {
      evento.preventDefault();
      consultarCep();
    }
  });
  elementos.aplicarCupom.addEventListener('click', alternarCupom);
  elementos.formulario.addEventListener('submit', finalizarPedido);
}

// Inicia o checkout somente depois que todo o arquivo e suas funções foram definidos.
iniciarCheckout();

