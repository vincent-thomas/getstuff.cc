"use client";

import { atom, useSetAtom } from "jotai";
import { SearchIcon } from "lucide-react";
import { Form } from "packages/ui/components";
import { border } from "src/components/recipies";

export const searchQuery = atom("");

export const Search = () => {
  const form = Form.useStore({ defaultValues: { search: "" } });
  const setSearchQuery = useSetAtom(searchQuery);

  form.useSubmit(({ values }) => {
    setSearchQuery(values.search);
  });

  return (
    <Form.Root
      store={form}
      className={cn(
        css({ bg: "bgComponent", pX: "medium" }),
        border({ rounded: "xl" }),
        stack({ align: "center", gap: "md" }),
      )}
    >
      <SearchIcon size={24} color={palette.text1} />
      <Form.Input
        name={form.names.search}
        placeholder="Search any value..."
        className={cn(css({ color: "text2", fontSize: "medium" }))}
      />
    </Form.Root>
  );
};
