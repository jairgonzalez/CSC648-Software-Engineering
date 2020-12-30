import Document, {Html, Head, Main, NextScript} from "next/document";

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

export default class GTagDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        {process.env.NODE_ENV !== 'production' ? <Head /> :
          <Head>
            {/* Global Analytics Tag https://analytics.google.com/analytics/web/provision/#/a184373537p254706446/admin/streams/table/2187216389 */}
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
            <script
                dangerouslySetInnerHTML={{
                  __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${GA_TRACKING_ID}', {
                      page_path: window.location.pathname,
                    });
                  `
                }}
              />
          </Head>
        }
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
