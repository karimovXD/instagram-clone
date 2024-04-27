import { axiosInstance } from "./axiosInstance";

export const Auth = {
    login: async function (data) {
        const res = await axiosInstance.post('/login', data);
        return res.data

    },

    register: async function (data) {
        const res = await axiosInstance.post('/signup', data);
        return res.data
    }
}