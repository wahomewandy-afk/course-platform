"use client"

import { toast, useToastManager } from "@/components/ui/toast"

export function actionToast({
  actionData,
}: {
  actionData: { error: boolean; message: string }
}) {
  return toast.add({
    title: actionData.error ? "Error" : "Success",
    description: actionData.message,
    type: actionData.error ? "error" : "success",
  })
}

export { toast, useToastManager as useToast }
