import axios from 'axios';
import {toast} from "react-toastify";
import {
    ALL_USER_LOAD_FAIL,
    ALL_USER_LOAD_REQUEST,
    ALL_USER_LOAD_SUCCESS,
    USER_APPLY_JOB_FAIL,
    USER_APPLY_JOB_REQUEST,
    USER_APPLY_JOB_SUCCESS,
    USER_LOAD_FAIL,
    USER_LOAD_REQUEST,
    USER_LOAD_SUCCESS,
    USER_LOGOUT_FAIL,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNUP_FAIL,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS
} from '../constants/userConstant';
import Auth from "../../api/Auth";


export const userSignInAction = (user) => async (dispatch) => {
    dispatch({type: USER_SIGNIN_REQUEST});
    try {
        Auth.login(user).then((res) => {
            const data = res.data;
            console.log(data.success.user, data.success.token);
            localStorage.setItem('userInfo', JSON.stringify(data.success.user));
            localStorage.setItem('token', data.success.token);
            dispatch({
                type: USER_SIGNIN_SUCCESS,
                payload: data
            });
            toast.success("Login Successfully!");
        }).catch((error) => {
                dispatch({
                    type: USER_SIGNIN_FAIL,
                    payload: error.response.data.error
                });
            }
        )

    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}

// user sign up action
export const userSignUpAction = (user) => async (dispatch) => {
    dispatch({type: USER_SIGNUP_REQUEST});
    try {
        if(user.role === "employee"){
            var registerFunction = Auth.registerEmployer;

        }else{
            var registerFunction = Auth.registerJobSeeker;
        }
        registerFunction(user).then((res) => {
            const data = res.data;
            console.log(data.success.user, data.success.token);
            localStorage.setItem('userInfo', JSON.stringify(data.success.user));
            localStorage.setItem('token', data.success.token);
            dispatch({
                type: USER_SIGNUP_SUCCESS,
                payload: data
            });
            toast.success("Register Successfully!");
            dispatch({
                type: USER_SIGNUP_SUCCESS,
                payload: data
            });
            toast.success("Register Successfully!");
        }).catch((error) => {
                dispatch({
                    type: USER_SIGNUP_FAIL,
                    payload: error.response.data.error
                });
            }
        );


    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}

// user update action
export const userUpdateAction = (user) => async (dispatch) => {
    dispatch({type: USER_UPDATE_REQUEST});
    try {
        const {data} = await axios.post("/api/update", user);

        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data
        });
        toast.success("Register Successfully!");
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}

//log out action
export const userLogoutAction = () => async (dispatch) => {
    dispatch({type: USER_LOGOUT_REQUEST});
    try {
        localStorage.removeItem('userInfo');
        const {data} = await axios.get("/api/logout");
        dispatch({
            type: USER_LOGOUT_SUCCESS,
            payload: data
        });
        toast.success("Log out successfully!");
    } catch (error) {
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}


//user profile action
export const userProfileAction = () => async (dispatch) => {
    dispatch({type: USER_LOAD_REQUEST});
    try {
        const {data} = await axios.get("/api/me");
        dispatch({
            type: USER_LOAD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: USER_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}


//all user action
export const allUserAction = () => async (dispatch) => {
    dispatch({type: ALL_USER_LOAD_REQUEST});
    try {
        const {data} = await axios.get("/api/allusers");
        dispatch({
            type: ALL_USER_LOAD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ALL_USER_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}

//user job apply action
export const userApplyJobAction = (job) => async (dispatch) => {
    dispatch({type: USER_APPLY_JOB_REQUEST});
    try {
        const {data} = await axios.post("/api/user/jobhistory", job);
        debugger

        dispatch({
            type: USER_APPLY_JOB_SUCCESS,
            payload: data
        });
        toast.success("Apply Successfully for this Job!");
    } catch (error) {
        dispatch({
            type: USER_APPLY_JOB_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}