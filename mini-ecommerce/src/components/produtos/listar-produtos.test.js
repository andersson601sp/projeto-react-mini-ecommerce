import { render, screen } from '@testing-library/react';
import ListarProdutos from './listar-produtos';

describe('Teste do componente listargem de produtos', () => {

    it('deve rexibir os nomes dos produtos nos cards', () => {
        const { getByTestId } = render(
        <ListarProdutos exibirMensagem={() => false} adicionarProduto={() => false} />
        );
        expect(getByTestId('card1')).toHaveTextContent('Java');
        expect(getByTestId('card2')).toHaveTextContent('JavaScript');
    });

    it('deve exibir as descriçoes dos produtos nos cards', () => {
        const { getByTestId } = render(
            <ListarProdutos exibirMensagem={() => false} adicionarProduto={() => false} />           
        );
        expect(getByTestId('card1')).toHaveTextContent('Descricao do produto');
        expect(getByTestId('card2')).toHaveTextContent('Descricao do produto');
    });

    it('deve exibir os preços dos produtos nos botoes comprar', () => {
        const { getByTestId } = render(
            <ListarProdutos exibirMensagem={() => false} adicionarProduto={() => false} />           
        );
        expect(getByTestId('card1')).toHaveTextContent('Comprar (R$ 59,99)');
        expect(getByTestId('card2')).toHaveTextContent('Comprar (R$ 39,99)');
    });
})