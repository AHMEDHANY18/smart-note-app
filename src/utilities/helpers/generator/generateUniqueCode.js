const { uid } = require('uid');

const checkCode = async (length, model) => {
  var code = uid(length);
  const ifCodeExist = await model.findOne({code});
  if (ifCodeExist) {
    checkCode();
  }else{
    return code;
  }
}

module.exports = checkCode