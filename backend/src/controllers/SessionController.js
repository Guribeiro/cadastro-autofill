const connection = require('../database/connection');

module.exports = {
    async create(request, response) {

        const { github_username, id } = request.body;

        const dev = await connection('devs').where({
            'github_username': github_username,
            'id':id
        }).select('nome').first();

        if(!dev){
            return response.status(400).json({
                error: 'Nenhum usuário encontrado'
            })
        }

        return response.json(dev)


    }
}