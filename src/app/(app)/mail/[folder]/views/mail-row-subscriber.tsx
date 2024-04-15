"use client"

import { useEffect, useState } from "react"
import { MailRow } from "./mail-row";

export const NewMailListener = ({folderId}: {folderId: string}) => {
  const [newEmails, setNewEmails] = useState([]);

  useEffect(() => {
    const sse = new EventSource(`/mail/${folderId}/pipeline`, {withCredentials: true})

    sse.onopen = () => {
      console.log("opening...")
    }

    sse.onmessage = (data) => {
      setNewEmails(old => [...old, JSON.parse(data.data)])
    }

    return () => sse.close()
  }, [])


  return newEmails.map((v, i) => (
    <MailRow folderId={folderId} thread={v} key={i} />
  ))
}