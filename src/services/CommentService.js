import { axiosInstance } from "./axiosInstance"

export const CommentService = {

    addComment: async function (data) {
        const response = await axiosInstance.post('/comment', data);
        return response.data;
    },

    updateComment: async function (id, data) {
        const response = await axiosInstance.put(`/comment/${id}`, data)

        return response.data
    },

    deleteComment: async function (id) {
        const response = await axiosInstance.delete(`/comment/${id}`);

        return response.data;
    },
}