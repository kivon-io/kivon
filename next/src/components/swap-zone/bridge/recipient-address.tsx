import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useBridge } from "@/context/bridge-context"
import { trpc } from "@/trpc/client"
import { useEffect } from "react"

const RecipientAddress = ({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) => {
  const { form } = useBridge()
  const destination = form.watch("destination")

  const { data: validateAddress } = trpc.validateAddress.useQuery(
    {
      address: form.watch("recipient") || "",
      ticker: destination.chainSymbol.toLowerCase(),
    },
    {
      enabled: !!form.watch("recipient"),
    }
  )

  useEffect(() => {
    if (validateAddress?.result) {
      form.setValue("isRecipientAddressValid", validateAddress.result)
    }
  }, [validateAddress, form])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-sm'>
        <DialogHeader>
          <DialogTitle>To Address</DialogTitle>
        </DialogHeader>
        <DialogDescription className='text-sm text-muted-foreground'>
          Enter the address to receive the token on {destination.chainName}
        </DialogDescription>
        <div className='flex flex-col gap-5'>
          <div className='flex flex-col gap-1'>
            <Input
              placeholder={`Enter ${destination.chainName} address`}
              value={form.watch("recipient")}
              onChange={(e) => form.setValue("recipient", e.target.value)}
            />
            {validateAddress?.message && (
              <p className='text-xs text-red-500'>{validateAddress.message}</p>
            )}
          </div>
          <Button
            disabled={!validateAddress?.result}
            className='w-full'
            size='lg'
            onClick={() => onOpenChange(false)}
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default RecipientAddress
