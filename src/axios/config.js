/* eslint-disable no-unused-vars */
import axios from "axios";

const blogFetch = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-type": "aplication/json"
    },
})

export default blogFetch