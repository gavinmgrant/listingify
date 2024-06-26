import React from "react";
import HeroSection from "components/HeroSection";
import FeaturesSection from "components/FeaturesSection";
import BewareSection from "components/BewareSection";
import CompareSection from "components/CompareSection";
import ClientsSection from "components/ClientsSection";
// import TestimonialsSection from "components/TestimonialsSection";
import NewsletterSection from "components/NewsletterSection";
import CtaSection from "components/CtaSection";
import { useTheme } from "@mui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function IndexPage(props) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <HeroSection
        bgColor="primary"
        size="large"
        bgImage="/images/kitchen.png"
        bgImageOpacity={0.3}
        title="AI-powered real estate listing descriptions"
        subtitle="Don't waste time writing property descriptions. Let us write them for you!"
        buttonText="Get Started"
        buttonColor="secondary"
        buttonPath="/generate"
        typewriter={!isSmall}
      />
      <FeaturesSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Why use Listingify?"
        subtitle="We're here to help listing agents. Try us out for free!"
      />
      <NewsletterSection
        bgColor="primary"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Stay in the know"
        subtitle="Receive product updates and promotions"
        buttonText="Subscribe"
        buttonColor="secondary"
        inputPlaceholder="Enter your email"
        subscribedMessage="Success! Now check your email to confirm your subscription."
      />
      <BewareSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title='Beware of "free" listing description generators!'
        subtitle="You get what you pay for. At listingdescription.com, a free description isn't worth your time. They are really just fishing for leads and hoping you subscribe to Agently. We don't sell subscriptions. Buy only what you need when you need it. Our detailed descriptions highlight the specific place, features, and help you actually sell the property. Just compare what we wrote vs. them."
      />
      <CompareSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Compare what we wrote vs. the typical description."
        subtitle="Using the same property address, this is what Listingify wrote compared to what was on the MLS."
      />
      <ClientsSection
        bgColor="light"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="You're in good company."
        subtitle="Agents at these brokerages have used Listingify."
      />
      {/* <TestimonialsSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Here's what people are saying"
        subtitle=""
      /> */}
      <CtaSection
        bgColor="primary"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Ready to get started?"
        subtitle=""
        buttonText="Get Started"
        buttonColor="secondary"
        buttonPath="/generate"
      />
    </>
  );
}

export default IndexPage;
