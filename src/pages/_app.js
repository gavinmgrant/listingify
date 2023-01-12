import React from "react";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import "util/analytics";
// import Chat from "components/Chat";
import { AuthProvider } from "util/auth";
import { ThemeProvider } from "util/theme";
import { StyledEngineProvider } from "@mui/material/styles";
import { QueryClientProvider } from "util/db";
import Meta from "components/Meta";

function MyApp({ Component, pageProps }) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider>
        <QueryClientProvider>
          <AuthProvider>
            <Meta />
            {/* <Chat /> */}
            <>
              <Navbar
                color="default"
                logo="https://uploads.divjoy.com/logo.svg"
                logoInverted="https://uploads.divjoy.com/logo-white.svg"
              />

              <Component {...pageProps} />

              <Footer
                bgColor="default"
                size="medium"
                bgImage=""
                bgImageOpacity={1}
                description="AI-powered real estate listing descriptions"
                copyright={`© ${new Date().getFullYear()} Listingify`}
                logo="https://uploads.divjoy.com/logo.svg"
                logoInverted="https://uploads.divjoy.com/logo-white.svg"
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
