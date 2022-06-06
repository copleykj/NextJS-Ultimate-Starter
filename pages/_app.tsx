import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import 'tailwindcss/tailwind.css';
import { withTRPC } from '@trpc/next';
import { AppRouter } from 'server/routers/_app';
import { getBaseUrl } from 'lib/utils';
// import { loadStripe, Stripe as StripeAPI } from '@stripe/stripe-js';

// declare module global {
//   let stripe: Promise<StripeAPI | null>;
//   export { stripe };
// }

// global.stripe = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
// );

interface MyAppProps {
  Component: React.ComponentType;
  pageProps: any

}
function MyApp ({ Component, pageProps: { session, ...pageProps } }: MyAppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <h1>Toaster</h1>
      <Toaster
        position="top-center"
        reverseOrder={false} />
    </SessionProvider>
  );
}

export default withTRPC<AppRouter>({
  config ({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}api/trpc`;

    return {
      url,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
      headers: () => {
        if (ctx?.req) {
          // on ssr, forward client's headers to the server
          return {
            ...ctx.req.headers,
            'x-ssr': '1',
          };
        }
        return {};
      },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(MyApp);
