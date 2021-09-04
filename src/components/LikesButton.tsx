import React, { useEffect, useState } from "react";
import { PoemType } from "../models/Poem";
import IconButton from "@material-ui/core/IconButton";
import { PoemBackend } from "../config/backend";
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon
} from "@material-ui/icons";

type LikesButtonProps = {
  poem?: PoemType;
};

const LikesButton = ({ poem }: LikesButtonProps) => {
  const [liked, setLiked] = useState(poem?.liked);

  useEffect(() => {
    setLiked(poem?.liked);
  }, [poem]);

  const handleClick = () => {
    if (!poem) return;
    poem.liked = !liked;
    setLiked(poem.liked);
    if (poem.liked) {
      PoemBackend.upvote(poem.id);
      poem.votes++;
    } else {
      PoemBackend.downvote(poem.id);
      poem.votes--;
    }
  };

  return (
    <React.Fragment>
      <IconButton aria-label="add to favorites" onClick={handleClick}>
        {liked ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon />}
      </IconButton>
      {poem?.votes || "?"}
    </React.Fragment>
  );
};

export default LikesButton;
