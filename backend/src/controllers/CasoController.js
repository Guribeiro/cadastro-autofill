const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { title, description, value } = request.body;
        const dev_id = request.headers.authorization;


        const [id] = await connection('casos').insert({
            title,
            description,
            value,
            dev_id
        })

        return response.json({ id })
    },

    async list(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('casos').count();

        const casos = await connection('casos')
            .join('devs', 'devs.id', '=', 'casos.dev_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['casos.*',
                'devs.nome',
                'devs.email',
                'devs.whatsapp',
                'devs.github_username',
                'devs.avatar_url',
                'devs.bio',
                'devs.cep',
                'devs.logradouro',
                'devs.bairro',
                'devs.localidade',
                'devs.uf']);

        response.header('X-total-Count', count['count(*)']);

        return response.json(casos)
    },

    async delete(request, response) {
        const { id } = request.params;
        const dev_id = request.headers.authorization;

        const caso = await connection('casos').where('id', id).select('dev_id').first();

        if (caso.dev_id !== dev_id) {
            return response.status(401).json({
                error: "Operação não permitida"
            })
        }

        await connection('casos').where('id', id).delete();

        return response.status(204).send();
    }
}