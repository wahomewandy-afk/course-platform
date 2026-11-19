"use client"

import {
  ComponentPropsWithRef,
  ReactNode,
  useState,
  useTransition,
} from "react"
import { Button } from "./ui/button"
import { actionToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { Loader2Icon } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function ActionButton({
  action,
  requireAreYouSure = false,
  ...props
}: Omit<ComponentPropsWithRef<typeof Button>, "onClick"> & {
  action: () => Promise<{ error: boolean; message: string }>
  requireAreYouSure?: boolean
}) {
  const [isLoading, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)

  function performAction() {
    startTransition(async () => {
      const data = await action()
      actionToast({ actionData: data })
      if (!data.error) setIsOpen(false)
    })
  }

  if (requireAreYouSure) {
    return (
      <AlertDialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!isLoading) setIsOpen(open)
        }}
      >
        <AlertDialogTrigger render={<Button {...props} />} />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are You Sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={isLoading} onClick={performAction}>
              <LoadingTextSwap isLoading={isLoading}>Yes</LoadingTextSwap>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  return (
    <Button {...props} disabled={isLoading} onClick={performAction}>
      <LoadingTextSwap isLoading={isLoading}>
        {props.children}
      </LoadingTextSwap>
    </Button>
  )
}

function LoadingTextSwap({
  isLoading,
  children,
}: {
  isLoading: boolean
  children: ReactNode
}) {
  return (
    <div className="grid items-center justify-items-center">
      <div
        className={cn(
          "col-start-1 col-end-2 row-start-1 row-end-2",
          isLoading ? "invisible" : "visible"
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "col-start-1 col-end-2 row-start-1 row-end-2",
          isLoading ? "visible" : "invisible"
        )}
      >
        <Loader2Icon className="animate-spin" />
      </div>
    </div>
  )
}
