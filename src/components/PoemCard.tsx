import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { PoemType } from "../models/Poem";
import Jdenticon from "./Jdenticon";
import { CardActionArea, Divider } from "@material-ui/core";
import { Link } from "react-router-dom";
import LikesButton from "./LikesButton";
import ShareButton from "./ShareButton";
import Markdown, { MarkdownToJSX } from "markdown-to-jsx";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 345,
      height: 241
    },
    title: {
      fontWeight: 300
    },
    header: {
      display: "block",
      paddingBottom: 0
    },
    content: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      height: "8.002rem",
      "&::after": {
        content: '""',
        position: "absolute",
        bottom: 0,
        right: 0,
        width: "100%",
        height: "1.5em",
        background:
          "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, .75) 100%)"
      }
    },
    text: {
      fontWeight: 700
    },
    author: {
      flexGrow: 1
    },
    separator: {
      marginLeft: theme.spacing(1)
    },
    underline: {
      textDecoration: "underline"
    },
    bold: {
      fontWeight: 800
    },
    pre: {
      whiteSpace: "pre-wrap",
      margin: 0
    },
    actions: {
      whiteSpace: "nowrap"
    }
  })
);

const PoemCard = ({ poem }: { poem: PoemType }) => {
  const classes = useStyles();

  const markdownHeading: MarkdownToJSX.Override = {
    component: "span",
    props: {
      className: classes.bold
    }
  };

  const markdownOptions: MarkdownToJSX.Options = {
    forceWrapper: true,
    overrides: {
      a: {
        component: "span",
        props: {
          className: classes.underline
        }
      },
      strong: {
        props: {
          className: classes.bold
        }
      },
      p: {
        component: "span"
      },
      pre: {
        props: {
          className: classes.pre
        }
      },
      h1: markdownHeading,
      h2: markdownHeading,
      h3: markdownHeading
    }
  };

  return (
    <Card className={classes.root}>
      <CardActionArea component={Link} to={"/poems/" + poem.id}>
        <CardHeader
          title={poem.title}
          titleTypographyProps={{
            classes: {
              root: classes.title
            },
            noWrap: true
          }}
          className={classes.header}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="body1"
            color="textSecondary"
            component={Markdown}
            className={classes.text}
            options={markdownOptions}
          >
            {poem.text}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider />
      <CardActions>
        <Jdenticon value={poem.author} size={38} />
        <Typography className={classes.author} noWrap>
          {poem.author}
        </Typography>
        <div className={classes.actions}>
          <LikesButton poem={poem} />
          <span className={classes.separator}>·</span>
          <ShareButton id={poem.id} />
        </div>
      </CardActions>
    </Card>
  );
};

export default PoemCard;
