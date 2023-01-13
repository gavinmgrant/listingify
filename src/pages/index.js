import React from "react";
import HeroSection from "components/HeroSection";
import FeaturesSection from "components/FeaturesSection";
import CompareSection from "components/CompareSection";
// import ClientsSection from "components/ClientsSection";
// import TestimonialsSection from "components/TestimonialsSection";
// import NewsletterSection from "components/NewsletterSection";
import CtaSection from "components/CtaSection";

function IndexPage(props) {
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
        typewriter
      />
      <FeaturesSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Why use Listingify?"
        subtitle="We're here to help listing agents. Try us out for free!"
      />
      <CompareSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Compare what we wrote vs. the typical description."
        subtitle="Using the same property address, this is what Listingify wrote compared to what was on the MLS."
      />
      {/* <ClientsSection
        bgColor="light"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="You're in good company"
        subtitle=""
      /> */}
      {/* <TestimonialsSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Here's what people are saying"
        subtitle=""
      /> */}
      {/* <NewsletterSection
        bgColor="light"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Stay in the know"
        subtitle="Receive our latest articles and feature updates"
        buttonText="Subscribe"
        buttonColor="primary"
        inputPlaceholder="Enter your email"
        subscribedMessage="You are now subscribed!"
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
