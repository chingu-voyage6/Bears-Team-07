import Api from "./Api.js";

export default {
  createPuffWithImage(puffDetails) {
    return Api().post("/api/v1/puffs/u", puffDetails, {
      onUploadProgress: uploadEvent => {
        console.log("Upload progress: " + Math.round(uploadEvent.loaded / uploadEvent.total * 100) +
            "%");
      }
    });
  }
};
