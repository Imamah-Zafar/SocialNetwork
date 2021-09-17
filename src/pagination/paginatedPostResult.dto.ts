import { Post } from "../posts/schema/post.schema"

export class PaginatedPostResultDto {
    data: Post[]
    page: number
    limit: number
    totalCount: number
  }