export interface Post {
  _id: string
  slug: string
  title: string
  author_name: string
  author_profile_image: string
  count_minutes_read: number
  cover_image_link: string
  excerpt: string
  love_count: number
  tags: string[]
  created_at: Date
  md?: string
}
