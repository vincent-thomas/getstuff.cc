"use client";

import { api } from "@stuff/api-client/react";
import { Button } from "@stuff/ui/button";
import { Heading } from "@stuff/ui/title";
import { setupPage } from "src/utils/setupPage";
import { z } from "zod";

export default setupPage({
  params: z.object({
    folderId: z.string()
  }),
  Component({params}) {
    const mutation = api.addItemInSub.useMutation();

    return (
      <div className={cn(css({ color: "text2" }))}>
        <Button
          onClick={() => {
            mutation.mutate({folderId: params.folderId, thread: {
              title: "this is the title",
              read: false,
              lastActive:432432,
              threadId: "423432"
            }});
          }}
        >
          testing
        </Button>
        <Heading weight="semibold">testing</Heading>
      </div>
    );
  },
});
