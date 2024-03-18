import { atom } from "jotai";
import type { z } from "zod";
import type { userDataInterface } from "../interfaces";

export const userAtom = atom<
  null | undefined | z.infer<typeof userDataInterface>
>(undefined);
