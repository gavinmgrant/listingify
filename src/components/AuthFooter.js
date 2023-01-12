import React from "react";
import Box from "@mui/material/Box";
import Link from "next/link";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: "0.9rem",
    textAlign: "center",
    marginTop: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  spacerSmall: {
    display: "inline-block",
    width: theme.spacing(1),
  },
  spacerMedium: {
    display: "inline-block",
    width: theme.spacing(2),
  },
  legal: {
    fontSize: "14px",
    opacity: 0.8,
    "& a": {
      color: "inherit",
    },
  },
}));

function AuthFooter(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.type === "signup" && (
        <>
          {props.showAgreement && (
            <Box mb={2} className={classes.legal}>
              By signing up, you are agreeing to our{" "}
              <Link href={props.termsPath} passHref={true}>
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href={props.privacyPolicyPath} passHref={true}>
                Privacy Policy
              </Link>
              .
            </Box>
          )}
          <Box className={classes.legal}>
            {props.signinText}
            <span className={classes.spacerSmall} />
            <Link href={props.signinPath} passHref={true}>
              {props.signinAction}
            </Link>
          </Box>
        </>
      )}

      {props.type === "signin" && (
        <Box className={classes.legal}>
          <Link href={props.signupPath} passHref={true}>
            {props.signupAction}
          </Link>

          {props.forgotPassAction && (
            <>
              <span className={classes.spacerMedium} />
              <Link href={props.forgotPassPath} passHref={true}>
                {props.forgotPassAction}
              </Link>
            </>
          )}
        </Box>
      )}

      {props.type === "forgotpass" && (
        <Box className={classes.legal}>
          {props.signinText}
          <span className={classes.spacerSmall} />
          <Link href={props.signinPath} passHref={true}>
            {props.signinAction}
          </Link>
        </Box>
      )}
    </div>
  );
}

export default AuthFooter;
