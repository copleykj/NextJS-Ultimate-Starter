import Head from 'next/head';
import Page from 'components/Layouts/Page';

export default function Home () {
  return (
    <Page>
      <Head>
        <title>Next-Tailwind-TRPC-Prisma Starter</title>
      </Head>
      <div className="place-items-center grid min-h-screen">
        <h1 className="text-5xl">Next-Tailwind-TRPC-Prisma Starter</h1>
      </div>
    </Page>
  );
}
