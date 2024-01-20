import { localhostUserToModel } from "../mappers/localhost-user.mapper";
import { userModelToLocalHost } from "../mappers/user-to-localhost.mapper";
import { User } from "../models/user"

/**
 * 
 * @param {Like<User>} userLike 
 */

export const saveUser = async (userLike) => {
    const user = new User(userLike);
    const userToSave = userModelToLocalHost(user);
    let loadUserUpdated;
    if (user.id) {
        loadUserUpdated = await updateUser(userToSave);
    } else {
        loadUserUpdated = await createUser(userToSave)
    }

    return loadUserUpdated;
}

const createUser = async (user) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users`;
    const request = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' }
    };
    const data = await fetch(url, request).then(response => response.json());
    return new User(data);
}

const updateUser = async (user) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users/${user.id}`;
    const request = {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' }
    };
    const data = await fetch(url, request).then(response => response.json());
    return new User(localhostUserToModel(data));
}