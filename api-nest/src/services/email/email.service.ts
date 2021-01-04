import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  constructor(private configService: ConfigService<EnvironmentVariables>) {}

  async sendMail() {
    console.log('sendMail method');
    //#region my credentials
    let options = {
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('GMAIL_USER'),
        pass: this.configService.get<string>('GMAIL_PASSWORD'),
      },
    };
    console.log('EmailService nodemailer', options);
    let transporter = nodemailer.createTransport(options);
    //#endregion

    try {
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Testy Test 👻" <dacgroupman@gmail.com>', // sender address
        to: 'sachinms66@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>', // html body
      });

      console.log('Message sent: %s', info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
