const Modelo = require('./ModeloTabelaProduto')

modeule.exports = {
    listar (idFornecedor) {
        return Modelo.findAll({
            where: {
                fornecedor: idFornecedor
            }
        })
    }
}