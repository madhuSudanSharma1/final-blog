import { Request, Response } from "express";
import * as blogService from "../services/BlogService";

// Helper to get Clerk user ID from middleware/session
function getClerkUserId(req: Request): string | undefined {
  // ClerkExpressRequireAuth middleware attaches userId to req.auth.userId
  return (req as any).auth?.userId;
}

export const createBlog = async (req: Request, res: Response) => {
  try {
  const { title, content } = req.body;
  const authorId = getClerkUserId(req);

    if (!title || !content || !authorId) {
    
      res.status(400)
      throw new Error("Missing required fields")
  }
    const blog = await blogService.createBlogPost(title, content, authorId);
    res.status(201).json(blog);
  } catch (err) {
    res.status(500)
    throw new Error("Failed to create blog")
  }
};

export const getAllBlogs = async (_req: Request, res: Response) => {
  try {
    const blogs = await blogService.listBlogs();
    res.json(blogs);
  } catch (err) {
    res.status(500)
    throw new Error("Failed to fetch blogs")
  }
};

export const getBlog = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const blog = await blogService.findBlogById(id);
    if (!blog) {
      res.status(404)
      throw new Error("Blog not found")
    }
    res.json(blog);
  } catch (err) {
    res.status(500)
    throw new Error("Failed to fetch blog")
  }
};
