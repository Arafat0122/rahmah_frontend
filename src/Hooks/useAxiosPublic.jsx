import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "https://rahmah-institute-server-erow.onrender.com",
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;