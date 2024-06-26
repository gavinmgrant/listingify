import React, { useState } from "react";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import Auth from "components/Auth";
import AuthFooter from "components/AuthFooter";
import { useDarkMode } from "util/theme";
import { useRouter } from "next/router";

function AuthSection(props) {
  const router = useRouter();
  const darkMode = useDarkMode();

  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(true);

  const handleCheckbox = () => {
    setSubscribeToNewsletter(!subscribeToNewsletter);
  };

  const isPromo = router.pathname.includes("kw");

  // Options by auth type
  const optionsByType = {
    signup: {
      // Top Title
      title: isPromo ? "Welcome KW agents!" : "Create an account",
      // Subtitle
      subtitle: isPromo ? "As a preferred brokerage, Keller Williams agents get 3 free tokens when they sign up!" : "Sign up and get a free token!",
      // Button text
      buttonAction: "Sign up",
      // Footer text and links
      showFooter: true,
      signinText: "Already have an account?",
      signinAction: "Sign in",
      signinPath: "/auth/signin",
      // Terms and privacy policy agreement
      showAgreement: true,
      termsPath: "/legal/terms-of-service",
      privacyPolicyPath: "/legal/privacy-policy",
    },
    signin: {
      title: "Welcome back",
      subtitle: "",
      buttonAction: "Sign in",
      showFooter: true,
      signupAction: "Create an account",
      signupPath: "/auth/signup",
      forgotPassAction: "Forgot Password?",
      forgotPassPath: "/auth/forgotpass",
    },
    forgotpass: {
      title: "Get a new password",
      subtitle: "",
      buttonAction: "Reset password",
      showFooter: true,
      signinText: "Remember it after all?",
      signinAction: "Sign in",
      signinPath: "/auth/signin",
    },
    changepass: {
      title: "Choose a new password",
      subtitle: "",
      buttonAction: "Change password",
    },
  };

  // Ensure we have a valid auth type
  const type = optionsByType[props.type] ? props.type : "signup";

  // Get options object for current auth type
  const options = optionsByType[type];

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container maxWidth="xs">
        <SectionHeader
          title={options.title}
          subtitle={options.subtitle || ""}
          size={4}
          textAlign="center"
        />
        <Auth
          type={type}
          buttonAction={options.buttonAction}
          providers={props.providers}
          afterAuthPath={props.afterAuthPath}
          key={type}
          subscribeToNewsletter={subscribeToNewsletter}
        />
        {type === "signup" && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginTop={2}
          >
            <FormControlLabel
              control={
                <Checkbox
                  color={darkMode.value ? "secondary" : "primary"}
                  checked={subscribeToNewsletter}
                />
              }
              label=""
              style={{ margin: "0.25rem" }}
              onChange={handleCheckbox}
            />

            <div>
              <Typography fontSize="14px">
                Subscribe for product updates and promotions
              </Typography>
              <Typography fontSize="14px">(if email provided above)</Typography>
            </div>
          </Box>
        )}

        {options.showFooter && <AuthFooter type={type} {...options} />}
      </Container>
    </Section>
  );
}

export default AuthSection;
