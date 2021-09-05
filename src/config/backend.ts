import { NewPoemType, PoemType } from "../models/Poem";

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
  upvote: async (id: string): Promise<Response> => {
    return PoemBackend.api(`/poems/upvote/${id}`, { method: "post" });
  },
  /** Downvote a poem as the current user */
  downvote: async (id: string): Promise<Response> => {
    return PoemBackend.api(`/poems/downvote/${id}`, {
      method: "post"
    });
  },
  /** Save a new poem */
  add: async (poem: NewPoemType): Promise<PoemType> => {
    let newPoem = await PoemBackend.apiJSON(`/poems`, poem);
    if (PoemBackend.cache.isValid()) {
      poemData.push(newPoem);
    }
    return newPoem;
  },
  /** make a request to the backend that returns a JSON response */
  apiJSON: (endpoint: string, data?: object): Promise<any> => {
    return PoemBackend.api(endpoint, { data }).then(res => res.json());
  },
  /** make a request to the backend api */
  api: async (
    endpoint: string,
    { data, method }: { data?: object; method?: string }
  ): Promise<Response> => {
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
    let res = await fetch("/api" + endpoint, options);
    if (!res.ok) {
      throw new Error(`(${res.status}) ${res.statusText}`);
    }
    return res;
  }
};
