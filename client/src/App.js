import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";

import logo from "./logo.svg";
import "./App.css";
import HomePage from "./Components/HomePage/HomePage";
import PostDetails from "./Components/postDetails/PostDetails";
import GetDetails from "./Components/GetDetails/GetDetails";
import ContactUs from "./Components/ContactUs/ContactUs";
function App() {
  //   useEffect(() => {
  //     (function async() {})();
  //   }, []);

  return (
    <Router>
      <Navbar />

      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/PostDetails" exact component={PostDetails} />
        <Route path="/GetDetails" exact component={GetDetails} />
        <Route path="/contactUs" exact component={ContactUs} />
      </Switch>
    </Router>
  );
  {
    /* <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </Router> */
  }
}

export default App;
