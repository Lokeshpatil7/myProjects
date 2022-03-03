import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import "./App.css";
import { CssBaseline, Grid } from "@material-ui/core";
import { getPlacesData } from "./api";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

function App() {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []); // to get user coordinates
  useEffect(() => {
    getPlacesData(
      bounds && bounds.sw ? bounds.sw : "",
      bounds && bounds.ne ? bounds.ne : ""
    ).then((data) => {
      setPlaces(data);
    });
  }, [coordinates, bounds]); //to reoad coordinates
  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List places={places} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            // places={places}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
