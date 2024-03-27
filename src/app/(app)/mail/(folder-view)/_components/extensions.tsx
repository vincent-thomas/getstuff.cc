"use client";

import { api } from "@stuff/api-client/react";
import { cn } from "@stuff/components/utils";
import { Flex } from "@stuff/structure";
import { H1, H2, P } from "@stuff/typography";
import { Button } from "@stuff/ui/button";
import { Heading } from "@stuff/ui/title";
import { CheckIcon, PuzzleIcon } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "packages/components/lib/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerMainContent, DrawerTrigger } from "packages/components/lib/drawer";
import { Card } from "src/app/(public)/_components/card";


const classNames= "border border-border px-4 py-3 rounded-md flex flex-col hover:bg-hover w-full"

export const Extensions = () => {

  const enabled = api.extensions.mailRelay.enabled.useQuery();
  const enableMutation = api.extensions.mailRelay.enable.useMutation();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={cn("p-3 flex items-center gap-2 rounded-lg shadow-sm hover:bg-hover hover:outline outline-1 outline-border")}>
          <PuzzleIcon color="var(--text2)" size={24} />
          <span className="font-semibold text-lg">
            Extensions
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="flex flex-col">
        <Flex justify="start" align="center" gap="1rem">
          <PuzzleIcon size={30} />
          <H1>Extensions</H1>
        </Flex>
        {enabled.data === false ? (
          <div className={cn(classNames)}>
            <H2>Mail relay</H2>
            <P>Mail relay is a nice feature</P>
            <Flex justify="end">
              <Button onClick={async () => {
                await enableMutation.mutateAsync();
                await enabled.refetch()
              }}>Enable</Button>
            </Flex>
          </div>
        ) : (
          <EnabledMailRelayButton />
        )}
         <div className={cn(classNames)}>
            <H2>Folder rules</H2>
            <P>Redirect email elsewhere than inbox based on rules.</P>
            <Flex justify="end">
              <Button>Enable</Button>
            </Flex>
          </div>
      </DialogContent>
    </Dialog>
  )
}

export const EnabledMailRelayButton = () => {


  const {data: aliases} = api.extensions.mailRelay.listAliases.useQuery();


  return (
    <Drawer>
      <DrawerTrigger className={classNames}>
        <Flex col className="text-left w-full">
          <H2>Mail relay</H2>
          <P>Mail relay is a nice feature</P>
          <Flex className="text-text2" align="center" justify="end" gap="0.3rem">
            <i>enabled</i><CheckIcon size={16} />
          </Flex>
        </Flex>

      </DrawerTrigger>
      <DrawerContent className="h-[calc(100vh-50px)] !w-[clamp(400px,100%,800px)] mx-auto bg-background2">
        <DrawerMainContent className="h-full flex flex-col px-6 py-2 gap-4">
          <H1>Mail relays</H1>
          {aliases === undefined ? (<div className="grow"></div>) : (
            aliases?.length === 0
              ? (
                  <Flex justify="center" align="center" className="grow">
                    <H2 className="text-text2">You have no relays</H2>
                  </Flex>
                )
              : (
                <div className="grow overflow-y-auto">
                    {aliases.map(alias => (
                        <Dialog key={alias.sk}>
                          <DialogTrigger asChild>
                            <button className="w-full hover:bg-hover">
                              <Card p="md" className="text-left">
                                <Heading weight="bold" className="text-lg">
                                  {alias.pk}
                                </Heading>
                                <P>{alias.description === "" ? "No Description" : alias.description}</P>
                              </Card>
                            </button>
                          </DialogTrigger>
                          <DialogContent className="flex flex-col">
                            <Heading weight="bold" className="text-2xl">Alias: {alias.sk.split("|")[2]}</Heading>
                            <div>
                              <Button variant="destructive">testing</Button>
                              <Button variant="primary">testing</Button>
                            </div>
                          </DialogContent>
                        </Dialog>

                    ))}
                </div>
              )
          )}
          <DrawerClose asChild>
            <Button variant="outline" className="bg-background py-3">Close</Button>
          </DrawerClose>
        </DrawerMainContent>
      </DrawerContent>
      </Drawer>
  )
}