const token = process.env.CEPABERTO;

const searchCEP = async function(cep){
    const url = `https://www.cepaberto.com/api/v3/cep?cep=${cep}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers:{
                Authorization: `Token token=${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        return {"error": error}
    }
}

module.exports = searchCEP;