import { UserModel } from "../models/user.model"

/**
 * Creates new user in the database
 * @param value - User data to be stored.
 * @returns - A promise that resolves to the created user.
 */
export const createUser = (value: Record<string, string>) => {
    return UserModel.create(value);
}

/**
 * Finds the user in database by their email
 * @param email - email address of the used
 * @returns - A promise that resolves to found user or null if not found
 */
export const findUserByEmail = (email: string) => {
    return UserModel.findOne({email})
}

/**
 * Finds a user in the database by their id.
 * @param id - The user ID to search for.
 * @returns A promise that resolves to the found user or null if not found.
 */
export const findUserById = (id: string) => {
    return UserModel.findById(id)
}

/**
 * Finds a user in the database by either email or mobile number.
 * @param email - The email address to search for.
 * @param mobileNumber - The mobile number to search for.
 * @returns A promise that resolves to the found user or null if not found.
 */
export const findUserByEmailOrMobileNumber = (email: string, mobileNumber: string) => {
    return UserModel.findOne({
        $or: [
            { email: email },
            { mobileNumber: mobileNumber }
        ],
    })
}




