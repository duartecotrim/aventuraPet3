// Substitua pelo seu token de acesso
const token = 'be380c54fed0e26adf0f82bf75438313';

// Função para buscar informações de um CEP
async function buscarCEP(cep) {
    const url = `https://www.cepaberto.com/api/v3/cep?cep=${cep}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Token token=${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }

        const dados = await response.json();
        const lat2 = '-23.542298';
        const lon2 = '-46.8848325';
        const lat1 = '-23.5421686';
        const lon1 = '-46.8812042';
        const calcDistance = require('./app/libs/calcDistance');


        console.log(calcDistance(lat1, lon1, lat2, lon2)); // Exibe os dados no console
        
        return dados;
    } catch (erro) {
        console.error('Erro ao buscar o CEP:', erro.message);
    }
}

///buscarCEP('06447380');


        const lat1 = '-23.5148734';
        const lon1 = '-46.8928121';
        const lat2 = '-23.5475363';
        const lon2 = '-46.8818921';
        const calcDistance = require('./app/libs/calcDistance');
        const result = calcDistance(lat1, lon1, lat2, lon2)

        console.log(result.toFixed(2)+" km")