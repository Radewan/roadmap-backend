import { prismaClient } from "../applications/database";
import { ResponseError } from "../errors/response-error";
import { Helper } from "../helpers/helper";
import { PostRequest, TagId, toPostResponse } from "../models/post-model";
import { PostValidation } from "../validations/post-validation";
import { Validation } from "../validations/validation";

export class PostService {
  static async create(postRequest: PostRequest) {
    const request = Validation.validate(PostValidation.CREATE, postRequest);

    const category = await prismaClient.category.findFirst({
      where: {
        title: Helper.toTitleCase(request.category),
      },
    });

    if (!category) {
      throw new ResponseError(
        404,
        `Category ${Helper.toTitleCase(request.category)} not found`
      );
    }
    const tags: TagId[] = await Promise.all(
      request.tags.map(async (tag) => {
        const findTag = await prismaClient.tag.findFirst({
          where: {
            title: Helper.toTitleCase(tag),
          },
        });

        if (!findTag) {
          throw new ResponseError(404, `Tag ${tag} not found`);
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
}
