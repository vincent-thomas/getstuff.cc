import { MailIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "packages/ui/components/dialog";
import type { FC, ReactNode } from "react"

interface ComposeAction {
  trigger: ReactNode;
}

export const ComposeAction: FC<ComposeAction> = ({trigger}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent
        className={stack({ direction: "col" })}
        size="lg"
        mainTitle={
          <span className={stack({ gap: "md", align: "center" })}>
            <MailIcon size={24} />
            Compose
          </span>
        }
      >
        compose mail
      </DialogContent>
    </Dialog>
  )
}