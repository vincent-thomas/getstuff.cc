"use client";

import { Button } from "@stuff/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@stuff/ui/tooltip";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Card } from "./card";


export const ThemeBtn =() => {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon" variant="ghost" rounded="medium" onClick={() => theme.setTheme(theme.resolvedTheme === "dark" ? "light" : "dark")}>
          {theme.resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />}
        </Button>
      </TooltipTrigger>
      <TooltipContent asChild>
        <Card>Change theme</Card>
      </TooltipContent>
    </Tooltip>
  )
}