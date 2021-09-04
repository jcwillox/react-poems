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
import Markdown from "markdown-to-jsx";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345
    },
    title: {
      fontWeight: 300
    },
    header: {
      paddingBottom: 0
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
    }
  })
);

const PoemCard = ({ poem }: { poem: PoemType }) => {
  const classes = useStyles();

  const markdownHeading = {
    component: "span",
    props: {
      className: classes.bold
    }
  };

  const trimPoemText = (text: string) => {
    if (text.length > 80) {
      return text.substring(0, 80) + "…";
    }
    return text;
  };

  return (
    <Card className={classes.root}>
      <CardActionArea component={Link} to={"/poems/" + poem.id}>
        <CardHeader
          title={poem.title}
          titleTypographyProps={{
            classes: {
              root: classes.title
            }
          }}
          className={classes.header}
        />
        <CardContent>
          <Typography
            variant="h5"
            color="textSecondary"
            component={Markdown}
            className={classes.text}
            options={{
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
                h1: markdownHeading,
                h2: markdownHeading,
                h3: markdownHeading
              }
            }}
          >
            {trimPoemText(poem.text)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider />
      <CardActions>
        <Jdenticon value={poem.author} size={38} />
        <Typography className={classes.author}>{poem.author}</Typography>
        <div>
          <LikesButton poem={poem} />
          <span className={classes.separator}>·</span>
          <ShareButton id={poem.id} />
        </div>
      </CardActions>
    </Card>
  );
};

export default PoemCard;
