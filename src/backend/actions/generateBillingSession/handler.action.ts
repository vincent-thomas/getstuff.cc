"use server";

import { protectedProc } from "@stuff/lib/safe-action";
import { z } from "zod";
import { generateBillingSession } from "./handler";

export const generateBillingSessionAction = protectedProc(
  z.string().optional(),
  async (_, { session }) =>
    generateBillingSession({ customerId: session.customerId }),
);
