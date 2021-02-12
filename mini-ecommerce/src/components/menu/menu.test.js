import { render, screen } from '@testing-library/react';
import Menu from './menu';

describe('Teste do componente Menu', () => {

    it('deve renderizar o componente sem erros', () => {
        const { getBytext } = render(
        <Menu 
            produtos={[]} 
            handleExibirProdutos={() => false}
            handleExibirCheckout={() => false}  />);
        const texto = screen.getByText(/mini ecommerce/i);
        expect(texto).toBeInTheDocument();
    });
})