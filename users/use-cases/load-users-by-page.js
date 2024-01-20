/**
 * 
 * @param {number} page 
 * @returns {Promise<User[]>}
 */

import { localhostUserToModel } from "../mappers/localhost-user.mapper";

export const loadUsersByPage = async (page = 1) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users?_page=${page}`;
    const response = await fetch(url).then(response => response.json());
    return response.map(data => localhostUserToModel(data));
}