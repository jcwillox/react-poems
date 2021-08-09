import { NewPoemType, PoemType } from "../../models/Poem";
import { defaultPoems } from "./data";
import { v4 as uuid4 } from "uuid";

let poemData = { ...defaultPoems };

export const poemStore = {
  /* returns a list of all poems */
  all: (): PoemType[] => {
    return Object.values(poemData);
  },
  /* return a specific poem based on its id */
  get: (id: string): PoemType | undefined => {
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
  },
  /* removes a poem */
  remove: (id: string) => {
    delete poemData[id];
  },
  /* updates a poem */
  update: (poem: PoemType) => {
    poemData[poem.id] = poem;
  }
};
