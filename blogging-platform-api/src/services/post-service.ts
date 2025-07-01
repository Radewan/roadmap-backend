import { prismaClient } from "../applications/database";
import { ResponseError } from "../errors/response-error";
import { Helper } from "../helpers/helper";
import {
  PostRequest,
  TagId,
  toPostResponse,
  toPostResponseArray,
} from "../models/post-model";
import { PostValidation } from "../validations/post-validation";
import { Validation } from "../validations/validation";

export class PostService {
  static async create(postRequest: PostRequest) {
    const request = Validation.validate(PostValidation.CREATE, postRequest);

    let category = await prismaClient.category.findFirst({
      where: {
        title: Helper.toTitleCase(request.category),
      },
    });

    if (!category) {
      category = await prismaClient.category.create({
        data: {
          title: Helper.toTitleCase(request.category),
        },
      });
    }
    const tags: TagId[] = await Promise.all(
      request.tags.map(async (tag) => {
        const findTag = await prismaClient.tag.findFirst({
          where: {
            title: Helper.toTitleCase(tag),
          },
        });

        if (!findTag) {
          const createTag = await prismaClient.tag.create({
            data: {
              title: Helper.toTitleCase(tag),
            },
          });

          return { id: createTag.id };
        }

        return { id: findTag.id };
      })
    );

    const post = await prismaClient.post.create({
      data: {
        title: request.title,
        content: request.content,
        category_id: category.id,
        tags: {
          connect: tags,
        },
      },
      include: {
        category: true,
        tags: true,
      },
    });

    return toPostResponse(post);
  }
  static async put(postRequest: PostRequest, postId: number) {
    const request = Validation.validate(PostValidation.CREATE, postRequest);

    let category = await prismaClient.category.findFirst({
      where: {
        title: Helper.toTitleCase(request.category),
      },
    });

    if (!category) {
      category = await prismaClient.category.create({
        data: {
          title: Helper.toTitleCase(request.category),
        },
      });
    }
    const tags: TagId[] = await Promise.all(
      request.tags.map(async (tag) => {
        const findTag = await prismaClient.tag.findFirst({
          where: {
            title: Helper.toTitleCase(tag),
          },
        });

        if (!findTag) {
          const createTag = await prismaClient.tag.create({
            data: {
              title: Helper.toTitleCase(tag),
            },
          });

          return { id: createTag.id };
        }

        return { id: findTag.id };
      })
    );

    const post = await prismaClient.post.update({
      where: {
        id: postId,
      },
      data: {
        title: request.title,
        content: request.content,
        category_id: category.id,
        tags: {
          set: tags,
        },
      },
      include: {
        category: true,
        tags: true,
      },
    });

    return toPostResponse(post);
  }

  static async delete(postId: number) {
    const post = await prismaClient.post.findFirst({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new ResponseError(404, "Post not found");
    }

    await prismaClient.post.delete({
      where: {
        id: postId,
      },
    });
  }

  static async get(postId: number) {
    const post = await prismaClient.post.findFirst({
      where: {
        id: postId,
      },
      include: {
        category: true,
        tags: true,
      },
    });

    if (!post) {
      throw new ResponseError(404, "Post not found");
    }

    return toPostResponse(post);
  }

  static async getAll(term: string) {
    const posts = await prismaClient.post.findMany({
      where: {
        OR: [
          { title: { contains: term } },
          { content: { contains: term } },
          {
            category: {
              title: { contains: term },
            },
          },
        ],
      },
      include: {
        category: true,
        tags: true,
      },
    });

    return toPostResponseArray(posts);
  }
}
