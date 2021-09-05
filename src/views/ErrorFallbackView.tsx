import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import { ReactComponent as GhostIcon } from "../assets/ghost-outline.svg";

type ErrorFallbackViewProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center"
    },
    ghost: {
      height: 128,
      fill: theme.palette.grey.A400,
      width: "auto"
    },
    error: {
      color: theme.palette.error.main
    },
    button: {
      marginTop: theme.spacing(2)
    }
  })
);

const ErrorFallbackView = ({ error }: ErrorFallbackViewProps) => {
  const classes = useStyles();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className={classes.root}>
      <GhostIcon className={classes.ghost} />
      <Typography variant="h4">Something went wrong!</Typography>
      <Typography variant="h6" className={classes.error}>
        {error.message}
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        className={classes.button}
        onClick={handleRefresh}
      >
        Refresh
      </Button>
    </div>
  );
};

export default ErrorFallbackView;
