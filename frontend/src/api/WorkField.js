import api from '.';

const getWorkFields = () => {
    return api.get('/work-field');
}

const getWorkField = (id) => {
    return api.get(`/work-field/${id}`);
}

export default {
    getWorkFields,
    getWorkField
}