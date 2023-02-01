import React from "react";
import Meta from "components/Meta";
import FaqSection from "components/FaqSection";
import CtaSection from "components/CtaSection";

function FaqPage(props) {
  return (
    <>
      <Meta title="FAQ" />
      <FaqSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Frequently Asked Questions"
        subtitle=""
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

export default FaqPage;
