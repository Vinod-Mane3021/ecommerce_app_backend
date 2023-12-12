import { UserModel } from "../models/user.model"

const createUser = (value: Record<string, string>) => {
    return UserModel.create(value);
}

export { createUser }



