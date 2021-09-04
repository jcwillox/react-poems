import { PoemType } from "../models/Poem";

let poemData: PoemType[] = [];

export const PoemBackend = {
  cache: {
    /** returns a list of all poems from the cache */
    all: (): PoemType[] => {
      return poemData;
    },
    get: (id: string): PoemType | undefined => {
      return poemData.find(poem => poem.id === id);
    },
    isValid: () => {
      // right now we assume the cache is valid if it has any data
      // however this function could in the future be used to expire
      // the cache after some condition
      return poemData.length > 0;
    }
  },
  /** returns a list of all poems */
  all: async (): Promise<PoemType[]> => {
    // return from cache if populated
    if (PoemBackend.cache.isValid()) {
      return poemData;
    }
    console.debug("fetching poems from backend");
    poemData = await PoemBackend.apiJSON("/poems");
    return poemData;
  },
  /** return a specific poem based on its id */
  get: async (id: string): Promise<PoemType | undefined> => {
    if (PoemBackend.cache.isValid()) {
      return poemData.find(poem => poem.id === id);
    }
    console.debug("fetching poem from backend", id);
    return PoemBackend.apiJSON(`/poems/${id}`);
  },
  /** Upvote a poem as the current user */
  upvote: async (id: string): Promise<boolean> => {
    let res = await PoemBackend.api(`/poems/upvote/${id}`, { method: "post" });
    return res.status === 200;
  },
  /** Downvote a poem as the current user */
  downvote: async (id: string): Promise<boolean> => {
    let res = await PoemBackend.api(`/poems/downvote/${id}`, {
      method: "post"
    });
    return res.status === 200;
  },
  /** make a request to the backend that returns a JSON response */
  apiJSON: async (endpoint: string, data?: object): Promise<any> => {
    let res = await PoemBackend.api(endpoint, { data });
    console.log("ResStatus", res.status);
    if (res.status !== 200) return false;
    return res.json();
  },
  /** make a request to the backend api */
  api: async (
    endpoint: string,
    { data, method }: { data?: object; method?: string }
  ) => {
    let options: RequestInit = {
      method: method || "get",
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
    return fetch("/api" + endpoint, options);
  }
};
