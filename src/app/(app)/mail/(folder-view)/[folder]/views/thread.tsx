import { Page } from "../[thread]/page-client"


export const ThreadView = ({threadId, folderId}: {threadId: string, folderId: string}) => {
  return <Page threadId={threadId} folderId={folderId}/>
}