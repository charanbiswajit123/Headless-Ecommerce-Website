import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed text-zinc-700 dark:text-zinc-300">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mb-3 mt-8 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-2 mt-6 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        {children}
      </h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc space-y-2 pl-6 text-zinc-700 dark:text-zinc-300">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-2 pl-6 text-zinc-700 dark:text-zinc-300">
        {children}
      </ol>
    ),
  },
};

export function ProductDescription({
  value,
}: {
  value: PortableTextBlock[] | null | undefined;
}) {
  if (!value?.length) {
    return (
      <p className="text-zinc-500 dark:text-zinc-400">
        No description available.
      </p>
    );
  }

  return (
    <div className="max-w-prose">
      <PortableText value={value} components={components} />
    </div>
  );
}
