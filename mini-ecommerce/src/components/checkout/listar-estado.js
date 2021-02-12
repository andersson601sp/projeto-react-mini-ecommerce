

import { useEffect, useState } from 'react';
import axios from 'axios';


function  ListarEstados() {

    const ESTADOS_URL = 'http://localhost:3001/mini-ecommerce/estados';
    const [estados, setEstados] = useState([]);

    async function listaEstados() {

        try {
            let { data } = await axios.get(ESTADOS_URL);
            setEstados(data); 
        } catch (err) {
            setEstados([]);
        }
 
    }

    useEffect(() => {
        listaEstados();
    }, []);

    /*
    const estados = [
        {"nome": "Selecione o estado", "sigla": ""},
        {"nome": "Acre", "sigla": "AC"},
        {"nome": "Alagoas", "sigla": "AL"},
        {"nome": "Amapá", "sigla": "AP"},
        {"nome": "Amazonas", "sigla": "AM"},
        {"nome": "Bahia", "sigla": "BA"},
        {"nome": "Ceará", "sigla": "CE"},
        {"nome": "Distrito Federal", "sigla": "DF"},
        {"nome": "Espírito Santo", "sigla": "ES"},
        {"nome": "Goiás", "sigla": "GO"},
        {"nome": "Maranhão", "sigla": "MA"},
        {"nome": "Mato Grosso", "sigla": "MT"},
        {"nome": "Mato Grosso do Sul", "sigla": "MS"},
        {"nome": "Minas Gerais", "sigla": "MG"},
        {"nome": "Pará", "sigla": "PA"},
        {"nome": "Paraíba", "sigla": "PB"},
        {"nome": "Paraná", "sigla": "PR"},
        {"nome": "Pernambuco", "sigla": "PE"},
        {"nome": "Piauí", "sigla": "PI"},
        {"nome": "Rio de Janeiro", "sigla": "RJ"},
        {"nome": "Rio Grande do Norte", "sigla": "RN"},
        {"nome": "Rio Grande do Sul", "sigla": "RS"},
        {"nome": "Rondônia", "sigla": "RO"},
        {"nome": "Roraima", "sigla": "RR"},
        {"nome": "Santa Catarina", "sigla": "SC"},
        {"nome": "São Paulo", "sigla": "SP"},
        {"nome": "Sergipe", "sigla": "SE"},
        {"nome": "Tocantins", "sigla": "TO"}
    ]*/

    return  estados.map(estado =>  <option key={estado.sigla} value={estado.sigla} data-testid={estado.sigla} > {estado.nome} </option>);
    
}


export default ListarEstados;