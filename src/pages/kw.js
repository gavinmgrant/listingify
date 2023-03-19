import React, { useEffect } from "react";
import Meta from "components/Meta";
import AuthSection from "components/AuthSection";
import { useAuth } from "util/auth";

function KWPage() {
  const auth = useAuth();

  useEffect(() => {
    // only sign out if a user is logged in
    if (auth.user) {
      auth.signout();
    }
  }, [auth.user]);

  return (
    <>
      <Meta title="Keller Williams Promotion" />
      <AuthSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        type="signup"
        providers={["google"]}
        afterAuthPath={"/purchase/promo"}
      />
    </>
  );
}

export default KWPage;
