const { ApolloError } = require("apollo-server-express");
const { pagination } = require("../../../../../config/constants");
const { Note, User } = require("../../../../../models");
/**
 * Fetches a paginated list of notes based on the authenticated user or a search keyword.
 *
 * - If a user is logged in, filters notes by their `ownerId`.
 * - If a `search` keyword is provided, it searches for users with matching names (`fullname`)
 *   and filters notes owned by them.
 *
 * @param {object} _ - Unused GraphQL root argument
 * @param {object} args - Query arguments
 * @param {number} [args.page=1] - Page number for pagination
 * @param {number} [args.limit=10] - Number of notes per page
 * @param {string} [args.search=""] - Search keyword to match user full names
 * @param {object} context - GraphQL context containing authenticated user
 * @param {object} context.user - Authenticated user object
 * @returns {Promise<{ data: object[], pagination: { total: number, page: number, pages: number } }>} Paginated notes result
 * @throws {ApolloError} When an unexpected error occurs during the query
 */

module.exports = async (
  _,
  { page = pagination.page, limit = pagination.limit, search = "" },
  { user }
) => {
  try {
    const skip = (page - 1) * limit;
    const query = {};
    if (user?._id) {
      query.ownerId = user._id;
    }
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
    const total = await Note.countDocuments(query);
    const notes = await Note.find(query)
      .populate("category ownerId")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();
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
