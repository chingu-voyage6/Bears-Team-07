import Api from "./Api.js";

export default {
  readUserPuffs(userId) {
    return Api().get("/api/v1/users/" + userId);
  },
  createPuff(puffDetails) {
    return Api().post("/api/v1/puffs/", puffDetails);
  },
  createPuffWithImage(puffDetails) {
    return Api().post("/api/v1/puffs/u", puffDetails, {
      onUploadProgress: uploadEvent => {
        console.log("Upload progress: " + Math.round(uploadEvent.loaded / uploadEvent.total * 100) +
            "%");
      }
    });
  }
};
