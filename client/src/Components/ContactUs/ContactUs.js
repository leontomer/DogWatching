import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import ParticlesBg from "particles-bg";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Grid } from "@material-ui/core";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    card: {
      margin: "0 auto",
      marginTop: "50px",
      minWidth: "50%",
      maxWidth: "600px",
    },
    progress: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "40vh",
    },
  })
);
export default function ContactUs() {
  const classes = useStyles();
  const [text, setText] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { name, email, text };
    setIsLoading(true);
    await axios.post("/actions/contact", body);
    setIsLoading(false);
  };

  return (
    <div style={{ marginTop: 10 }}>
      <ParticlesBg type="ball" bg={true} />

      {isLoading ? (
        <div className={classes.progress}>
          <CircularProgress />
        </div>
      ) : (
        <Container fixed>
          <Card className={classes.card}>
            <Grid>
              <Grid item xs>
                <div style={{ textAlign: "center" }}>
                  <Typography variant="h4" gutterBottom>
                    Contact us
                  </Typography>
                </div>
              </Grid>
              <form
                className={classes.root}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <div>
                  <TextField
                    style={{ marginLeft: "10%" }}
                    inputProps={{
                      min: 0,
                    }}
                    id="outlined-multiline-static"
                    multiline
                    variant="outlined"
                    label={"Name"}
                    value={name}
                    onChange={(name) => setName(name.target.value)}
                  />
                  <TextField
                    style={{ marginLeft: "10%" }}
                    inputProps={{
                      min: 0,
                    }}
                    id="outlined-multiline-static"
                    multiline
                    variant="outlined"
                    label={"Email"}
                    value={email}
                    onChange={(email) => setEmail(email.target.value)}
                  />
                  <TextField
                    style={{ width: "80%", height: "150px", marginLeft: "10%" }}
                    inputProps={{
                      min: 0,
                    }}
                    id="outlined-multiline-static"
                    multiline
                    rows={8}
                    variant="outlined"
                    label={"Tell us anything..."}
                    value={text}
                    onChange={handleChange}
                  />
                  <div
                    style={{
                      marginLeft: "75%",
                      marginTop: "100px",
                    }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Send
                    </Button>{" "}
                  </div>
                </div>{" "}
              </form>
            </Grid>
          </Card>
        </Container>
      )}
    </div>
  );
}
