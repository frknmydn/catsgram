import { NextFunction, Request, Response } from 'express';
import AuthService from '../service/auth.service';
import bcrypt from "bcrypt";
import { authenticateToken, verifyToken } from '../middlewares/auth.middleware';

class UserController {
    static async register(req: Request, res: Response) {
        try {
            const { email, password, userType } = req.body;
            const newUser = await AuthService.createUser(email, password, userType);
            res.status(201).json(newUser);
        } catch (error:any) {
            res.status(500).json({ error: 'kullanici kayit edilemedi', message: error.message });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const token = await AuthService.login(email, password);
            if (token) {
                res.status(200).json({ token });
            } else {
                res.status(401).json({ error: 'kullanici adi veya sifre hatali' });
            }
        } catch (error) {
            res.status(500).json({ error: 'giris yapilamadi' });
        }
    }

    static async changePasswordByUser(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];

            if (!token) {
                return res.status(401).json({ error: 'Missing token.' });
            }

            const verifiedToken = verifyToken(token);

            if (!verifiedToken) {
                return res.status(403).json({ error: 'Invalid token.' });
            }

            if (!verifiedToken.email) {
                return res.status(400).json({ error: 'Kullanıcı adı bulunamadı.' });
            }

            const { currentPassword, newPassword } = req.body;
            const email = verifiedToken.email; 
            const user = await AuthService.getUserByEmail(email);

            if (!user) {
                return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
            }
            const passwordMatches = await bcrypt.compare(currentPassword, user.password);
            if (!passwordMatches) {
                throw new Error('eski parola yanlis');
            }
            
            const hashedNewPassword = await bcrypt.hash(newPassword, 10);
            await AuthService.updateUserPassword(email, hashedNewPassword);

            return res.status(200).json({ message: 'Parola başarıyla güncellendi.' });

        } catch (error) {
            return res.status(500).json({ error: 'Parola güncellenirken bir hata oluştu.' });
        }
            
        
    }

    static async deleteUser(req:Request, res:Response){
        try{
            const {email} = req.params;
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];

            if(!token){
                return res.send('token bulunamadi');
            }
            
            console.log(email);

            const verifiedToken = verifyToken(token);

            if (!verifiedToken) {
                return res.status(403).json({ error: 'Geçersiz token.' });
            }

             // Kullanıcının kendisi veya admin token'i ile silme yetkisi kontrolü
             if (verifiedToken.email !== email && verifiedToken.userType !== 'admin') {
                return res.status(403).json({ error: 'Bu işlemi gerçekleştirmek için yetkiniz bulunmuyor.' });
            }
            await AuthService.deleteUser(email);
            res.status(200).json({ message: 'Kullanıcı başarıyla silindi.' });
            } catch (error) {
                res.status(500).json({ error: 'Kullanıcı silinirken bir hata oluştu.' });
                }

            
        }

        static async getEmailFromTokenEndpoint(req: Request, res: Response) {
            try {
                const authHeader = req.headers['authorization'];
                const token = authHeader && authHeader.split(' ')[1];
                
                if (!token) {
                    return res.status(401).json({ error: 'Token bulunamadı.' });
                }
    
                const email = await AuthService.sendEmailByToken(token);
    
                if (email) {
                    res.status(200).json({ email });
                } else {
                    res.status(403).json({ error: 'Geçersiz token veya token bulunamadı.' });
                }
            } catch (error) {
                res.status(500).json({ error: 'Bir hata oluştu.' });
            }
        }
}
    


export default UserController;