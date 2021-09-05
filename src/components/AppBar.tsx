import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Jdenticon from "./Jdenticon";
import { Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    avatar: {
      marginRight: theme.spacing(2),
      verticalAlign: "middle"
    },
    title: {
      display: "inline-block",
      verticalAlign: "middle",
      textDecoration: "none !important"
    },
    spacer: {
      flexGrow: 1
    }
  })
);

export default function SearchAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Link component={RouterLink} to="/" color="inherit">
            <Jdenticon
              className={classes.avatar}
              // we are assuming that bob is the currently logged in user
              value="Bob Bobalooba"
              size={36}
            />
            <Typography variant="h6" className={classes.title} noWrap>
              Poems
            </Typography>
          </Link>
          <span className={classes.spacer} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
