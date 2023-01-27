import { Server } from "@helpers/server";

export const getUsers = () => {
    return Server('get', 'users');
}

export const addUser = data => {
    return Server('post', 'users', data);
}

export const updateUser = data => {
    return Server('put', `users/${data.id}`, data);
};

export const deleteUser = id => {
    return Server('delete', `users/${id}`);
}