import usersModel from "./users-model.js";
import { ObjectId } from "mongodb";

export const findAllUsers = () => usersModel.find();

export const findUserById = (uid) => {
  return usersModel.findById(id);
  const index = users.findIndex((u) => u._id === uid);
  if (index !== -1) return users[index];
  return null;
};

export const findUserByUsername = (username) => {
  return usersModel.findOne({ username });
  const index = users.findIndex((u) => u.username === username);
  if (index !== -1) {
    return users[index];
  }

  return null;
};

export const findUserByCredentials = (username, password) => {
  return usersModel.findOne({ username, password });
  const index = users.findIndex(
    (u) => u.username === username && u.password === password
  );
  if (index !== -1) return users[index];
  return null;
};

export const createUser = (user) => {
  return usersModel.create(user);
};

export const updateUser = (uid, user) => {
  usersModel
    .updateOne({ _id: new ObjectId(uid) }, { $set: user })
    .then((result) => {
      console.log(result);
    });
  return { status: "ok" };

  const index = users.findIndex((u) => u._id === uid);

  users[index] = { ...users[index], ...user };
  return { status: "ok" };
};

export const deleteUser = (uid) => {
  usersModel.deleteOne({ _id: id });
  return { status: "ok" };
  const index = users.findIndex((u) => u._id === uid);
  users.splice(index, 1);
  return { status: "ok" };
};
