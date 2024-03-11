import { setupPage } from "@/lib/setupPage";
import { api } from "@stuff/api-client/server";
import { z } from "zod";

export default setupPage({
  params: z.object({
    folder: z.string(),
    thread: z.string()
  }),
  async Component({ params }) {
    console.log(params);

    api.mail.threads.getThreads;
    return <></>;
  }
});
