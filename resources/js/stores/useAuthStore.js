import {defineStore} from "pinia";
import axios from "axios";

export const useAuthStore = defineStore('auth', () => {
    // Data

    // Action
    const register = (credentials) => {
        return new Promise((resolve, reject) => {
            axios.post('/api/v1/register', credentials)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => reject(error))
        })
    }

    const login = (credentials) => {
        return new Promise((resolve, reject) => {
            axios.post('/api/v1/login', credentials)
                .then(response => {
                    console.log(response.data.data.token);
                    localStorage.setItem('access_token', response.data.data.token);

                    if (response.data.data.hasOwnProperty('token') && response.data.data.token !== null) {
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.data.token
                    }

                    resolve(response.data)
                })
                .catch(error => reject(error))
        })
    }

    const logout = () => {
        return new Promise((resolve, reject) => {
            axios.post('/api/v1/logout')
                .then(response => {})
                .catch(error => {})
            localStorage.removeItem('access_token')
        })
    }

    return {
        register,
        login,
        logout
    }
});

