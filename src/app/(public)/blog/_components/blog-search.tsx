"use client";
import type { Post } from "contentlayer/generated";
import Fuse from "fuse.js";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const BlogSearch = ({
  blogs,
  setQuery,
}: { blogs: Post[]; setQuery: (q: Post[]) => void }) => {
  const search = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const set = (key: string, value: string) => {
    const current = new URLSearchParams(Array.from(search.entries())); // -> has to use this form

    current.set(key, value);
    const newSearch = current.toString();

    const query = newSearch ? `?${newSearch}` : "";
    router.push(`${pathname}${query}`);
  };

  useEffect(() => {
    const fuse = new Fuse(blogs, {
      keys: ["title", "description", "tags"],
    });

    setQuery(fuse.search(search.get("q") ?? "").map(v => v.item));
  }, [search, blogs, setQuery]);

  return (
    <div className="w-full flex justify-center items-center">
      <input
        type="search"
        className="w-full max-w-[500px] p-4 rounded-lg border-2 border-border bg-background2"
        value={search.get("q") ?? ""}
        onChange={e => set("q", e.target.value)}
        placeholder="Search for blog posts"
      />
    </div>
  );
};
