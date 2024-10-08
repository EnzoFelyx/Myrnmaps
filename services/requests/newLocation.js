import api from "../api";

export async function newLocation(pin, subtitle, lat, long, num, lograd, neigh, city, state, country, cep) {

    try {
        await api.post(`/location`, {
            id: Date.now(), // Gera um ID único
            nome: pin,
            subtitle: subtitle,
            latitude: lat,
            longitude: long,
            num: num,
            lograd: lograd,
            neigh: neigh,
            city: city,
            state: state,
            cep: cep,
            country: country

        });
        return 'Sucesso';
    } catch (error) {
        console.error('Erro ao criar nova localização:', error.response?.data || error.message);
        return 'Erro';
    }
}

export async function pinList() {
    try {
        const resultado = await api.get(`/location`);
        return resultado.data;
    }
    catch (error) {
        console.log(error)
        return []
    }
}

export async function deletarLocal(id) {
    try {
        const resultado = await api.get(`/location`);
        const locais = resultado.data;
        const itemParaDeletar = locais.find(item => item.id === id);
        if (!itemParaDeletar) {
            return 'Falha ao excluir local';
        }
        await api.delete(`/location/${itemParaDeletar.id}`);
        return 'sucesso';
    } catch (error) {
        console.log(error);
        return 'erro';
    }
}