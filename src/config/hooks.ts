import { PoemBackend } from "./backend";
import { useEffect, useState } from "react";
import { PoemType } from "../models/Poem";

export function usePoem(id: string): PoemType | undefined {
  let defaultPoem = PoemBackend.cache.get(id);
  const [poem, setPoem] = useState(defaultPoem);

  useEffect(() => {
    PoemBackend.get(id)
      .then(poem => {
        setPoem(poem);
      })
      .catch(err => {
        // forces react to trigger error boundary
        setPoem(() => {
          throw err;
        });
      });
  }, [id]);

  return poem;
}

export function usePoems(): PoemType[] {
  let data = PoemBackend.cache.all();
  const [poems, setPoems] = useState(data);

  useEffect(() => {
    PoemBackend.all()
      .then(poems => {
        setPoems(poems);
      })
      .catch(err => {
        setPoems(() => {
          throw err;
        });
      });
  });

  return poems;
}
