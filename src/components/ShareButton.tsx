import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Done as DoneIcon } from "@material-ui/icons";
import { IconButton, Tooltip } from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import { useDebouncedCallback } from "use-debounce";
import clipboardCopy from "clipboard-copy";

type ShareButtonProps = {
  id?: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tick: {
      color: theme.palette.success.main
    }
  })
);

const ShareButton = ({ id }: ShareButtonProps) => {
  const classes = useStyles();
  const [clicked, setClicked] = useState(false);
  const resetState = useDebouncedCallback(() => {
    setClicked(false);
  }, 1000);

  const handleClick = async () => {
    if (!id) return;
    await clipboardCopy(window.location.origin + "/poems/" + id);
    setClicked(true);
    resetState();
  };

  return (
    <Tooltip
      title="Copied link to clipboard!"
      open={clicked}
      PopperProps={{
        disablePortal: true
      }}
      disableFocusListener
      disableHoverListener
      disableTouchListener
      arrow
    >
      <IconButton aria-label="share" onClick={handleClick}>
        {clicked ? <DoneIcon className={classes.tick} /> : <ShareIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ShareButton;
