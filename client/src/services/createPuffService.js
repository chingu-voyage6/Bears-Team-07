import Api from "./Api.js";

export default {
    createPuff(puffDetails) {
        return Api().post("/api/v1/puffs/", puffDetails);
    }
};
