import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  // Style nested HTML elements so that
  // long-form content doesn't have to use
  // components to match MUI style
  root: {
    ...theme.typography.body1,
    "& h1": {
      ...theme.typography.h4,
      fontWeight: "bold",
    },
    "& h2": {
      ...theme.typography.h5,
      fontWeight: "bold",
    },
    "& h3": {
      ...theme.typography.h6,
      fontWeight: "bold",
    },
    "& a": {
      color: theme.palette.primary.main,
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
}));

function LongContent(props) {
  const classes = useStyles();

  return <div className={classes.root}>{props.children}</div>;
}

export default LongContent;
