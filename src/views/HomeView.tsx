import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import PoemCard from "../components/PoemCard";
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
      {poems.map(poem => (
        <Grid item key={poem.id}>
          <PoemCard poem={poem} />
        </Grid>
      ))}
    </Grid>
  );
};

export default HomeView;
