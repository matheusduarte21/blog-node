export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: number;
  tags: string[];
}

export interface NewPost {
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
}