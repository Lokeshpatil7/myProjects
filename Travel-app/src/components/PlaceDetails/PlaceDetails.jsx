import { formatCountdown } from "antd/lib/statistic/utils";
import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Chip,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import { Rating } from "@material-ui/lab/Rating";
import useStyles from "./styles";
export default ({ place }) => {
  const classes = useStyles();

  return (
    <>
      <Card elevation={6}>
        <CardMedia
          style={{ height: 350 }}
          image={
            place.photo
              ? place.photo.images.large.url
              : "https://www.google.com/search?q=food+images&rlz=1C1RXQR_enIN988IN988&sxsrf=APq-WBttFX3VHOUBfjHHRO3On5o3pjWItw:1643367478861&tbm=isch&source=iu&ictx=1&vet=1&fir=-R54csAHk1XTPM%252Cc1W1wgDZbrCp_M%252C_%253BKY4Ehh5UcHtCJM%252CW4es-fXnlDqXoM%252C_%253BWRoIkSNHokfRiM%252CW4es-fXnlDqXoM%252C_%253BziYmQF38NHqA4M%252CteNhXgqUnYRCrM%252C_%253Bx6fJybo97BBZQM%252CXNFQUI2vAP2A0M%252C_%253BqYQc_fW0jtrPFM%252CxUHtSlv1a_sZBM%252C_%253BEkW3I9LrOPxOcM%252CW4es-fXnlDqXoM%252C_%253BYCqgLorsmfbSHM%252CRB__2DxE3HJa8M%252C_%253BiiI2RQD-_4pCEM%252CW4es-fXnlDqXoM%252C_%253BrZVTcMo_Sv9_JM%252CtcXTKvh6gkUd0M%252C_%253BV0vMrzC8BpaszM%252CnJdGVGS09IhL_M%252C_%253BAW-lNexQ2dKQ2M%252CzazhXlEcVtQqOM%252C_%253Bp-eWTHqf_lu0bM%252Cv4byKf4hWyTpqM%252C_&usg=AI4_-kS1Ggs1YQuJ6YVIDfS6seAkCNtHCQ&sa=X&ved=2ahUKEwjw7r_2pNT1AhXhxjgGHadBC-wQ9QF6BAgFEAE#imgrc=-R54csAHk1XTPM"
          }
          title={place.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {place.name}
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Price</Typography>
            <Typography gutterBottom variant="subtitle1">
              {place.price_level}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Ranking</Typography>
            <Typography gutterBottom variant="subtitle1">
              {place.ranking}
            </Typography>
          </Box>
          {place?.awards?.map((award) => (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              my={1}
            >
              <img src={award.images.small} alt={award.display_name} />
              <Typography variant="subtitle2" color="textSecondary">
                {award.display_name}
              </Typography>
            </Box>
          ))}
          {place?.cuisine?.map(({ name }) => {
            <Chip
              key={name}
              sixe="small"
              label={name}
              className={classes.chip}
            />;
          })}
          {place?.address && (
            <Typography
              gutterBottom
              variant="subtitle2"
              color="textSecondary"
              className={classes.subtitle}
            >
              <LocationOnIcon /> {place.address}
            </Typography>
          )}
          {place?.phone && (
            <Typography
              gutterBottom
              variant="subtitle2"
              color="textSecondary"
              className={classes.spacing}
            >
              <PhoneIcon /> {place.phone}
            </Typography>
          )}
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => {
                window.open(place.web_url, "_blank");
              }}
            >
              Trip Advisor
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => {
                window.open(place.website, "_blank");
              }}
            >
              Website
            </Button>
          </CardActions>
        </CardContent>
      </Card>
      {/* <h1>{place.name}</h1> */}
    </>
  );
};
