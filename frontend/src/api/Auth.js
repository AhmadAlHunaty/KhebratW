import api from '.';

const login = (data) => {
    return api.post('/auth/login', data);
}

const registerEmployer = (data) => {
    return api.post('/auth/employer/register', data);
}

const registerJobSeeker = (data) => {
    return api.post('/auth/job-seeker/register', data);
}

const forgotPassword = (data) => {
    /* required data: email */
    return api.post('/auth/forgot-password', data);
}

const resetPassword = (data) => {
    /* required data: token, password, password_confirmation */
    return api.post('/auth/reset-password', data);
}

export default {
    login,
    registerEmployer,
    registerJobSeeker,
    forgotPassword,
    resetPassword
};