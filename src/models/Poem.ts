export interface PoemType {
  id: string;
  title: string;
  author: string;
  authorId: number;
  text: string;
  votes: number;
}

export interface NewPoemType {
  title: string;
  author: string;
  authorId: number;
  text: string;
}
