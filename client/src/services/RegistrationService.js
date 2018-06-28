import Api from "./Api.js";

export default {
  register(userDetails) {
    alert("User details: " + userDetails.firstName);
    return Api().post("/users", userDetails);
  }
};
