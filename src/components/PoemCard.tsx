import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ShareIcon from "@material-ui/icons/Share";
import { PoemType } from "../models/Poem";
import Jdenticon from "./Jdenticon";
import { CardActionArea, Divider } from "@material-ui/core";
import { FavoriteBorder } from "@material-ui/icons";
import { Link } from "react-router-dom";

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
    }
  })
);

const PoemCard = ({ poem }: { poem: PoemType }) => {
  const classes = useStyles();

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
            component="p"
            className={classes.text}
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
          <IconButton aria-label="add to favorites">
            <FavoriteBorder />
          </IconButton>
          {poem.votes}
          <span className={classes.separator}>·</span>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </div>
      </CardActions>
    </Card>
  );
};

export default PoemCard;
