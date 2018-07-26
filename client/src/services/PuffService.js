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
      },
      {
        onUploadProgress: uploadEvent => {
          console.log(
            "Upload progress: " +
              Math.round((uploadEvent.loaded / uploadEvent.total) * 100) +
              "%"
          );
        }
      }
    );
  }
};
