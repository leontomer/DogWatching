import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import ParticlesBg from "particles-bg";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PhoneIcon from "@material-ui/icons/Phone";
import TodayIcon from "@material-ui/icons/Today";
import InsertInvitationIcon from "@material-ui/icons/InsertInvitation";
import Button from "@material-ui/core/Button";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import axios from "axios";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

let city = "";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  progress: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "40vh",
  },
}));
const LocationSearchInput = () => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element

    setValue(e.target.value);
    city = e.target.value;
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      city = description;

      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description })
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          console.log("📍 Coordinates: ", { lat, lng });
        })
        .catch((error) => {
          console.log("😱 Error: ", error);
        });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={ref}>
      <TextField
        value={value}
        required
        onChange={handleInput}
        disabled={!ready}
        placeholder="Where do you live?"
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};

export default function PostDetails() {
  const [name, setName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [role, setRole] = React.useState("");
  const [isLoading, setIsLoading] = useState(false);

  const classes = useStyles();

  const sendDataToServer = async (e) => {
    e.preventDefault();
    //console.log(name, phoneNumber, email, startDate, endDate, city, role);
    const body = { name, startDate, endDate, email, phoneNumber, city, role };
    setIsLoading(true);
    await axios.post("/actions/saveDetails", body);
    setIsLoading(false);
  };

  return (
    <div
      style={{
        marginTop: "15px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <ParticlesBg type="square" bg={true} />
      {isLoading ? (
        <div className={classes.progress}>
          <CircularProgress />
        </div>
      ) : (
        <Card style={{ padding: "20px" }}>
          <div>
            <Typography variant="h3" gutterBottom>
              Please fill your details here:
            </Typography>
          </div>
          <form onSubmit={sendDataToServer}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Name:
              </Typography>
              <TextField
                type="text"
                name="name"
                required
                placeholder="Enter Your Name. . ."
                onChange={(name) => setName(name.target.value)}
              />
              <AccountBoxIcon />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" gutterBottom>
                From:
              </Typography>
              <TextField
                type="date"
                required
                name="startdate"
                onChange={(date) => setStartDate(date.target.value)}
              />
              <TodayIcon />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" gutterBottom>
                To:
              </Typography>
              <TextField
                type="date"
                required
                name="enddate"
                onChange={(date) => setEndDate(date.target.value)}
              />
              <InsertInvitationIcon />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Phone Number:
              </Typography>
              <TextField
                type="tel"
                name="tel"
                required
                placeholder="Enter Your Phone Number. . ."
                onChange={(num) => setPhoneNumber(num.target.value)}
              />
              <PhoneIcon />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Email:
              </Typography>
              <TextField
                type="email"
                name="email"
                required
                placeholder="Enter Your email. . ."
                onChange={(email) => setEmail(email.target.value)}
              />
              <MailOutlineIcon />
            </div>{" "}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" gutterBottom>
                City:
              </Typography>
              <LocationSearchInput />
              <LocationCityIcon />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Service:
              </Typography>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Are you a dog watcher?
                </InputLabel>
                <Select
                  labelId="select-label"
                  id="service"
                  required
                  value={role}
                  onChange={(val) => setRole(val.target.value)}
                >
                  <MenuItem value={true}>I am a dog watcher</MenuItem>
                  <MenuItem value={false}>I need a dog watcher</MenuItem>
                </Select>{" "}
              </FormControl>
              <EmojiPeopleIcon />
            </div>
            <div
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}
