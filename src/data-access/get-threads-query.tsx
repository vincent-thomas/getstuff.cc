import { api } from "@stuff/api-client/react";

export const useThreadsQuery = (
  { folderId }: { folderId: string },
  otherProps: { initialData?: unknown[] } = {}
) =>
  api.mail.threads.getThreads.useQuery(
    { folderId },
    {
      // @ts-expect-error noo
      initialData: otherProps.initialData,
      cacheTime: 1000 * 10
    }
  );

export const useThreadQuery = ({
  folderId,
  threadId
}: {
  folderId: string;
  threadId: string;
}) =>
  api.mail.threads.getThread.useQuery(
    { folderId, threadId },
    {
      cacheTime: 1000 * 10
    }
  );
