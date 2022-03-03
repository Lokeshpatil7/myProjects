import React, { useState } from "react";
import {
  CircularProgress,
  Grid,
  Topography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Typography,
} from "@material-ui/core";
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import useStyles from "./styles";
export default ({ places }) => {
  console.log("fdsfeffew", places);
  const classes = useStyles();
  const [type, setType] = useState("restaurents");
  const [rating, setRating] = useState("");
  return (
    <>
      <div className={classes.container}>
        <Typography variant="h4">
          Restaurents,Hotels & Attractions arund you
        </Typography>
        <FormControl className={classes.formControl}>
          <InputLabel>Type</InputLabel>
          <Select
            value={type}
            onChange={(event) => setType(event.target.value)}
          >
            <MenuItem value="restaurents">Restaurents</MenuItem>
            <MenuItem value="hotels">Hotels</MenuItem>
            <MenuItem value="attractions">Attractions</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Rating</InputLabel>
          <Select
            value={rating}
            onChange={(event) => setRating(event.target.value)}
          >
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value={3}>Above 3.0</MenuItem>
            <MenuItem value={4}>Above 4.0</MenuItem>
            <MenuItem value={4.5}>Above 4.5</MenuItem>
          </Select>
        </FormControl>

        <Grid container spacing={3} className={classes.list}>
          {places?.map((place, i) => (
            <Grid item key={i} xs={12}>
              <PlaceDetails place={place} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};
