import Api from "./Api.js";

export default {
  readUserData(userId, userToken) {
    return Api(userToken).get("/api/v1/users/" + userId);
  },
  updateUser(userId, editedUserObj, userToken) {
    return Api(userToken).put("/api/v1/users/" + userId, editedUserObj);
  }
};
