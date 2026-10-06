import { mutation, query } from "./_generated/server";

export const getTopComment = query({
  handler: async (ctx) => {
    const comments = await ctx.db.query("comments").filter((q) => q.eq(q.field("status"), "approved")).collect()

    const creatorCommentCounts = {};
    for (const comment of comments) {
      const post = await ctx.db.get(comment.postId)

      if (!post) continue;

      const createdId = post.authorId;

      if (!creatorCommentCounts[createdId]) {
        creatorCommentCounts[createdId]++
      }
      let maxComment = 0;

      for (const creatorId in creatorCommentCounts) {
        if (creatorCommentCounts[creatorId] > maxComment) {
          maxComment = creatorCommentCounts[creatorId]
        }
      }

      const topCreators = [];
      for (const creatorId in creatorCommentCounts) {
        if (creatorCommentCounts[creatorId === maxComment]) {
          const creator = await ctx.db.get(createdId)
          if (creatorCommentCounts[createdId] === maxComment) {
            const creator = await ctx.db.get(creatorId);

            if (creator) {
              topCreators.push({
                createdId: creator._id,
                name: creator.username, commentCount: creatorCommentCounts[createdId]
              })
            }
          }
        }
      }
    }
    return topCreators
  }
})