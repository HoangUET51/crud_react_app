import axios from "./customize-axios";

const FetchAllComments = () => {
  return axios.get(`/api/unknown`);
};

const FetchAllUsers = (page) => {
  return axios.get(`/api/users?page=${page}`);
};

const CreateUser = (name, job) => {
  return axios.post("/api/users", { name: name, job: job });
};

const FetchEditUser = (name, job) => {
  return axios.put("/api/users/", { name: name, job: job });
};

const FetchDeleteUser = (id) => {
  return axios.delete(`/api/users/${id}`);
};

const FetchLogin = (email, password) => {
  return axios.post("/api/login/", { email, password });
};

export {
  FetchAllUsers,
  FetchAllComments,
  CreateUser,
  FetchEditUser,
  FetchDeleteUser,
  FetchLogin,
};
