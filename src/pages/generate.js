import React from "react";
import Meta from "components/Meta";
import GenerateSection from "components/GenerateSection";

function GeneratePage(props) {
  return (
    <>
      <Meta
        title="Generate your real estate listing description"
        description="Best, affordable real estate copywriter powered by AI"
      />
      <GenerateSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Generate your listing description"
        subtitle="We'll write a detailed real estate listing description based on the information below. Focus on the key features you want in the description. This does not need to be an exhaustive list of every feature."
      />
    </>
  );
}

export default GeneratePage;
