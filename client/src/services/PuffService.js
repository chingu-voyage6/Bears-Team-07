import Api from "./Api.js";

export default {
  readUserPuffs(userId, userToken) {
    return Api(userToken).get("/api/v1/users/" + userId);
  },
  createPuff(puffDetails, userToken) {
    return Api(userToken).post("/api/v1/puffs/", puffDetails);
  },
  createPuffWithImage(puffDetails, userToken) {
    return Api(userToken).post("/api/v1/puffs/u", puffDetails);
  },
  updatePuff(puffId, editedPuff, userToken) {
    return Api(userToken).put(`/api/v1/puffs/${puffId}`, editedPuff);
  },
  updatePuffWithImage(puffId, editedPuff, userToken) {
    return Api(userToken).put(`/api/v1/puffs/u/${puffId}`, editedPuff);
  },
  deletePuff(puffId, userToken) {
    return Api(userToken).delete(`/api/v1/puffs/${puffId}`);
  }
};
