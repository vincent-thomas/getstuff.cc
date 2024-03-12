import type { userDataInterface } from "@/interfaces/userData";
import { atom } from "jotai";
import type { z } from "zod";

export const userAtom = atom<
  null | undefined | z.infer<typeof userDataInterface>
>(undefined);
