class Slugify {
    static separate = "-"; // تعريف المتغير العالمي للبادئة
    static slug(text) {
        return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g,  Slugify.separate)          // استبدال الفراغات بشرطات
        .replace(/[^\u0621-\u064A0-9a-z-]+/g, '') // السماح بالحروف العربية والأرقام والشرطات فقط
        .replace(/--+/g,  Slugify.separate);       
    }
  
  }
  
  module.exports = Slugify;

  