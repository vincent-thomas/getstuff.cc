"use client";

import { Button } from "packages/components/lib";
import { useState } from "react";
import { z } from "zod";

const useLocalStorage = (key:string, initialValue: string) => {
  const [state, setState] = useState(() => {
    // Initialize the state
    try {
      if (typeof window === "undefined") {
        return initialValue
      }

      const value = localStorage.getItem(key)
      // Check if the local storage already has any values,
      // otherwise initialize it with the passed initialValue
      return value
    } catch (error) {
      return initialValue
    }
  })
  const setValue = (value: ((thing: string) => string) | string) => {
    try {
      // If the passed value is a callback function,
      //  then call it with the existing state.
      const valueToStore = value instanceof Function ? value(z.string().parse( state)) : value
      localStorage.setItem(key, valueToStore)
      setState(valueToStore)
    } catch (error) {
      console.log(error)
    }
  }

  return [state, setValue]
}


export const CookieTeller = () => {

  const [has, setHas] = useLocalStorage('agnolished-cookies', "1");
  
  if (has === "1") {
    return null;
  }


  return (
    <div className="p-4 bg-muted">
      test
      <Button onClick={() => setHas("1")}>Accep</Button>
    </div>
  )
}