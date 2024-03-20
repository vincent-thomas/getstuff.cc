import { Section } from "./section";
import {Flex} from "@stuff/structure"
import type { ReactNode } from "react";

export const PageHeador = ({
  title,
  comment
}: {
  title: string;
  comment: ReactNode;
}) => {
  return (
    <Section>
      <Flex col gap="1rem" className="pt-20">
        <h1 className="text-5xl font-bold">{title}</h1>
        <p className="text-lg font-semibold text-muted-foreground">{comment}</p>
      </Flex>
    </Section>
  );
};
