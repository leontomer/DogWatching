import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import ParticlesBg from "particles-bg";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  card: {
    marginTop: "100px",

    display: "flex",
    justifyContent: "center",
  },
  card2: {
    marginTop: "100px",

    display: "flex",
    justifyContent: "center",
  },
});

export default function HomePage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ParticlesBg type="circle" bg={true} />

      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Welcome to Dog Watcher!{" "}
          </Typography>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Here you will be able to see dog watcher's info, contact them, and
            more!
          </Typography>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            also, as a dog watcher you will be able to publish your own details.
          </Typography>{" "}
        </CardContent>
      </Card>

      <Card className={classes.card2}>
        <CardContent>
          <img
            src="https://www.dogtime.com/assets/uploads/2012/05/dog-walker-e1545519246579.jpg"
            width="430"
            height="230"
          ></img>
        </CardContent>
      </Card>
    </div>
  );
}
