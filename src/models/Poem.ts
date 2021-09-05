export interface PoemType {
  id: string;
  title: string;
  author: string;
  authorId: number;
  votes: number;
  liked?: boolean;
  text: string;
}

export interface NewPoemType {
  title: string;
  author: string;
  authorId: number;
  text: string;
}
