//call API from Backend

import axios from "../axios"        //Send req to sever side

const handleLogin = (email, password) => {
    return axios.post('/api/login', { email, password });
}

const getAllUsers = (inputId) => {
    //template string
    return axios.get(`/api/get-all-user?id=${inputId}`)
}

const createNewUserService = (data) => {
    console.log('check data from', data)
    return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    })
}

const editUserService = (userId) => {
    return axios.put('/api/edit-user', userId);
}

export { handleLogin, getAllUsers, createNewUserService, deleteUserService, editUserService }