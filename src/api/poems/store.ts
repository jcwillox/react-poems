import { NewPoemType, PoemType } from "../../models/Poem";
import { defaultPoems } from "./data";
import { v4 as uuid4 } from "uuid";

let poemData = { ...defaultPoems };

// we use a simple set here to track likes as we are assuming
// at this stage that there is only a single user.
let likes = new Set<string>();

export const poemStore = {
  /* returns a list of all poems */
  all: (): PoemType[] => {
    return Object.values(poemData).map(poem => {
      poem.liked = likes.has(poem.id);
      return poem;
    });
  },
  /* return a specific poem based on its id */
  get: (id: string): PoemType | undefined => {
    if (poemData[id]) poemData[id].liked = likes.has(id);
    return poemData[id];
  },
  /* adds a poem */
  add: (poem: NewPoemType) => {
    let id = uuid4();
    poemData[id] = {
      ...poem,
      id: id,
      votes: 0
    };
    return poemData[id];
  },
  /* removes a poem */
  remove: (id: string) => {
    delete poemData[id];
  },
  /* updates a poem */
  update: (poem: PoemType) => {
    poemData[poem.id] = poem;
  },
  upvote: (id: string) => {
    if (!poemData[id]) return false;
    if (poemData[id] && !likes.has(id)) {
      likes.add(id);
      poemData[id].votes++;
    }
    return true;
  },
  downvote: (id: string) => {
    if (!poemData[id]) return false;
    if (poemData[id] && likes.has(id)) {
      likes.delete(id);
      poemData[id].votes--;
    }
    return true;
  }
};
