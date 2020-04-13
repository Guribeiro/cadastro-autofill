const crypto = require('crypto');

const connection = require('../database/connection');

const axios = require('axios');

module.exports = {

    async create(request, response) {
        const { nome, email, whatsapp, github_username, cep } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');

        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)

        const { avatar_url, bio } = apiResponse.data;

        const apiCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        const { logradouro, bairro, localidade, uf } = apiCep.data;


        await connection('devs').insert({
            id,
            nome,
            email,
            whatsapp,
            github_username,
            avatar_url,
            bio,
            cep,
            logradouro,
            bairro,
            localidade,
            uf

        })

        return response.json({ id })

    },

    async list(request, response) {
        const devs = await connection('devs').select('*');

        return response.json(devs)
    }
}