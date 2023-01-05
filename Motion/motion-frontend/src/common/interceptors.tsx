import axios, { AxiosInstance } from "axios";

function setInterceptors(instance: AxiosInstance) {
    instance.interceptors.request.use(
        function(request) {
            //request.headers.Authrozation =
            return request;
        },
        function(error) {
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        function(response) {
            return response;
        },
        function(error) {
            return Promise.reject(error);
        }
    );
    return instance;
}

export default setInterceptors;