import Api from "./Api.js";

export default {
  register(userDetails) {
    return Api().post("/api/v1/users", userDetails);
  }
};
