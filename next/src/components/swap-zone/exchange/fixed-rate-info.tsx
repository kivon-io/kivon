import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const FixedRateInfoDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className='
          transition-all duration-300
          opacity-0 scale-95
          data-[state=open]:opacity-100 data-[state=open]:scale-100
          md:max-w-xs w-full
        '
      >
        <DialogHeader>
          <DialogTitle>Rate</DialogTitle>
          <DialogDescription>Estimated or fixed rate?</DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-1'>
            <p className='font-medium text-sm'>Estimated Rate</p>
            <p className='text-zinc-600 text-xs'>
              The floating rate can change at any point due to market conditions, so you might
              receive more or less crypto than expected
            </p>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='font-medium text-sm'>Fixed Rate</p>
            <p className='text-zinc-600 text-xs'>
              With the fixed rate, you will receive the exact amount of crypto you see on this
              screen
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default FixedRateInfoDialog
