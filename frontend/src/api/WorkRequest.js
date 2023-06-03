import api from '.';

const getWorkRequests = () => {
    /* return the work requests for the current user (employer or jop seeker) */
    return api.get('/work-request');
}

const getWorkRequest = (id) => {
    return api.get(`/work-request/${id}`);
}

const updateWorkRequest = (id, data) => {
    /* to update the work request by the employer (user should be employer)
    * required data:
    * - jop_seeker_id
    * - description
    * */
    return api.put(`/work-request/${id}`, data);
}

const submitWorkRequest = (id, data) => {
    /* to update the work request by the jop seeker (user should be jop seeker)
    * required data:
    * - status (0: rejected, 1: accepted)
    * */
    return api.post(`/work-request/submit/${id}`, data);
}

const deleteWorkRequest = (id) => {
    return api.delete(`/work-request/${id}`);
}

export default {
    getWorkRequests,
    getWorkRequest,
    updateWorkRequest,
    deleteWorkRequest,
    submitWorkRequest
}