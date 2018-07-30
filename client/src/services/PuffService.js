import Api from "./Api.js";

export default {
  readUserPuffs(userId, userToken) {
    let tokenAuth = "Bearer " + userToken;
    return Api().get("/api/v1/users/" + userId, {
      headers: { Authorization: tokenAuth }
    });
  },
  createPuff(puffDetails, userToken) {
    let tokenAuth = "Bearer " + userToken;
    return Api().post("/api/v1/puffs/", puffDetails, {
      headers: { Authorization: tokenAuth }
    });
  },
  createPuffWithImage(puffDetails, userToken) {
    let tokenAuth = "Bearer " + userToken;
    return Api().post(
      "/api/v1/puffs/u",
      puffDetails,
      {
        headers: { Authorization: tokenAuth }
      }
      /*,
      {
        onUploadProgress: uploadEvent => {
          console.log(
            "Upload progress: " +
              Math.round((uploadEvent.loaded / uploadEvent.total) * 100) +
              "%"
          );
        }
      } */
    );
  },
  editPuff(puffId, editedPuff, userToken) {
    let tokenAuth = "Bearer " + userToken;
    return Api().put("/api/v1/puffs/" + puffId, editedPuff, {
      headers: { Authorization: tokenAuth }
    });
  },
  deletePuff(puffId, userToken) {
    let tokenAuth = "Bearer " + userToken;
    return Api().delete("/api/v1/puffs/" + puffId, {
      headers: { Authorization: tokenAuth }
    });
  }
};
