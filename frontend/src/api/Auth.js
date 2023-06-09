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

const editProfile = (data) => {
    return api.post('/auth/edit-profile', data);
}

const editProfilePicture = (data) => {
    return api.post('/auth/edit-profile-picture', data);
}

const deleteAccount = () => {
    return api.post('/auth/delete-account');
}

export default {
    login,
    registerEmployer,
    registerJobSeeker,
    forgotPassword,
    resetPassword,
    editProfile,
    editProfilePicture,
    deleteAccount
};