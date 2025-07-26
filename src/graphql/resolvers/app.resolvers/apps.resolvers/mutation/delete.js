const { ApolloError } = require("apollo-server-express");
const { App } = require("../../../../../models");
const { isValidObjectId } = require("mongoose");

module.exports = async (_, {_id}, {user}) => {
  if(!user) return new ApolloError('يجب تسجيل الدخول اولا')
  try {
    if(!isValidObjectId(_id)) return new ApolloError('خطا في صيغة المعرف')

    const app = await App.findOneAndDelete({_id,user:user._id})
    if(!app) return new ApolloError('خطا في البيانات')
    return true;
  } catch (error) {
    console.log("🚀 ~ module.exports= ~ err:", err)
    return new ApolloError("خطأ في السيرفر");
  }
};
