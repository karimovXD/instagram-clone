import { axiosInstance } from "./axiosInstance";

export const PostService = {
    getAllPosts: async function () {
        const response = await axiosInstance.get('/post');
        return response.data;
    },
    getCurrentUserPosts: async function () {
        const response = await axiosInstance.get('/my', {
            headers: { access_token: localStorage.getItem('token') },
        });
        return response.data;
    },
    createPost: async function (data) {
        const response = await axiosInstance.post('/post', data)
        return response.data;
    },
    deletePost: async function (id) {
        const response = await axiosInstance.delete(`/post/${id}`)
    },
    getPostId: async function (id) {
        const response = await axiosInstance.get(`/post/${id}`);
        return response.data
    },
    searchPost: async function (title) {
        const response = await axiosInstance.get(`/search?title=${title}`);
        return response.data
    }

}