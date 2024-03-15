import { messagesIdSelected } from "@/app/(app)/mail/(folder-view)/[folder]/store/messages-id-selected";
import { api } from "@stuff/api-client/react";
import { useAtom } from "jotai";

export const useThreadsReadMutation = () => {
  const utils = api.useUtils();
  const [selected, setSelected] = useAtom(messagesIdSelected);
  return api.mail.threads.setRead.useMutation({
    onMutate(variables) {
      const previousData = utils.mail.threads.getThreads.getData({
        folderId: variables.folderId
      });

      utils.mail.threads.getThreads.setData(
        { folderId: variables.folderId },
        old =>
          old?.map(thread => {
            if (variables.threadIds.includes(thread.threadId)) {
              return {
                ...thread,
                read: variables.value
              };
            } else return thread;
          })
      );
      const previousSelected = selected;
      setSelected([]);

      return { previousData, previousSelected };
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(_, variables, context: any) {
      utils.mail.threads.getThreads.setData(
        { folderId: variables.folderId },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
        context!.previousData as any[]
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      setSelected(context!.previousSelected as string[]);
    },
    async onSettled(_, __, variables) {
      await utils.mail.threads.getThreads.invalidate({
        folderId: variables.folderId
      });
    }
  });
};
