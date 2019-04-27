import dotenv from 'dotenv';
import emailer from '@sendgrid/mail';

dotenv.config();

class TransactionEmail {
  static async sendEmail(userInfo) {
    const {
      createdon,
      accountnumber,
      firstname,
      amount,
      balance,
      type,
      email,
    } = userInfo;
    
    
    emailer.setApiKey(process.env.EMAILGRID_API_KEY);

    const detail = {
    
      to: 'aniakuchibuike@gmail.com',
      from: 'clasicsolng@gmail.com',
     
      dynamic_template_data: {
        subject: `Banka ${type} Alert`,
        firstname,
        amount,
        balance,
        accountnumber,
        date: createdon,
        type,
      },
    };
    
    const deliveredEmail = await emailer.send(detail);
   
    if (deliveredEmail) {
      return true;
    }
   
    return false;
  }
  static testing(userInfo){
    const {
      createdon,
      accountnumber,
      firstname,
      amount,
      balance,
      type,
      email,
    } = userInfo;
    emailer.setApiKey(process.env.EMAILGRID_API_KEY);
    

const msg = {
  to: 'aniakuchibuike@gmail.com',
  from: 'clasicsolng@gmail.com',
  
  templateId: 'd-df9db67da07a4ad2b0320d741fa652fe',
      dynamic_template_data: {
        subject: `Banka ${type} Alert`,
        firstname,
        amount,
        balance,
        accountnumber,
        date: createdon,
        type,
      },
};
emailer.send(msg);
  }
}

export default TransactionEmail;