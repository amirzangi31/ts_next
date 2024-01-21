import axios from "axios";

import config from './config.json'
import urls from "./urls";




const http = axios.create({
    
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
})







http.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem("accessToken")


    if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`
    }

    return config
},
    (error) => {
        return Promise.reject(error)
    }
)




let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: any, token = null) => {
    failedQueue.forEach((prom: any) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};


// http.interceptors.response.use((response) => {
//     return response
// },
//     async (error) => {
//         const originalRequest = error.config;

//         const refreshToken = localStorage.getItem("refreshToken")
//         const accessToken = localStorage.getItem("accessToken")

//         if (!accessToken || !refreshToken) {
//             return Promise.reject(error);
//         }


//         if (error.response.status === 401 && !originalRequest._retry) {

//             if (isRefreshing) {

//                 return new Promise(function (resolve, reject) {
//                     failedQueue.push({ resolve, reject });
//                 })
//                     .then(token => {

//                         originalRequest.headers['Authorization'] = 'Bearer ' + token;
//                         return axios(originalRequest);
//                     })
//                     .catch(error => {
//                         return Promise.reject(error);
//                     });
//             }

//             originalRequest._retry = true;
//             isRefreshing = true;

//             return new Promise(function (resolve, reject) {
//                 const refreshToken = localStorage.getItem("refreshToken")
//                 const accessToken = localStorage.getItem("accessToken")

//                 axio
//                     .post(urls.login.refreshToken.url, {
//                         refresh: refreshToken,
//                     }, {
//                         headers: {
//                             "Authorization": `Bearer ${accessToken}`
//                         }
//                     })
//                     .then(({ data }) => {
//                         localStorage.setItem("accessToken", data.access)
//                         originalRequest.headers['Authorization'] = 'Bearer ' + data.access;
//                         processQueue(null, data.value);
//                         resolve(axios(originalRequest));
//                     })
//                     .catch(error => {
//                         processQueue(error, null);
//                         localStorage.removeItem("accessToken")
//                         localStorage.removeItem("refreshToken")
//                         window.location.href = "/signin"
//                         reject(error);
//                     })
//                     .then(() => {
//                         isRefreshing = false;
//                     });
//             });
//         }

//         return Promise.reject(error);
//     }
// )






export { http }