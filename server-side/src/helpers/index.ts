import bcrypt from 'bcrypt'
 
export const hashedPassword = async (password: string, size: number) => {
    const salt = await bcrypt.genSalt(size)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}

export const comparePassword = async (candidatePassword: string, hash: string) => {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, hash);
        return isMatch;
    } catch (error) {
        console.log('not allowed')
        throw error;
    }
};