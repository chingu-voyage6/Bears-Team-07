import Api from "./Api.js";

export default {
    login(userDetails) {
        return Api().post("/api/v1/auth/login", userDetails);
    }
};
