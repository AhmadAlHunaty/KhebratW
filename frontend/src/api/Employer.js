import api from ".";

const getEmployers = () => {
    return api.get('/employers');
}

const getEmployer = (id) => {
    return api.get(`/employer/${id}`);
}

const deleteEmployer = (id) => {
    return api.delete(`/employer/${id}`);
}

export default {
    getEmployers,
    getEmployer,
    deleteEmployer
}