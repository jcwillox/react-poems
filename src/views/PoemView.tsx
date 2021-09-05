import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { Box, Breadcrumbs, Link, Paper, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Markdown, { MarkdownToJSX } from "markdown-to-jsx";
import { usePoem } from "../config/hooks";
import LikesButton from "../components/LikesButton";
import ShareButton from "../components/ShareButton";
import { Skeleton } from "@material-ui/lab";
import { withErrorBoundary } from "react-error-boundary";
import ErrorFallbackView from "./ErrorFallbackView";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    markdown: {
      marginTop: 8,
      minHeight: 400,
      marginBottom: theme.spacing(1),
      [theme.breakpoints.up("md")]: {
        marginBottom: theme.spacing(3)
      },
      overflowX: "auto"
    },
    title: {
      fontWeight: 300,
      textAlign: "center",
      marginTop: theme.spacing(1)
    },
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end",
      flexWrap: "wrap"
    },
    separator: {
      marginLeft: theme.spacing(1)
    },
    actions: {
      marginTop: theme.spacing(1),
      whiteSpace: "nowrap",
      textAlign: "right",
      flexGrow: 1
    },
    pre: {
      whiteSpace: "pre-wrap"
    }
  })
);

const PoemView = () => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const poem = usePoem(id);

  const markdownOptions: MarkdownToJSX.Options = {
    overrides: {
      pre: {
        props: {
          className: classes.pre
        }
      }
    }
  };

  console.debug("reloading PoemView component", poem, id);
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" component={RouterLink} to="/">
          Poems
        </Link>
        <Typography color="textPrimary">{poem?.author}</Typography>
      </Breadcrumbs>
      <div className={classes.container}>
        <Typography variant="h3" className={classes.title}>
          {poem?.title || <Skeleton width={256} />}
        </Typography>
        <div className={classes.actions}>
          <LikesButton poem={poem} />
          <span className={classes.separator}>·</span>
          <ShareButton id={poem?.id} />
        </div>
      </div>

      <Paper variant="outlined" className={classes.markdown}>
        <Box margin={2}>
          <Typography variant="body1" component="div">
            <Markdown options={markdownOptions}>{poem?.text || ""}</Markdown>
          </Typography>
        </Box>
      </Paper>
    </div>
  );
};

export default withErrorBoundary(PoemView, {
  FallbackComponent: ErrorFallbackView
});
