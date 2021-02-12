import { render, screen } from '@testing-library/react';
import MiniEcommerce from './mini-ecommerce';

describe('Teste do componente mini-ecommerce', () => {

  it('deve renderizar o componente sem erros', () => {
    render(<MiniEcommerce />);
    const linkElement = screen.getByText('Mini Ecommerce');
    expect(linkElement).toBeInTheDocument();
  });
  

})
