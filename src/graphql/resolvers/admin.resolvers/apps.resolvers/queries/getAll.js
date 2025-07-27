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

    // نبدأ بالبحث في اسم صاحب النوت (owner)
    const users = await User.find({
      name: { $regex: search, $options: "i" }, // بحث غير حساس لحالة الحروف
    })
      .select("_id")
      .lean();

    const ownerIds = users.map((u) => u._id);

    const query = {
      ownerId: { $in: ownerIds },
    };

    // نجيب عدد النتائج
    const total = await Note.countDocuments(query);

    const notes = await Note.find(query)
      .populate("category ownerId")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();
    console.log("🚀 ~ notes:", notes)

    return {
      data: notes,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("❌ خطأ أثناء جلب النوت:", error);
    return new ApolloError("حدث خطأ أثناء جلب الملاحظات");
  }
};
