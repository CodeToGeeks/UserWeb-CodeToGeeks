import { Tag } from './Tag.model'
import { Author } from './Author.model'
export interface Post {
  _id: string
  slug: string
  title: string
  author: Author
  tags: Tag[]
  created_at: Date
}
