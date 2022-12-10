import React from "react";
import Meta from "components/Meta";
import GenerateSection from "components/GenerateSection";

function GeneratePage(props) {
  return (
    <>
      <Meta title="Generate Listing Description" />
      <GenerateSection 
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Generate your listing description"
        subtitle="We'll write a detailed real estate listing description based on the information below."
      />
    </>
  );
}

export default GeneratePage;
