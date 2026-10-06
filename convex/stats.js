import { mutation } from "./_generated/server";
 
export const getCreatorStatus = query({ 
  args: {
    userId: v.id("users")
  }, handler: async (ctx, args) => {
    const post = await ctx.db.query("posts").filter(q => q.eq(q.field("authorId"), args.userId)).collect()

    const totalPosts = posts.length;
    const totalViews = posts.reduce((sum, post) => sum + (post.viewa ?? 0), 0)

    const totalLikes = post.reduce((sum, post) => sum + (post.likes ?? 0), 0)
    const commentLikes = post.reduce((sum, post) => sum + (post.comment ?? 0), 0)
  }
})

export const updateBadge = query({
  args: {
    userId: v.id("users")
  }, handler: async (ctx, args) => {
    const post = await ctx.db.query("posts").filter(q => q.eq(q.field("userId"), args.userId)).collect()
    const now = Date.now();

    const date = new Date(now)

    const day = date.getDay();

    const startOfWeek = new Date(date)

    startOfWeek.setDate(date.getDate() - day)
    startOfWeek.setHours(0, 0, 0, 0);
    const postThisWeek = post.filter((post) => post._creationTime >= weekStart).length;

    const recentComments = comments.filter((comment) => comment._createdTime >= now - 7 * 24 * 60 * 60 * 100).length;

    const engagementSore = recentPost * 5 + recentComment * 2;
    let bagde = null;

    if (commentReplies >= 50) {
      bagde = "comment_Champion"
    } else if (postThisWeek >= 5) {
      badge = "weekly_writer";
    } else if (engagementSore >= 20) {
      badge = "trending creator"
    }
  }
})
