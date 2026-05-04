/** GROQ fragments and queries — keep strings here for reuse and typing discipline. */

export const productProjection = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  price,
  category,
  mainImage,
  gallery,
  description
`;

export const productsQuery = /* groq */ `
  *[_type == "product" && defined(slug.current)] | order(_createdAt desc) {
    ${productProjection}
  }
`;

export const productBySlugQuery = /* groq */ `
  *[_type == "product" && slug.current == $slug][0] {
    ${productProjection}
  }
`;

export const productSlugsQuery = /* groq */ `
  *[_type == "product" && defined(slug.current)].slug.current
`;

export const homepageQuery = /* groq */ `
  *[_type == "homepage"][0] {
    title,
    banners[] {
      heading,
      subheading,
      image,
      ctaLabel,
      ctaHref
    },
    "featuredProducts": featuredProducts[]-> {
      ${productProjection}
    }
  }
`;

export const productsByIdsQuery = /* groq */ `
  *[_type == "product" && _id in $ids] {
    ${productProjection}
  }
`;
