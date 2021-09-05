import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  CircularProgress,
  IconButton,
  Paper,
  Tooltip,
  Typography
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import Markdown from "markdown-to-jsx";
import { NewPoemType } from "../models/Poem";
import { PoemBackend } from "../config/backend";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column"
    },
    header: {
      display: "flex",
      alignItems: "flex-end"
    },
    title: {
      border: "none",
      outline: "none",
      color: theme.palette.text.primary,
      fontWeight: 300,
      backgroundColor: "transparent",
      flexGrow: 1
    },
    markdown: {
      height: "100%",
      marginTop: 4,
      marginBottom: 0,
      minHeight: 400,
      flexGrow: 1,
      [theme.breakpoints.up("md")]: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(3)
      }
    },
    poem: {
      width: "100%",
      height: "100%",
      resize: "none",
      minHeight: 400,
      border: "none",
      outline: "none",
      color: theme.palette.text.primary,
      padding: theme.spacing(2),
      overflowY: "auto"
    },
    progress: {
      padding: 3,
      height: 30,
      width: 30
    }
  })
);

const NewPoemView = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [editMode, setEditMode] = useState(true);
  const [saving, setSaving] = useState(false);
  const [poem, setPoem] = useState<NewPoemType>({
    title: "",
    author: "Bob Bobalooba",
    authorId: 0,
    text: ""
  });

  const handleChange = (key: string) => (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPoem({ ...poem, [key]: event.target.value });
    console.log("Poem", poem);
  };

  const changeEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    // check form filled
    setSaving(true);
    PoemBackend.add(poem)
      .then(res => {
        console.log("saved new poem", res);
        enqueueSnackbar("Saved!", {
          variant: "success"
        });
        history.replace(`/poems/${res.id}`);
      })
      .catch(err => {
        console.log("error saving poem", err);
        enqueueSnackbar("Failed saving poem: " + err, { variant: "error" });
        setSaving(false);
      });
  };

  return (
    <React.Fragment>
      <div className={classes.header}>
        <Typography
          variant="h3"
          className={classes.title}
          component="input"
          placeholder="Title"
          value={poem.title}
          size={1}
          onChange={handleChange("title")}
        />
        <div>
          <div>
            <Tooltip title={saving ? "Saving!" : "Save"} placement="left">
              {saving ? (
                <div className={classes.progress}>
                  <CircularProgress size={24} color="secondary" />
                </div>
              ) : (
                <span>
                  <IconButton
                    size="small"
                    onClick={handleSave}
                    disabled={!(poem.title && poem.text)}
                  >
                    <SaveIcon />
                  </IconButton>
                </span>
              )}
            </Tooltip>
          </div>
          <div>
            <Tooltip title={editMode ? "Preview" : "Edit"} placement="left">
              <span>
                <IconButton
                  size="small"
                  onClick={changeEditMode}
                  disabled={poem.text.length === 0}
                >
                  {editMode ? <VisibilityIcon /> : <EditIcon />}
                </IconButton>
              </span>
            </Tooltip>
          </div>
        </div>
      </div>
      <Paper variant="outlined" className={classes.markdown}>
        {editMode ? (
          <Typography
            variant="body1"
            className={classes.poem}
            component="textarea"
            placeholder="Poem"
            value={poem.text}
            onChange={handleChange("text")}
          />
        ) : (
          <Typography variant="body1" component="div" className={classes.poem}>
            <Markdown>{poem.text}</Markdown>
          </Typography>
        )}
      </Paper>
    </React.Fragment>
  );
};

export default NewPoemView;
