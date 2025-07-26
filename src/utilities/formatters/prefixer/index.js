class Prefixer {
  static prefix = ""; // تعريف المتغير العالمي للبادئة

  static setPrefix(prefix) {
    Prefixer.prefix = prefix; // تعيين قيمة البادئة
  }

  static addPrefix(text) {
    return Prefixer.prefix + text; // استخدام البادئة مع النص المحدد
  }
}


module.exports = Prefixer;
