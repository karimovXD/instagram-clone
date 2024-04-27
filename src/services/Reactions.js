import { axiosInstance } from "./axiosInstance";

export const Reactions = {
    async like(id) {
        let response = await axiosInstance.get(`/like/${id}`);
        return response.data
    },

    async dislike(id) {
        let response = await axiosInstance.get(`/dislike/${id}`);
        return response.data
    }
}