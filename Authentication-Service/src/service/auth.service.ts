import User, { UserType } from "../models/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Session from "../models/Session";


class UserService {
    static async createUser(email: string, password: string, userType: UserType) {
        try {
            const user = new User({ email, password, userType });
            await user.save();
            return user;
        } catch (error) {
            throw error;
        }
    }

    static async login(email: string, password: string): Promise<string | any> {
        try {
            const user = await User.findOne({ email });
            if (user && await bcrypt.compare(password, user.password)) {
                const token = jwt.sign({ email: user.email, userType: user.userType }, 'veryberrysecretanahtar', { expiresIn: '1h' });

                const session = new Session({
                    email: user.email,
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

    static async getUserByEmail(email:string) : Promise<string | any>{
        const user = await User.findOne({ email });
        return user;
    }

    static async updateUserPassword(email: string, newPassword: string) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { email: email },
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

    static async deleteUser(email: string) {
        try {
            const deletedUser = await User.findOneAndDelete({ email });
            if (!deletedUser) {
                throw new Error('Kullanıcı bulunamadı veya silinemedi.');
            }
        } catch (error) {
            throw error;
        }
    }

    static async sendEmailByToken(jwtToken: string){
        try {
            // Token'i doğrula
            const decodedToken = jwt.verify(jwtToken, 'veryberrysecretanahtar') as { email: string, userType: string };

            // Kullanıcı adını döndür
            return decodedToken.email;
        } catch (error) {
            // Token geçerli değilse veya başka bir hata oluştuysa null döndür
            return null;
        }
    }
}



export default UserService;