// Rotas de produtos
const roteador = require('express').Router({ mergeParams: true })
const Tabela = require('./TabelaProduto')
const Produto = require('./Produto')
const Serializador = require('../../../Serializador').SerializadorProduto

roteador.get('/', async (req, res) => {
    const produtos = await Tabela.listar(req.fornecedor.id)
    const serializador = new Serializador(
        res.getHeader('Content-Type')
    )
    res.send(
        serializador.serializar(produtos)
    )
})

roteador.post('/', async (req, res, proximo) => {
    try {
        const idFornecedor = req.fornecedor.id
        const corpo = req.body
        const dados = Object.assign({}, corpo, { fornecedor: idFornecedor })
        const produto = new Produto(dados)
        await produto.criar()
        res.status(201)
        res.send(produto)
    } catch (erro) {
        proximo(erro)
    }
})

roteador.delete('/:id', async (req, res) => {
    const dados = {
        id: req.params.id,
        fornecedor: req.fornecedor.id
    }

    const produto = new Produto(dados)
    await produto.apagar()
    res.status(204)
    res.end()
})

roteador.get('/:id', async (req, res, proximo) => {
    try {
        const dados = {
            id: req.params.id,
            fornecedor: req.fornecedor.id
        }

        const produto = new Produto(dados)
        await produto.carregar()
        res.send(
            JSON.stringify(produto)
        )
    } catch (erro) {
        proximo(erro)
    }
})

module.exports = roteador