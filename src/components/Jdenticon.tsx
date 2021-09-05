import React, { useEffect, useRef } from "react";
import jdenticon from "jdenticon/standalone";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

type JdenticonProps = {
  value: string;
  size: number;
  className?: string | undefined;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: 4,
      margin: 2
    }
  })
);

const Jdenticon = ({ value, size = 24, className }: JdenticonProps) => {
  const classes = useStyles();
  const icon = useRef(null);
  const mixedClassName = className
    ? `${className} ${classes.root}`
    : classes.root;

  useEffect(() => {
    jdenticon.update(icon.current || "", value);
  }, [value]);

  return (
    <svg
      data-jdenticon-value={value}
      className={mixedClassName}
      style={{ minWidth: size, minHeight: size }}
      height={size}
      width={size}
      ref={icon}
    />
  );
};

export default Jdenticon;
