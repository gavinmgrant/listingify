import React, { useEffect, useState } from "react";
import Alert from "@mui/lab/Alert";
import { useRouter } from "next/router";
import Meta from "components/Meta";
import PageLoader from "components/PageLoader";
import { requireAuth } from "util/auth";
import { redirectToCheckout } from "util/stripe";

function PurchasePage(props) {
  const router = useRouter();
  const [formAlert, setFormAlert] = useState();

  useEffect(() => {
    redirectToCheckout(router.query.plan)
      .catch((error) => {
        if (router.query.plan !== "1" && router.query.plan !== "promo") {
          setFormAlert({
            type: "error",
            message: error.message,
          });
        }
      })
      .finally(() => router.push("/generate"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Meta title="Purchase" />
      <PageLoader>
        {formAlert && (
          <Alert severity={formAlert.type} style={{ maxWidth: "500px" }}>
            {formAlert.message}
          </Alert>
        )}
      </PageLoader>
    </>
  );
}

export default requireAuth(PurchasePage);
