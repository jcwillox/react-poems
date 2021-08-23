import { PoemType } from "../models/Poem";

let poemData: PoemType[] = [];

export const PoemBackend = {
  /** returns a list of all poems */
  all: async (): Promise<PoemType[]> => {
    console.debug("fetching poems from backend");
    poemData = await PoemBackend.api("/poems");
    return poemData;
  },
  /** return a specific poem based on its id */
  get: async (id: string): Promise<PoemType | undefined> => {
    console.debug("fetching poem from backend", id);
    return await PoemBackend.api(`/poems/${id}`);
  },
  /** make a request to the backend api */
  api: async (endpoint: string, data?: object) => {
    let options: RequestInit = {
      headers: { bob: "Bobalooba" }
    };
    if (data) {
      options = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          ...options.headers,
          "Content-Type": "application/json"
        }
      };
    }
    return fetch("/api" + endpoint, options).then(res => res.json());
  }
};
