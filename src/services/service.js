import http from "./http-service";

const getAll = (params) => {
    return http.get("/", { params });
  };
  
  const get = id => {
    return http.get(`/?id=${id}`);
  };
  
  const create = data => {
    return http.post("/", data);
  };
  
  const update = (id, data) => {
    return http.put(`/?id=${id}`, data);
  };
  
  const remove = id => {
    return http.delete(`/?id=${id}`);
  };
  
  const removeAll = () => {
    return http.delete(`/`);
  };
  
  const findByUsername = uname => {
    return http.get(`/?username=${uname}`);
  };
  
  export default {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByUsername
  };