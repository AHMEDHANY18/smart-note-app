const { ApolloError } = require("apollo-server-express");
const {  App } = require("../../../../../models");
const { pagination } = require("../../../../../config/constants");

module.exports = async (_,{ page = pagination.page, limit = pagination.limit }, {user}) => {

  try {
    const skip = (page - 1) * limit;
    const apps = await App.find({user:user._id}).populate('branch').skip(skip).limit(limit).sort({createdAt:-1});
    return apps

  } catch (error) {
    console.error("حدث خطا اثناء جلب المعلومات", error);
    return new ApolloError('حدث خطأ');

  }

  
};
