import Api from "./Api.js";

export default {
  readUserData(userId, userToken) {
    let tokenAuth = "Bearer " + userToken;
    return Api().get("/api/v1/users/" + userId, {
      headers: { Authorization: tokenAuth }
    });
  },
  updateUser(userId, editedUserObj, userToken) {
    let tokenAuth = "Bearer " + userToken;
    return Api().put("/api/v1/users/" + userId, editedUserObj, {
      headers: { Authorization: tokenAuth }
    });
  }
};
