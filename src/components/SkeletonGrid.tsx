import React, { ReactNode } from "react";
import { Grid } from "@material-ui/core";

type SkeletonGridProps = {
  count: number;
  children: ReactNode;
};

const SkeletonGrid = ({ count, children }: SkeletonGridProps) => {
  let items = [];
  for (let i = 0; i < count; i++) {
    items.push(
      <Grid item key={i}>
        {children}
      </Grid>
    );
  }

  return <React.Fragment>{items}</React.Fragment>;
};

export default SkeletonGrid;
