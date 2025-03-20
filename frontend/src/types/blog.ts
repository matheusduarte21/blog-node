export interface Post {
  id: number; 
  title: string;
  subtitle: string;
  content: string;
  tags: string;
  createdAt: string;
};

export interface NewPost {
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
}