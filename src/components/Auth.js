import React, { useState } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/lab/Alert";
import { useRouter } from "next/router";
import AuthForm from "components/AuthForm";
import AuthSocial from "components/AuthSocial";

function Auth(props) {
  const router = useRouter();
  const [formAlert, setFormAlert] = useState(null);

  const handleAuth = (user) => {
    router.push(props.afterAuthPath);
  };

  const handleFormAlert = (data) => {
    setFormAlert(data);
  };

  return (
    <>
      {formAlert && (
        <Box mb={3}>
          <Alert severity={formAlert.type}>{formAlert.message}</Alert>
        </Box>
      )}

      <AuthForm
        type={props.type}
        buttonAction={props.buttonAction}
        onAuth={handleAuth}
        onFormAlert={handleFormAlert}
        subscribeToNewsletter={props.subscribeToNewsletter}
      />

      {["signup", "signin"].includes(props.type) && (
        <>
          {props.providers && props.providers.length && (
            <>
              <Box textAlign="center" fontSize={12} my={2}>
                OR
              </Box>
              <AuthSocial
                buttonAction={props.buttonAction}
                providers={props.providers}
                showLastUsed={true}
                onAuth={handleAuth}
                onError={(message) => {
                  handleFormAlert({
                    type: "error",
                    message: message,
                  });
                }}
                subscribeToNewsletter={props.subscribeToNewsletter}
              />
            </>
          )}
        </>
      )}
    </>
  );
}

export default Auth;
