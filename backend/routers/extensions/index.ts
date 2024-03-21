import { router } from "backend/trpc";
import { mailRelayRouter } from "./mail-relay";

export const extensionsRouter = router({
  mailRelay: mailRelayRouter
})