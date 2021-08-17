import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import dog from "./dog.jpg";
import Pagination from "@material-ui/lab/Pagination";
import ParticlesBg from "particles-bg";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    marginLeft: "40%",

    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  progress: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "40vh",
  },
}));

export default function GetDetails() {
  const [posts, setPosts] = React.useState([]);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [selectedPage, setSelectedPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handlePagination = (e, page) => {
    setSelectedPage(page);
  };
  const pageCount = 4;
  useEffect(() => {
    (async function loadData() {
      setIsLoading(true);

      const res = await axios.get("/actions/posts");
      setPosts(res.data);
      setIsLoading(false);
    })();
  }, []);

  const handleOpen = (email, phone) => {
    setOpen(true);
    setEmail(email);
    setPhone(phone);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ParticlesBg type="circle" bg={true} />
      {isLoading ? (
        <div className={classes.progress}>
          <CircularProgress />
        </div>
      ) : (
        <List className={classes.root}>
          {posts

            .slice(
              pageCount * selectedPage - pageCount,
              pageCount * selectedPage
            )
            .map((post) => (
              <ListItem
                alignItems="flex-start"
                button={true}
                onClick={() => handleOpen(post.email, post.phone)}
              >
                <ListItemAvatar>
                  <Avatar alt={post.name} />
                </ListItemAvatar>
                <ListItemText
                  primary={post.name}
                  secondary={
                    <React.Fragment>
                      <div>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {post.dogWatcher
                            ? "I'm A Dog Watcher!"
                            : "I need a dog watcher!"}
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                        >
                          {post.dogWatcher
                            ? `I'm Available from ${post.startDate} to ${post.endDate}`
                            : `I need a dog watcher from ${post.startDate} to ${post.endDate}`}
                        </Typography>
                      </div>

                      <div>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                        >
                          {`I live in ${post.city}`}
                        </Typography>
                      </div>
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}{" "}
          <Modal
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div className={classes.paper}>
              <div>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {`contact info:`}
                </Typography>
              </div>
              <div>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                >
                  {`email: ${email}`}
                </Typography>
              </div>
              <div>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                >
                  {`phone number: ${phone} `}
                </Typography>
              </div>
            </div>
          </Modal>
        </List>
      )}
      {!isLoading && (
        <div style={{ marginTop: -35 }}>
          {posts.length > 0 && (
            <Pagination
              count={Math.ceil(posts.length / 4)}
              color="primary"
              onChange={handlePagination}
              page={selectedPage}
            />
          )}
        </div>
      )}
    </div>
  );
}
