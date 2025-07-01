import { Category, Post, Tag } from "@prisma/client";

export interface PostResponse {
  id: number;
  title: string;
  content: string;
  category: string;
  tags?: string[];
  createAt: Date;
  updateAt: Date;
}

export interface PostRequest {
  title: string;
  content: string;
  category: string;
  tags: string[];
}

export interface TagId {
  id: number;
}

export const toPostResponse = (
  post: Post & { category: Category; tags: Tag[] }
): PostResponse => {
  return {
    id: post.id,
    title: post.title,
    content: post.content,
    category: post.category.title,
    tags: post.tags.map((tag) => tag.title),
    createAt: post.createdAt,
    updateAt: post.updatedAt,
  };
};

export const toPostResponseArray = (
  posts: (Post & { category: Category; tags: Tag[] })[]
): PostResponse[] => {
  return posts.map((post) => ({
    id: post.id,
    title: post.title,
    content: post.content,
    category: post.category.title,
    tags: post.tags.map((tag) => tag.title),
    createAt: post.createdAt,
    updateAt: post.updatedAt,
  }));
};
