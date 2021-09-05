import Readline from "readline";
import { defaultPoems } from "../server/poems/data";
import { v4 as uuid4 } from "uuid";
import { PoemType } from "../models/Poem";

const rl = Readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const generatePoem = (title: string, author: string) => {
  let authorId = -1;
  let maxAuthorId = -1;
  for (const poem of Object.values(defaultPoems)) {
    if (poem.author === author) {
      authorId = poem.authorId;
      break;
    } else if (poem.authorId > maxAuthorId) {
      maxAuthorId = poem.authorId;
    }
  }
  if (authorId < 0) {
    authorId = ++maxAuthorId;
  }
  let poem: PoemType = {
    id: uuid4(),
    title: title,
    author: author,
    authorId: authorId,
    votes: 0,
    text: ""
  };
  console.log({ [poem.id]: poem });
};

rl.question("Title: ", function (title) {
  rl.question("Author: ", function (author) {
    generatePoem(title, author);
    rl.close();
  });
});

rl.on("close", function () {
  process.exit(0);
});
