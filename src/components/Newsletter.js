import React, { useState } from "react";
import { alpha, styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import newsletter from "util/newsletter";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "white",
  },
  "& label": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});

function Newsletter(props) {
  const [subscribed, setSubscribed] = useState(false);

  const { handleSubmit, register, errors } = useForm();

  const onSubmit = ({ email }) => {
    setSubscribed(true);
    // Parent component can optionally
    // find out when subscribed.
    props.onSubscribed && props.onSubscribed();
    // Subscribe them
    newsletter.subscribe({ email });
  };

  return (
    <>
      {subscribed === false && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container={true} alignItems="center" justifyContent="center">
            <Grid item={true} xs={true}>
              <CssTextField
                variant="outlined"
                type="email"
                label="Email"
                name="email"
                error={errors.email ? true : false}
                helperText={errors.email && errors.email.message}
                fullWidth={true}
                inputRef={register({
                  required: "Please enter an email address",
                })}
                inputProps={{ style: { color: "white" } }}
              />
            </Grid>
            <Box
              display="flex"
              alignItems="stretch"
              marginLeft={2}
            >
              <Grid item={true} xs="auto">
                <Button
                  variant="contained"
                  color={props.buttonColor}
                  size="large"
                  type="submit"
                >
                  {props.buttonText}
                </Button>
              </Grid>
            </Box>
          </Grid>
        </form>
      )}

      {subscribed === true && <div>{props.subscribedMessage}</div>}
    </>
  );
}

export default Newsletter;
