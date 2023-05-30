import http from "../http-common";

class AlbumDataService {
  getAll() {
    return http.get("/");
  }

  create(data) {
    return http.post("/", data);
  }

  update(id, data) {
    return http.put(`/${id}`, data);
  }

  delete(id) {
    return http.delete(`/${id}`);
  }


}

export default new AlbumDataService();