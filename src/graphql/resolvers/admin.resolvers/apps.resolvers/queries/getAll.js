const { ApolloError } = require("apollo-server-express");
const { pagination } = require("../../../../../config/constants");
const { Note, User } = require("../../../../../models");

module.exports = async (
  _,
  { page = pagination.page, limit = pagination.limit, search = "" },
  { user }
) => {
  try {
    const skip = (page - 1) * limit;
    const query = {};

    // ✅ لو فيه مستخدم مسجل دخول
    if (user?._id) {
      query.ownerId = user._id;
    }

    // ✅ لو فيه بحث بالاسم
    if (search) {
      const users = await User.find({
        fullname: { $regex: search, $options: "i" },
      })
        .select("_id")
        .lean();

      const ownerIds = users.map((u) => u._id);

      if (query.ownerId) {
        query.ownerId = {
          $in: ownerIds.filter((id) => id.equals(query.ownerId)),
        };
      } else {
        query.ownerId = { $in: ownerIds };
      }
    }

    console.log("🔍 Query used:", query);

    const total = await Note.countDocuments(query);

    const notes = await Note.find(query)
      .populate("category ownerId")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();

    console.log("🚀 ~ notes:", notes);

    return {
      data: notes,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("❌ خطأ أثناء جلب النوت:", error.message, error.stack);
    throw new ApolloError(error.message || "حدث خطأ أثناء جلب الملاحظات");
  }
};
