import { v } from "convex/values";
import { mutation } from "./_generated/server";

const images = [
  "/placeholders/1.jpg",
  "/placeholders/2.jpg",
  "/placeholders/3.jpg",
  "/placeholders/4.jpg",
  "/placeholders/5.jpg",
  "/placeholders/6.jpg",
  "/placeholders/7.jpg",
  "/placeholders/8.jpg",
  "/placeholders/9.jpg",
  "/placeholders/10.jpg",
]

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string()
  },
  handler: async (ctx, args) => {
    const identify = await ctx.auth.getUserIdentity()

    if (!identify) {
      throw new Error('Unauthorized')
    }

    const randomImage = images[Math.floor(Math.random() * images.length)]

    const board = await ctx.db.insert('boards', {
      title: args.title,
      orgId: args.orgId,
      authorId: identify.subject,
      authorName: identify.name!,
      imageUrl: randomImage,
    })

    return board
  }
})