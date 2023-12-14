import { UserModel } from "../models/user.model"

const createUser = (value: Record<string, string>) => {
    return UserModel.create(value);
}

const findUserByEmail = (email: string) => {
    return UserModel.findOne({email})
}

const findUserById = (id: string) => {
    return UserModel.findById(id)
}

const findUserByEmailOrMobileNumber = (email: string, mobileNumber: string) => {
    return UserModel.findOne({
        $or: [
            { email: email },
            { mobileNumber: mobileNumber }
        ],
    })
}

export { createUser, findUserByEmail, findUserByEmailOrMobileNumber, findUserById }



