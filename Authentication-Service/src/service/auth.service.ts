import User, { UserType } from "../models/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Session from "../models/Session";


class UserService {
    static async createUser(username: string, password: string, userType: UserType) {
        try {
            const user = new User({ username, password, userType });
            await user.save();
            return user;
        } catch (error) {
            throw error;
        }
    }

    static async login(username: string, password: string): Promise<string | any> {
        try {
            const user = await User.findOne({ username });
            if (user && await bcrypt.compare(password, user.password)) {
                const token = jwt.sign({ username: user.username, userType: user.userType }, 'veryberrysecretanahtar', { expiresIn: '1h' });

                const session = new Session({
                    username: user.username,
                    userType: user.userType,
                    token,
                    expiresAt: new Date(Date.now() + 3600000) // 1 saat 
                });
                await session.save();

                return token;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async getUserByUsername(username:string) : Promise<string | any>{
        const user = await User.findOne({ username });
        return user;
    }

    static async updateUserPassword(username: string, newPassword: string) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { username: username },
                { password: newPassword },
                { new: true } // Bu seçenek, güncellenmiş kullanıcı belgesini döndürür
            );
    
            if (!updatedUser) {
                throw new Error('Kullanıcı bulunamadı veya güncellenemedi.');
            }
        } catch (error) {
            throw error;
        }
    }

    static async deleteUser(username: string) {
        try {
            const deletedUser = await User.findOneAndDelete({ username });
            if (!deletedUser) {
                throw new Error('Kullanıcı bulunamadı veya silinemedi.');
            }
        } catch (error) {
            throw error;
        }
    }

    static async sendUsernameByToken(jwtToken: string){
        try {
            // Token'i doğrula
            const decodedToken = jwt.verify(jwtToken, 'veryberrysecretanahtar') as { username: string, userType: string };

            // Kullanıcı adını döndür
            return decodedToken.username;
        } catch (error) {
            // Token geçerli değilse veya başka bir hata oluştuysa null döndür
            return null;
        }
    }
}



export default UserService;