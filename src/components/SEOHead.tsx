import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
}

const SITE_NAME = "Rainbow Shiksha";
const BASE_URL = "https://www.rainbowshiksha.org";
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;

const SEOHead: React.FC<SEOHeadProps> = ({ title, description, path = "/" }) => {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const canonical = `${BASE_URL}/${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={DEFAULT_IMAGE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />
    </Helmet>
  );
};

export default SEOHead;
