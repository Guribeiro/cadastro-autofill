const connection = require('../database/connection');

module.exports = {
    async list(request, response) {
        const dev_id = request.headers.authorization;

        const casos = await connection('casos').where('dev_id', dev_id).select('*')

        return response.json(casos);

    },

    async listDev(request, response) {
        const dev_id = request.headers.authorization;

        const dev = await connection('devs').where('id', dev_id).select('*').first();

        return response.json(dev);
    }, 
    
    async deleteDev(request, response) {
        const dev_id = request.headers.authorization;

        try{

            await connection('devs').where('id', dev_id).delete();
            return response.status(204).send();

        }catch(err){
            alert('Operation missing')
        }
    }
}