import { User } from "../models/user";

/**
 * 
 * @param {Like<User>} localhostUser 
 * @returns {User}
 */

export const localhostUserToModel = (localhostUser) => {

    const { id,
        isActive,
        balance,
        avatar,
        first_name: firstName,
        last_name: lastName,
        gender } = localhostUser;

    return new User({ id, isActive, balance, avatar, firstName, lastName, gender });
}