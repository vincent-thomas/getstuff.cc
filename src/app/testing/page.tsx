"use client"

import { api } from "@stuff/api-client/react"
import { useState } from "react"
import { setupPage } from "src/utils/setupPage"


export default setupPage({
  Component() {
    const [number, setNumber] = useState({message: 'testing'})
    api.testingSubscriptions.useSubscription(undefined, {
      onData(n) {
        console.log('new data')
        setNumber(n)
      },
      onStarted() {
        console.log("started")
      },
    });
    const mutation = api.addItemInSub.useMutation();

    return (
      <div className={cn(css({color: "text2"}))}>
        <button
          onClick={() => {
            mutation.mutate()
          }}
        >mutate</button>
        <pre>{JSON.stringify(number, undefined, 2)}</pre>
      </div>
    )
  },
})