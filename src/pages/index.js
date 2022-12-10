import React from "react";
import Meta from "components/Meta";
import HeroSection from "components/HeroSection";
import FeaturesSection from "components/FeaturesSection";
import ClientsSection from "components/ClientsSection";
import TestimonialsSection from "components/TestimonialsSection";
import NewsletterSection from "components/NewsletterSection";
import CtaSection from "components/CtaSection";

function IndexPage(props) {
  return (
    <>
      <Meta />
      <HeroSection
        bgColor="primary"
        size="large"
        bgImage="https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=1600&h=800&q=80"
        bgImageOpacity={0.2}
        title="AI-powered real estate listing descriptions"
        subtitle="Don't waste your time writing property descriptions. Let us write it for you! Tell us a bit about the property and we'll take care of the rest, in seconds."
        buttonText="Get Started"
        buttonColor="default"
        buttonPath="/generate"
      />
      <FeaturesSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Why use Listingfy?"
        subtitle="We're here to help listing agents!"
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
        buttonColor="default"
        buttonPath="/generate"
      />
    </>
  );
}

export default IndexPage;
