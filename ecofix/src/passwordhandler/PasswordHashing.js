import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import { supabase } from '../components/DatabaseConnection.js';
class PasswordHasher {
    async genSalt() {
        const salt = await crypto.randomBytes(16).toString('hex');
  
        return salt;
      
    }
  
    async hashPassword(password) {
      const salt = await this.genSalt();
      const combinedPassword = password+salt;
      const hash = await bcryptjs.hash(combinedPassword, 10);
      const saltedPassword = [salt,hash];
      
      return saltedPassword;
    }
    
    async verifyPassword(email) {
      const userData = await supabase.from('profiles').select('salt,password').eq('email',email).single();
      console.log(userData)
      const salt = userData.data.salt;
      const dbPass = userData.data.password;
      if(salt == ''){
          return false;
        }
        console.log(salt, dbPass)

      //return await bcryptjs.compare(password, dbHash); 
    }
}

export default PasswordHasher;


/*(async () => {
  try {
    const hashedPassword = '$2b$10$3v4je53PN9uDUAoc3XyD3O6JEwjTzhTikExkRYTsKwyvnxwJ4o/qe';
    const isVerified = await verifyPassword('1234', hashedPassword); 
    console.log('Password verified:', isVerified);
  } catch (error) {
    console.error(error);
  }
})();*/
