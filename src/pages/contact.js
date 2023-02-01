import React from "react";
import Meta from "components/Meta";
import ContactSection from "components/ContactSection";
import CtaSection from "components/CtaSection";

function ContactPage(props) {
  return (
    <>
      <Meta title="Contact" />
      <ContactSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Contact Us"
        subtitle="Drop us an email anytime."
        buttonText="Send message"
        buttonColor="primary"
        showNameField={true}
      />
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

export default ContactPage;
