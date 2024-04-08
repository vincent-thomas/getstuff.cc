"use client"

import { Button } from "@stuff/ui/button";
import { border } from "src/components/recipies";

const Page = (props: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  console.log(props)
  return (
    <div className={cn(css({width: "full", height: "full", p: "medium"}))}>
      <div style={{backgroundColor: "#472b2c",color: "hsl(357 100% 90%)"}} className={cn(css({width: "full", height: "full"}),border({rounded: "radius", color: "interactive", side: 'all'}), stack({direction: "col", justify: "center", align: "center", gap: "sm"}))}>
        <h1 className={cn(css({fontSize: "large"}))}>Unknown error:</h1>
        <h1 className={cn(css({fontSize: "medium"}))}>Error: {props.error.message}</h1>
        <Button variant="primary" size="md" rounded="medium" onClick={() => props.reset()}>Try again</Button>
      </div>
    </div>
  )
}

export default Page;