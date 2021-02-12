import { useState } from 'react';
import { Form, Row, Col, Button, Jumbotron, Modal } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import ListarEstados from './listar-estado';
import ListarCidades from './listar-cidades';
import { Formik } from 'formik';
import * as yup from 'yup';
import { validarCpf, formatarCpf } from '../../utils/cpf-util';
import formatarCep from '../../utils/cep-util';
import axios from 'axios';

registerLocale('pt', pt)

function Checkout(props) {

    const CHECKOUT_URL = 'http://localhost:3001/mini-ecommerce/checkout/finalizar-compra';

    const [dataNascimento, setDataNascimento] = useState(null);
    const [formEnviado, setFormEnviado] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showErroModal, setShowErroModal] = useState(false);

    const schema = yup.object({
        email: yup.string().email().required(),
        nomeCompleto: yup.string().required().min(5),
        cpf: yup.string().required().min(14).max(14).test('cpf-valido', 'CPF inválido', (cpf) => validarCpf(cpf)),
        endereco: yup.string().min(5).required(),
        cidade: yup.string().required(),
        estado: yup.string().required(),
        cep: yup.string().required().min(9).max(9),
        emailPromocional: yup.string().required(),
        termosCondicoes: yup.bool().oneOf([true])
    })

    function visivel() {
        return props.visivel ? null : 'hidden';
    }

    async function finalizarCompra(dados) {
        if (!dataNascimento) {
            setFormEnviado(true);
            return;
        }

        //adicoionado mais valaores ao form
        dados.dataNascimento = dataNascimento;
        dados.produtos = JSON.stringify(props.produtos);
        dados.total = `R$ ${props.total}`;

        try {
            await axios.post(CHECKOUT_URL, dados);
            setShowModal(true);
            props.handleLimparCarrinho();
        } catch (err) {
            setShowErroModal(true);
        }

    }


    function handleDataNascimento(data) {
        setDataNascimento(data);
    }

    function datePickerCss() {
        if (!formEnviado) {
            return "form-control";
        }

        if (dataNascimento) {
            return "form-control is-valid";
        } else {
            return "form-control is-invalid";
        }
    }

    function handleContinuar() {
        setShowModal(false);
        props.handleExibirProdutos();
    }


    function handleFecharErroModal() {
        setShowErroModal(false);
    }

    return (
        <Jumbotron fluid style={{ margin: '10px' }} className={visivel()} >
            <h3 className="text-center">Finalizar compra</h3>

            <Formik
                onSubmit={(values) => finalizarCompra(values)}
                initialValues={{
                    /**Mapeando formulario com formik*/
                    /*em formulario de atualizaçao deve se prover(preencher dados da api) os dados nos parametros abaixo */
                    email: '',
                    nomeCompleto: '',
                    cpf: '',
                    endereco: '',
                    cidade: '',
                    estado: '',
                    cep: '',
                    termosCondicoes: false,
                    emailPromocional: 'S'
                    /*dataNascimento -> datepicker tratada como usestate pois ele nao se integra adequadamento no formik*/
                }}
                validationSchema={schema}>
                {({/*eventos do formik */
                    handleSubmit,/* enviar o form*/
                    handleChange,/**quando ocorre modificação no formulario*/
                    values,/**valores do formulario */
                    touched,/*Validar se o elemento foi modificado */
                    errors
                }) =>
                (/* Esta função permite usar outros recursos do formik dentro do formulario */
                    <Form noValidate style={{ margin: '10px' }} onSubmit={handleSubmit} >
                        <Form.Group as={Row} controlId="email">
                            <Form.Label column sm={3}>Email</Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    type="email"
                                    placeholder="Digite o seu email"
                                    name="email"
                                    data-testid="txt-email"
                                    /* validaçoes do formik */
                                    value={values.email}
                                    onChange={handleChange}
                                    isValid={touched.email && !errors.email}
                                    isInvalid={touched.email && !!errors.email} /*!! troca o valor 2x para retornar boolean pois errors não é boolean*/
                                />
                                <Form.Control.Feedback type="invalid">
                                    Digite um email valido.
                        </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="nomeCompleto">
                            <Form.Label column sm={3}>Nome Completo</Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    type="text"
                                    placeholder="Digite o seu nome completo"
                                    name="nomeCompleto"
                                    data-testid="txt-nome-completo"
                                    /* validaçoes do formik */
                                    value={values.nomeCompleto}
                                    onChange={handleChange}
                                    isValid={touched.nomeCompleto && !errors.nomeCompleto}
                                    isInvalid={touched.nomeCompleto && !!errors.nomeCompleto} /*!! troca o valor 2x para retornar boolean pois errors não é boolean*/
                                />
                                <Form.Control.Feedback type="invalid">
                                    Digite  o seu nome completo (minimo 5 caracteres)
                        </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="dataNascimento">
                            <Form.Label column sm={3}>Data de Nascimento</Form.Label>
                            <Col sm={9}>
                                <DatePicker locale="pt"
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Selecione a data"
                                    withPortal
                                    selected={dataNascimento}
                                    onChange={handleDataNascimento}
                                    className={datePickerCss()}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="cpf">
                            <Form.Label column sm={3}>CPF</Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    type="text"
                                    placeholder="Digite o seu CPF"
                                    name="cpf"
                                    data-testid="txt-cpf"
                                    /* validaçoes do formik */
                                    value={values.cpf}
                                    /* formatar a mascara do cpf */
                                    onChange={e => {
                                        e.currentTarget.value = formatarCpf(e.currentTarget.value);
                                        handleChange(e);
                                    }}
                                    isValid={touched.cpf && !errors.cpf}
                                    isInvalid={touched.cpf && !!errors.cpf} /*!! troca o valor 2x para retornar boolean pois errors não é boolean*/
                                />
                                <Form.Control.Feedback type="invalid">
                                    Digite um CPF valido
                        </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="endereco">
                            <Form.Label column sm={3}>Endereço</Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    type="text"
                                    placeholder="Digite o seu endereço completo"
                                    name="endereco"
                                    data-testid="txt-endereco"
                                    /* validaçoes do formik */
                                    value={values.endereco}
                                    onChange={handleChange}
                                    isValid={touched.endereco && !errors.endereco}
                                    isInvalid={touched.endereco && !!errors.endereco} /*!! troca o valor 2x para retornar boolean pois errors não é boolean*/
                                />
                                <Form.Control.Feedback type="invalid">
                                    Digite um Endereço valido
                        </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="estado">
                            <Form.Label column sm={3}>Estado</Form.Label>
                            <Col sm="9">
                                <Form.Control as="select"
                                    name="estado"
                                    data-testid="estado"
                                    /* validaçoes do formik */
                                    value={values.estado}
                                    onChange={handleChange}
                                    isValid={touched.estado && !errors.estado}
                                    isInvalid={touched.estado && !!errors.estado} /*!! troca o valor 2x para retornar boolean pois errors não é boolean*/
                                >
                                    <ListarEstados />
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Selecicone o seu estado.
                        </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="cidade">
                            <Form.Label column sm={3}>Cidade</Form.Label>
                            <Col sm="9">
                                <Form.Control as="select"
                                    name="cidade"
                                    data-testid="cidade"
                                    /* validaçoes do formik */
                                    value={values.cidade}
                                    onChange={handleChange}
                                    isValid={touched.cidade && !errors.cidade}
                                    isInvalid={touched.cidade && !!errors.cidade} /*!! troca o valor 2x para retornar boolean pois errors não é boolean*/
                                >
                                    <option value="">Selecione a cidade</option>
                                    <ListarCidades estado={values.estado} />
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Selecicone a sua cidade.
                        </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="cep">
                            <Form.Label column sm={3}>CEP</Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    type="text"
                                    placeholder="Digite o seu CEP"
                                    name="cep"
                                    data-testid="txt-cep"
                                    /* validaçoes do formik */
                                    value={values.cep}
                                    onChange={e => { e.currentTarget.value = formatarCep(e.currentTarget.value); handleChange(e); }}
                                    isValid={touched.cep && !errors.cep}
                                    isInvalid={touched.cep && !!errors.cep} /*!! troca o valor 2x para retornar boolean pois errors não é boolean*/
                                />
                                <Form.Control.Feedback type="invalid">
                                    Digite um CEP valido
                        </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="emailPromocional">
                            <Form.Label column sm={12}>Deseja receber email com promoções</Form.Label>
                            <Form.Check
                                inline
                                name="emailPromocional"
                                type="radio"
                                id="promocaoSim"
                                value="S"
                                label="Sim"
                                style={{ marginLeft: '15px' }}
                                /* validaçoes do formik */
                                checked={values.emailPromocional === 'S'}
                                onChange={handleChange}
                            />
                            <Form.Check
                                inline
                                name="emailPromocional"
                                type="radio"
                                id="promocaoNao"
                                value="N"
                                label="Não"
                                style={{ marginLeft: '15px' }}
                                /* validaçoes do formik */
                                checked={values.emailPromocional === 'N'}
                                onChange={handleChange} />
                        </Form.Group>
                        <Form.Group as={Row} controlId="termosCondicoes">
                            <Form.Check
                                name="termosCondicoes"
                                label="Concordo com os termos e condições"
                                style={{ marginLeft: '15px' }}
                                data-testid="check-termos-condicoes"
                                /* validaçoes do formik */
                                value={values.termosCondicoes}
                                onChange={handleChange}
                                isValid={touched.termosCondicoes && !errors.termosCondicoes}
                                isInvalid={touched.termosCondicoes && !!errors.termosCondicoes} /*!! troca o valor 2x para retornar boolean pois errors não é boolean*/
                            />
                        </Form.Group>
                        <Form.Group as={Row} controlId="finalizarCompra">
                            <Col className="text-center" sm={12}>
                                <Button type="submit" variant="success" data-testid="btn-finalizar-compra">
                                    Finalizar compra
                        </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                )}
            </Formik>
            <Modal show={showModal} onHide={handleContinuar} data-testid="modal-compra-sucesso">
                <Modal.Header closeButton>
                    <Modal.Title>Compra realizada com sucesso!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Um email de confirmação foi enviado com detalhes da transação
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleContinuar}>Continuar</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showErroModal} onHide={handleFecharErroModal} data-testid="modal-erro-compra">
                <Modal.Header closeButton>
                    <Modal.Title>Erro ao processar pedido.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tente novamente em instante
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleFecharErroModal} >Continuar</Button>
                </Modal.Footer>
            </Modal>
        </Jumbotron>
    )

}

Checkout.propTypes = {
    visivel: PropTypes.bool.isRequired,
    handleExibirProdutos: PropTypes.func.isRequired,
    total: PropTypes.string.isRequired,
    produtos: PropTypes.object.isRequired,
    handleLimparCarrinho: PropTypes.func.isRequired
}

export default Checkout;