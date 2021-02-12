import { render, screen } from '@testing-library/react';
import ListarCidades from './listar-cidades';
import axiosMock from 'axios';

describe('Teste do componente de listagem de cidades', () => {

it('DEVE GERAR UMA LSITAGEM DE CIDADES', async () => {
    axiosMock.get.mockResolvedValue({data: ['São Paulo','Cotia']});
    const { findByTestId } = render(<ListarCidades estado="SP"/>);
    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(await findByTestId('São Paulo')).toHaveTextContent('São Paulo');
    expect(await findByTestId('Cotia')).toHaveTextContent('Cotia');
})

})