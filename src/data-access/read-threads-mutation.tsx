import { api } from "@stuff/api-client/react";
import { useAtom } from "jotai";
import { messagesIdSelected } from "../app/(app)/_mail/_[folder]/store/messages-id-selected";

// export const useThreadsReadMutation = () => {
//   const utils = api.useUtils();
//   const [selected, setSelected] = useAtom(messagesIdSelected);
//   return api.mail.threads.setRead.useMutation({
//     onMutate(variables) {
//       const previousData = utils.mail.threads.getThreads.getData({
//         folderId: variables.folderId,
//       });

//       utils.mail.threads.getThreads.setData(
//         { folderId: variables.folderId },
//         old =>
//           old?.map(thread => {
//             if (variables.threadIds.includes(thread.thread.threadId)) {
//               return {
//                 ...thread,
//                 read: variables.value,
//               };
//             }
//             return thread;
//           }),
//       );
//       const previousSelected = selected;
//       setSelected([]);

//       return { previousData, previousSelected };
//     },
//     onError(_, variables, context: unknown) {
//       utils.mail.threads.getThreads.setData(
//         { folderId: variables.folderId },

//         // @ts-expect-error this doesn't matter
//         context?.previousData as unknown[],
//       );
//       // @ts-expect-error this doesn't matter
//       setSelected(context?.previousSelected as string[]);
//     },
//     async onSettled(_, __, variables) {
//       await utils.mail.threads.getThreads.invalidate({
//         folderId: variables.folderId,
//       });
//     },
//   });
// };
