import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { AuthProvider } from "util/auth";
import { ThemeProvider } from "util/theme";
import { StyledEngineProvider } from "@mui/material/styles";
import { QueryClientProvider } from "util/db";
import Meta from "components/Meta";
import * as gtag from "../lib/gtag";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider>
        <QueryClientProvider>
          <AuthProvider>
            <Meta />
            <>
              <Navbar color="default" />

              <Component {...pageProps} />

              <Footer
                bgColor="default"
                size="medium"
                bgImage=""
                bgImageOpacity={1}
                description="AI-powered real estate listing descriptions"
                copyright={`© ${new Date().getFullYear()} Listingify`}
                sticky={true}
              />
            </>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default MyApp;
