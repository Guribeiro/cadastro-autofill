const connection = require('../database/connection');

module.exports = {
    async list(request, response) {
        const dev_id = request.headers.authorization;

        const casos = await connection('casos').where('dev_id', dev_id).select('*')

        return response.json(casos);

    }
}