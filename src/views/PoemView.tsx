import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { Box, Breadcrumbs, Link, Paper, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Markdown from "markdown-to-jsx";
import { usePoem } from "../config/hooks";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    markdown: {
      marginTop: 8,
      minHeight: 400
    },
    title: {
      fontWeight: 300
    }
  })
);

const PoemView = () => {
  const classes = useStyles();
  let { id } = useParams<{ id: string }>();
  const poem = usePoem(id);
  console.debug("reloading PoemView component", poem, id);
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" component={RouterLink} to="/">
          Poems
        </Link>
        <Typography color="textPrimary">{poem?.author}</Typography>
      </Breadcrumbs>
      <Typography variant="h3" className={classes.title}>
        {poem?.title}
      </Typography>
      <Paper variant="outlined" className={classes.markdown}>
        <Box margin={2}>
          <Typography variant="body1" component="div">
            <Markdown>{poem?.text || ""}</Markdown>
          </Typography>
        </Box>
      </Paper>
    </div>
  );
};

export default PoemView;
