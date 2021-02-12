import { useEffect, useState } from 'react';
import axios from 'axios';
import placeholder from '../../imagens/286x180.png';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

function ListarProdutos(props) {

    const PRODUTOS_URL = 'http://localhost:3001/mini-ecommerce/produtos';
    const [produtos, setProdutos] = useState([]);

    async function listaEProdutos() {
        try {
            let { data } = await axios.get(PRODUTOS_URL);
            setProdutos(data); 
        } catch (err) {
            setProdutos([]);
        }   
    }

    useEffect(() => {
        listaEProdutos();
    }, []);


   /* const produtos = [
        { nome: 'Java', preco: 'R$ 59,99' },
        { nome: 'JavaScript', preco: 'R$ 39,99' },
        { nome: 'Delphi', preco: 'R$ 29,99' },
        { nome: 'C#', preco: 'R$ 59,99' },
        { nome: 'Flutter', preco: 'R$ 49,99' },
        { nome: 'Angular', preco: 'R$ 29,99' },
        { nome: 'React', preco: 'R$ 29,99' },
        { nome: 'Vue', preco: 'R$ 29,99' },
        { nome: 'PHP', preco: 'R$ 39,99' },
    ];*/

    function handleComprar(event, produto) {
        event.preventDefault();
        props.adicionarProduto(produto);
        props.exibirMensagem(produto);
    }

    function render() {
        let key = 1;
        const cards = produtos.map(produto =>
            <Card
                key={key}
                data-testid={'card' + key++}
                style={{ width: '18rem', margin: '10px', float: 'left' }}>
                <Card.Img variant="top" src={placeholder} />
                <Card.Body className="text-center">
                    <Card.Title style={{ height: '40px' }}>
                        {produto.nome}
                    </Card.Title>
                    <Card.Text>
                        Descricao do produto
                    </Card.Text>
                    <Button
                        variant="success"
                        style={{ width: '100%' }}
                        onClick={(event) => handleComprar(event, produto)}>
                        Comprar ({produto.preco})
                    </Button>
                </Card.Body>
            </Card>
        );
        return cards;
    }

    return render();
}

ListarProdutos.propTypes = {
    adicionarProduto: PropTypes.func.isRequired,
    exibirMensagem: PropTypes.func.isRequired
}

export default ListarProdutos;