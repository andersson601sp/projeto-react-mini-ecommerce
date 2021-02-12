const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

//Configuracao permissao de acesso client-server
app.use(cors());

//Obtem os dados da requisicao
app.use(bodyParser.json());

//funções dos endpoints
const { finalizarCompra, obterCidadesPorEstado,  obterEstados, obterProdutos} = require('./Controllers/mini-ecommerce');

//Rotas get, post, put, delete

//caso nao tenha implementado metodo
function naoImplementado(req, res){
    res.status(501).json( {erro: 'não implementado.'});
};


app.post('/mini-ecommerce/checkout/finalizar-compra', finalizarCompra);
app.get('/mini-ecommerce/estado/:siglaEstado/cidades', obterCidadesPorEstado);
app.get('/mini-ecommerce/estados', obterEstados);
app.get('/mini-ecommerce/produtos', obterProdutos);

app.listen(port, () => console.log('Servidor Inicializado na porta: ' + port));