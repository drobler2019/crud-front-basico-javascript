/**
 * 
 * @param {number} page 
 * @returns {Promise<User>}
 */

import { localhostUserToModel } from "../mappers/localhost-user.mapper";

export const getUserById = async (id) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`;
    const response = await fetch(url).then(response => response.json());
    return localhostUserToModel(response);
}