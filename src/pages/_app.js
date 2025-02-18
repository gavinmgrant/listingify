import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { AuthProvider } from "util/auth";
import { ThemeProvider } from "util/theme";
import { StyledEngineProvider } from "@mui/material/styles";
import { QueryClientProvider } from "util/db";
import Meta from "components/Meta";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
  const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "pageview", page: url });
      window.fbq("track", "PageView");
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
            {/* Google Tag Manger */}
            {GTM_ID && (
              <Script
                id="gtm-script"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');`,
                }}
              />
            )}
            {/* Meta Pixel */}
            {META_PIXEL_ID && (
              <Script
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${META_PIXEL_ID}');
                fbq('track', 'PageView');
              `,
                }}
              />
            )}
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
