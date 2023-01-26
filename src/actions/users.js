import { Server } from "@helpers/server";

export const getUsers = () => {
    return Server('get', '/users');
}