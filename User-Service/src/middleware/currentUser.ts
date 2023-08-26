import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// UserType için bir enum tanımlayın
enum UserType {
  Regular = 'regular',
  Moderator = 'moderator',
  Admin = 'admin'
}

// Özel bir Request arayüzü tanımlayarak Request nesnesini genişletin
declare global {
  namespace Express {
    interface Request {
      userType?: UserType; // Request nesnesine userType eklemek için
    }
  }
}

const secretKey = 'veryberrysecretanahtar'; 

export function checkUserType(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1]; // Token'ı al
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    // Token'ı doğrula
    const decoded = jwt.verify(token, secretKey) as { userType: UserType };
    console.log(decoded);
    if (decoded.userType === UserType.Admin || decoded.userType === UserType.Regular) {
      // Kullanıcı yetkilendirmesi başarılı, işlem yapabilirsiniz.
      req.userType = decoded.userType; // Kullanıcı türünü middleware içinden erişilebilir hale getirin
      return next();
    } else {
      return res.status(403).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
