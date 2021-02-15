import { findByTestId, render, fireEvent } from '@testing-library/react';
import ListarEstados from './listar-estado';
import axiosMock from 'axios';

describe('Teste do componente de listagem de estados', () => {

    it('DEVE GERAR UMA LISTAGEM DE ESTADOS', async () => {
        axiosMock.get.mockResolvedValue({ data: [{ nome: 'São Paulo', sigla: 'SP'}]});
        const { findByTestId } = render(<ListarEstados />);
        expect(axiosMock.get).toHaveBeenCalledTimes(1);
        expect(await findByTestId('SP')).toHaveTextContent('São Paulo');
    });
});   