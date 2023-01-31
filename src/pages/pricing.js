import React from "react";
import Meta from "components/Meta";
import PricingSection from "components/PricingSection";
import { useAuth } from "util/auth";

function PricingPage(props) {
  const auth = useAuth();
  const isUser = !!auth.user;

  return (
    <>
      <Meta title={isUser ? "Buy More Tokens" : "Pricing"} />
      <PricingSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title={isUser ? "Buy More Tokens" : "Pricing"}
        subtitle="Select how many tokens you'd like to buy. 1 token generates 1 real estate listing description."
      />
    </>
  );
}

export default PricingPage;
