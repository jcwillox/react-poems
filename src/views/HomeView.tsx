import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import PoemCard from "../components/PoemCard";
import PoemCardSkeleton from "../components/PoemCardSkeleton";
import SkeletonGrid from "../components/SkeletonGrid";
import { PoemType } from "../models/Poem";

const HomeView = () => {
  const [poems, setPoems] = useState<PoemType[]>([]);
  const fetchPoems = async () => {
    let result = await fetch("/api/poems", {
      headers: { bob: "Bobalooba" }
    }).then(res => res.json());
    console.log("poems", result);
    setPoems(result);
  };

  useEffect(() => {
    fetchPoems();
  }, []);

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={3}
    >
      {poems.length ? (
        poems.map(poem => (
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

export default HomeView;
