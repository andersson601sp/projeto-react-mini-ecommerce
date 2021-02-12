const cidadesEstados = require('../cidades-estados.json');
const estados = require('../estados.json');
const produtos = require('../produtos.json');

function finalizarCompra(req, res) { 
    console.log(req.body);
    res.send('ok');
};

function obterCidadesPorEstado(req, res) {
    const siglaEstado =  req.params['siglaEstado'].toUpperCase();
    const dadosEstado = cidadesEstados.estados.filter(estado => estado.sigla === siglaEstado);
    if(dadosEstado.length === 0) {
        res.status(404).json({erro:`${siglaEstado} não é um estado válido.`})
    }
    res.json(dadosEstado[0].cidades);
}

function obterEstados(req, res) {
    res.json(estados.estados);
}

function obterProdutos(req, res) {
    res.json(produtos.produtos);
}

module.exports = {
    finalizarCompra, 
    obterCidadesPorEstado,
    obterEstados,
    obterProdutos,
}