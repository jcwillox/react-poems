import React, { useEffect, useState } from "react";
import { PoemType } from "../models/Poem";
import IconButton from "@material-ui/core/IconButton";
import { PoemBackend } from "../config/backend";
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon
} from "@material-ui/icons";
import { useSnackbar } from "notistack";

type LikesButtonProps = {
  poem?: PoemType;
};

const LikesButton = ({ poem }: LikesButtonProps) => {
  const [liked, setLiked] = useState(poem?.liked);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLiked(poem?.liked);
  }, [poem]);

  const changeLiked = (state: boolean) => {
    if (poem === undefined) return;
    poem.liked = state;
    if (state) {
      poem.votes++;
    } else {
      poem.votes--;
    }
    setLiked(state);
  };

  const handleClick = () => {
    if (poem === undefined) return;
    if (poem.liked) {
      // optimistically set the liked state
      changeLiked(false);
      PoemBackend.downvote(poem.id).catch(err => {
        // reset liked state if the request fails
        changeLiked(true);
        enqueueSnackbar("Error while downvoting poem: " + err, {
          variant: "error"
        });
      });
    } else {
      changeLiked(true);
      PoemBackend.upvote(poem.id).catch(err => {
        changeLiked(false);
        enqueueSnackbar("Error while upvoting poem: " + err, {
          variant: "error"
        });
      });
    }
  };

  return (
    <React.Fragment>
      <IconButton aria-label="add to favorites" onClick={handleClick}>
        {liked ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon />}
      </IconButton>
      {poem !== undefined ? poem.votes : "?"}
    </React.Fragment>
  );
};

export default LikesButton;
