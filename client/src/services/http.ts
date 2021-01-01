import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
axios.defaults.withCredentials = true;

export const http = {
        get: axios.get,
        post: axios.post,
        put: axios.put,
        delete: axios.delete,
};
