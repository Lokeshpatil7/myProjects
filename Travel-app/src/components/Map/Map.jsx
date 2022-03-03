import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutLinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab";

import useStyles from "./styles";
export default ({ setCoordinates, setBounds, coordinates, places }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("min-width:600px");

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapppURLKeys={{ key: "AIzaSyBsy6a5ZnqBg0QJM_6WmnSLPXjtklrClss" }}
        defaultCrnter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={""}
        onChange={(event) => {
          console.log(event);
          setCoordinates({ lat: event.center.lat, lng: event.center.lng });
          setBounds({ ne: event.marginBounds.ne, sw: event.marginBounds.sw });
        }}
        // onChildClick={""}
      >
        {places?.map((place, i) => (
          <div
            className={classes.mapContainer}
            lat={Number(place.latitude)}
            lang={Number(place.longitude)}
            key={i}
          >
            {isDesktop ? (
              <LocationOnOutLinedIcon color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography
                  className={classes.typography}
                  varient="subtitle2"
                  gutterBottom
                >
                  {place.name}
                </Typography>
                <img
                  className={classes.pointer}
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : "https://www.google.com/search?q=food+images&rlz=1C1RXQR_enIN988IN988&sxsrf=APq-WBttFX3VHOUBfjHHRO3On5o3pjWItw:1643367478861&tbm=isch&source=iu&ictx=1&vet=1&fir=-R54csAHk1XTPM%252Cc1W1wgDZbrCp_M%252C_%253BKY4Ehh5UcHtCJM%252CW4es-fXnlDqXoM%252C_%253BWRoIkSNHokfRiM%252CW4es-fXnlDqXoM%252C_%253BziYmQF38NHqA4M%252CteNhXgqUnYRCrM%252C_%253Bx6fJybo97BBZQM%252CXNFQUI2vAP2A0M%252C_%253BqYQc_fW0jtrPFM%252CxUHtSlv1a_sZBM%252C_%253BEkW3I9LrOPxOcM%252CW4es-fXnlDqXoM%252C_%253BYCqgLorsmfbSHM%252CRB__2DxE3HJa8M%252C_%253BiiI2RQD-_4pCEM%252CW4es-fXnlDqXoM%252C_%253BrZVTcMo_Sv9_JM%252CtcXTKvh6gkUd0M%252C_%253BV0vMrzC8BpaszM%252CnJdGVGS09IhL_M%252C_%253BAW-lNexQ2dKQ2M%252CzazhXlEcVtQqOM%252C_%253Bp-eWTHqf_lu0bM%252Cv4byKf4hWyTpqM%252C_&usg=AI4_-kS1Ggs1YQuJ6YVIDfS6seAkCNtHCQ&sa=X&ved=2ahUKEwjw7r_2pNT1AhXhxjgGHadBC-wQ9QF6BAgFEAE#imgrc=-R54csAHk1XTPM"
                  }
                  alt={place.name}
                />
              </Paper>
            )}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};
