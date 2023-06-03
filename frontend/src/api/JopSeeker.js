import api from '.';

const getJopSeekers = () => {
    return api.get('/jop-seekers');
}

const getJopSeeker = (id) => {
    return api.get(`/jop-seeker/${id}`);
}

const deleteJopSeeker = (id) => {
    return api.delete(`/jop-seeker/${id}`);
}

export default {
    getJopSeekers,
    getJopSeeker,
    deleteJopSeeker
}