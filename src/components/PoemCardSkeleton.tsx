import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ShareIcon from "@material-ui/icons/Share";
import { Divider } from "@material-ui/core";
import { FavoriteBorder } from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
      minWidth: 345,
      minHeight: 241,
      display: "flex",
      flexDirection: "column"
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
    content: {
      flexGrow: 1
    }
  })
);

const PoemCardSkeleton = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        title={<Skeleton />}
        titleTypographyProps={{
          classes: {
            root: classes.title
          }
        }}
        className={classes.header}
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          color="textSecondary"
          component="p"
          className={classes.text}
        >
          <Skeleton height={10} width="80%" />
          <Skeleton height={10} width="40%" />
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Skeleton variant="circle" width={38} height={38} />
        <Typography className={classes.author}>
          <Skeleton width={140} />
        </Typography>
        <div>
          <IconButton aria-label="add to favorites">
            <FavoriteBorder />
          </IconButton>
          ?<span className={classes.separator}>·</span>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </div>
      </CardActions>
    </Card>
  );
};

export default PoemCardSkeleton;
