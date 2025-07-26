const {phone} = require('phone');

class phoneNumbers {
    static egyptFormat(phoneNumber) {
        return phone(phoneNumber, {country: 'EGY'}); 
    }
  }
  module.exports = phoneNumbers;

  