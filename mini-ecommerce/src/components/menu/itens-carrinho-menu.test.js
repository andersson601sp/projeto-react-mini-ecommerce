import { render } from '@testing-library/react';
import ItensCarrinhoMenu from './itens-carrinho-menu';

describe('Teste do componente de itens do carrinho do menu', () => {

    it('deve renderizar o carrinho vazio', () => {
        const { getByTestId } = render(<ItensCarrinhoMenu produtos={[]} />);
        expect(getByTestId('itens')).toHaveTextContent('Carrinho vazio...');
    });

    it('deve renderizar o carrinho com um produto', () => {
        const produtos = [{ nome: 'Java', preco: 'R$ 59,99', quantidade: 1 }]
        const { getByTestId } = render(<ItensCarrinhoMenu produtos={produtos} />);
        expect(getByTestId(produtos[0].nome)).toHaveTextContent('Java - 1 x R$ 59,99');
    });

    it('deve renderizar o carrinho com varios produtos', () => {
        const produtos = [
            { nome: 'Java', preco: 'R$ 59,99', quantidade: 1 },
            { nome: 'C#', preco: 'R$ 59,99', quantidade: 2 }
        ]
        const { getByTestId } = render(<ItensCarrinhoMenu produtos={produtos} />);
        expect(getByTestId(produtos[0].nome)).toHaveTextContent('Java - 1 x R$ 59,99');
        expect(getByTestId(produtos[1].nome)).toHaveTextContent('C# - 2 x R$ 59,99');
    });
})