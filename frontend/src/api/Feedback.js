import api from '.';

const path = '/feedback';
const getFeedbacks = () => {
    /* get all feedbacks from employer to job_seeker (by the employer or Jop Seeker) */
    return api.get(path);
}

const getFeedback = (id) => {
    return api.get(`${path}/${id}`);
}

const createFeedback = (data) => {
    /* create new feedback from employer to job_seeker (by the employer only)
    * required data: job_seeker_id, rating, notes
    * */
    return api.post(path, data);
}

const updateFeedback = (id, data) => {
    /* update new feedback from employer to jobseeker (by the employer only)
    * required data: job_seeker_id, rating, notes
    *  */
    return api.put(`${path}/${id}`, data);
}

const deleteFeedback = (id) => {
    return api.delete(`${path}/${id}`);
}

export default {
    getFeedbacks,
    getFeedback,
    createFeedback,
    updateFeedback,
    deleteFeedback
}