import { render, screen } from '@testing-library/react';
import Produtos from './produtos';

describe('Teste do componente produtos', () => {

    it('deve renderizar o componente quando visivel', () => {
        const { getAllBytext } = render(
        <Produtos visivel={true} adicionarProduto={() => false} />
        );
        const botoes = screen.getAllByText(/comprar/i);
        expect(botoes).toBeTruthy();
    });
})