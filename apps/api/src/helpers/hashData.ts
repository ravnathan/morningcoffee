import { genSalt, hash } from 'bcrypt';

export const hashData = async (data: string) => {
    const salt = await genSalt(10)
    const hashPassword = await hash(data, salt)
    return hashPassword
};