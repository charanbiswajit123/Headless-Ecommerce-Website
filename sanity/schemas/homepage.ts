import { defineField, defineType } from "sanity";

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      description: "Not shown on the storefront",
    }),
    defineField({
      name: "banners",
      title: "Hero banners",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "heading", type: "string", title: "Heading" },
            { name: "subheading", type: "string", title: "Subheading" },
            {
              name: "image",
              type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", type: "string", title: "Alt text" }],
            },
            { name: "ctaLabel", type: "string", title: "Button label" },
            {
              name: "ctaHref",
              type: "string",
              title: "Button link",
              description: "e.g. /product/my-slug or https://…",
            },
          ],
          preview: {
            select: { title: "heading", media: "image" },
          },
        },
      ],
    }),
    defineField({
      name: "featuredProducts",
      title: "Featured products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
      validation: (Rule) => Rule.max(8),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Homepage content" };
    },
  },
});
