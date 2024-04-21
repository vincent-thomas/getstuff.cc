"use client";

import { api } from "@stuff/api-client/react";
import { cn } from "@stuff/components/utils";
import { H1, H2, P } from "@stuff/typography";
import { Button } from "@stuff/ui/button";
import { PuzzleIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "packages/ui/components/dialog/dialog";

import { atom, useAtom } from "jotai";
import { Text2 } from "packages/ui/atoms";
import { stack } from "packages/ui/patterns/stack";
import { store } from "src/app/global-store";
import { border } from "src/components/recipies";
import { mailRelayOpen } from "../ui-actions/mailRelay";
import { hoverUnderline } from "./account-viewer.css";

const classNames = cn(
  css({ p: "medium", bg: { hover: "bgHover" }, width: "full" }),
  stack({ gap: "sm", direction: "col" }),
  border({ color: "interactive", side: "all", rounded: "radius" }),
);

export const extensionsOpen = atom(false);

export const Extensions = () => {
  // const enabled = api.extensions.mailRelay.enabled.useQuery();
  // const [open, setOpen] = useAtom(extensionsOpen);

  return (
    <></>
    // <Dialog open={open} onOpenChange={setOpen}>
    //   <DialogTrigger asChild>
    //     <button
    //       type="button"
    //       className={cn(
    //         stack({ align: "center", gap: "md" }),
    //         css({ color: "text2", p: "medium" }),
    //         hoverUnderline,
    //       )}
    //     >
    //       <PuzzleIcon size={24} />
    //       <Text2
    //         className={css({
    //           fontWeight: "semibold",
    //         })}
    //       >
    //         Extensions
    //       </Text2>
    //     </button>
    //   </DialogTrigger>
    //   <DialogContent
    //     className={cn(stack({ direction: "col" }), css({ p: "large" }))}
    //     size="lg"
    //     mainTitle={
    //       <span className={stack({ gap: "md", align: "center" })}>
    //         <PuzzleIcon size={24} />
    //         Extensions
    //       </span>
    //     }
    //   >
    //     {enabled.data === false ? (
    //       <EnableMailRelay />
    //     ) : (
    //       <button type="button" onClick={() => store.set(mailRelayOpen, true)}>
    //         <div
    //           className={cn(
    //             css({
    //               p: "large",
    //               bg: { default: "bgComponent", hover: "bgHover" },
    //             }),
    //             border({
    //               color: "interactive",
    //               side: "all",
    //               rounded: "radius",
    //             }),
    //           )}
    //         >
    //           <H1 className={cn(css({ fontSize: "large" }))}>Mail Relay</H1>
    //           <P>Mail relay is a nice features</P>
    //         </div>
    //       </button>
    //     )}
    //     <div className={cn(classNames)}>
    //       <H2>Folder rules</H2>
    //       <P>Redirect email elsewhere than inbox based on rules.</P>
    //       <div className={cn(stack({ justify: "end" }))}>
    //         <Button>Enable</Button>
    //       </div>
    //     </div>
    //   </DialogContent>
    // </Dialog>
  );
};

const EnableMailRelay = () => {
  // const enableMutation = api.extensions.mailRelay.enable.useMutation();
  // const utils = api.useUtils();

  return (
    <div className={cn(classNames)}>
      {/* <H2>Mail relay</H2>
      <P>Mail relay is a nice feature</P>
      <div className={cn(stack({ justify: "end" }))}>
        <Button
          onClick={async () => {
            await enableMutation.mutateAsync();
            await utils.extensions.mailRelay.enabled.invalidate();
          }}
        >
          Enable
        </Button>
      </div> */}
    </div>
  );
};
