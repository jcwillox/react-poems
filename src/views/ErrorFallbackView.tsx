import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";

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
      color: theme.palette.grey.A400,
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
      <svg viewBox="0 0 24 24" className={classes.ghost}>
        <path
          fill="currentColor"
          d="M12 2C7.03 2 3 6.03 3 11V22L6 19L9 22L12 19L15 22L18 19L21 22V11C21 6.03 16.97 2 12 2M19 17.17L18 16.17L16.59 17.59L15 19.17L13.41 17.59L12 16.17L10.59 17.59L9 19.17L7.41 17.59L6 16.17L5 17.17V11C5 7.14 8.14 4 12 4S19 7.14 19 11V17.17M11 10C11 11.11 10.11 12 9 12S7 11.11 7 10 7.9 8 9 8 11 8.9 11 10M17 10C17 11.11 16.11 12 15 12S13 11.11 13 10 13.9 8 15 8 17 8.9 17 10Z"
        />
      </svg>
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