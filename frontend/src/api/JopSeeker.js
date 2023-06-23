import api from '.';

const getJopSeekers = params => {
    return api.get('/jop-seekers', { params });
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