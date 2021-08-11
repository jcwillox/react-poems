import React, { useEffect, useRef } from "react";
import jdenticon from "jdenticon/standalone";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "inline-flex",
      borderRadius: 4,
      padding: 2,
      color: "white"
    }
  })
);

const Jdenticon = ({ value, size = 24 }: { value: string; size: number }) => {
  const classes = useStyles();
  const icon = useRef(null);

  useEffect(() => {
    jdenticon.update(icon.current || "", value);
  }, [value]);

  return (
    <div className={classes.root}>
      <svg data-jdenticon-value={value} height={size} ref={icon} width={size} />
    </div>
  );
};

export default Jdenticon;
