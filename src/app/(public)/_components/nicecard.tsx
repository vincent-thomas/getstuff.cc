"use client"

import { useRouter } from "next/navigation";
import { Card } from "./card";
import { stack } from "src/components/recipies";
import { Button } from "@stuff/ui/button";
import { H2, P } from "@stuff/typography";
import { cn } from "@stuff/components/utils";
;

export const NiceCard = ({title, desc, href}: {title: string, desc: string, href: string}) => {
  const router = useRouter();
  return (
    <Card role="button"  onClick={() => router.push(href)} p="xl" className={cn( stack({direction: "col", gap: "md", align: "start"}), css({cursor: "pointer"}))}>
      <H2 className={css({fontSize: "large"})}>{title}</H2>
      <P className="max-w-[45ch]">{desc}</P>
      <Button className="ml-auto mt-2" variant="link" size="sm">Read more</Button>
    </Card>
  )
}