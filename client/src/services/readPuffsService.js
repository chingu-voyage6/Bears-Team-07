import Api from "./Api.js";

export default {
  readUserPuffs(userId) {
    return Api().get("/api/v1/users/" + userId);
  }
};
//localhost:3000/api/v1/users/5b427f8db78cad5d921feebd