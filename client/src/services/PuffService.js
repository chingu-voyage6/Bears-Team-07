import Api from "./Api.js";

export default {
  createPuffWithImage(puffDetails) {
    return Api().post("/api/v1/puffs/u", puffDetails);
  }
};
