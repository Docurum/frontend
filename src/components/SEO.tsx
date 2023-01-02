import Head from "next/head";

const SEO = ({ title }: { title?: string }) => {
  return (
    <Head>
      {title ? <title>{title}</title> : <title>Docurum</title>}
      {title ? <meta name="description" content={`${title} | Docurum`} /> : <meta name="description" content="Docurum" />}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:site_name" content="Docurum" />
      <link rel="icon" href="/logo.svg" />
    </Head>
  );
};

export default SEO;
