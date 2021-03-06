import React from "react";
import { Grid } from "@material-ui/core";
import PoemCard from "../components/PoemCard";
import PoemCardSkeleton from "../components/PoemCardSkeleton";
import { usePoems } from "../config/hooks";
import SkeletonGrid from "../components/SkeletonGrid";
import { withErrorBoundary } from "react-error-boundary";
import ErrorFallbackView from "./ErrorFallbackView";

const HomeView = () => {
  const poems = usePoems();
  console.debug("reloading HomeView component", poems);
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={3}
    >
      {poems.length ? (
        poems
          .sort((a, b) => b.votes - a.votes)
          .map(poem => (
            <Grid item key={poem.id}>
              <PoemCard poem={poem} />
            </Grid>
          ))
      ) : (
        <SkeletonGrid count={4}>
          <PoemCardSkeleton />
        </SkeletonGrid>
      )}
    </Grid>
  );
};

export default withErrorBoundary(HomeView, {
  FallbackComponent: ErrorFallbackView
});
