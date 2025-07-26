const gpc = require("generate-pincode");

class OTP {
  static url = "https://capi.inforu.co.il/api/v2/SMS/SendSms";

  static OTPGenerate(digits) {
    return gpc(digits);
  }

  static OTPMsg(code) {
    return `رمز تأكيد حسابك في Adumcar هو : ${code}`;
  }

  static async sendSMS({ phone, code }) {
    const data = {
      Data: {
        Message: this.OTPMsg(code),
        Recipients: [
          {
            Phone: phone,
          },
        ],
        Settings: {
          Sender: "Adumcar",
        },
      },
    };
    const headers = {
      Authorization: process.env.SMS_SECRET_KEY,
      "Content-Type": "application/json",
    };
    // return;
    return await fetch(this.url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });
  }
}

module.exports = OTP;
