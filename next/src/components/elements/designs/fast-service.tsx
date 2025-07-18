import { ContainerTextFlip } from "@/components/decorations/text-flip"

const FastService = () => {
  return (
    <div className='w-full h-full relative z-10 flex items-center justify-center overflow-hidden'>
      <div className='relative'>
        <div className='relative w-40'>
          <ContainerTextFlip
            className='rounded-md py-1.5 text-sm md:text-sm font-medium w-full relative bg-gradient-to-b from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900 border border-zinc-300 dark:border-zinc-700'
            textClassName='w-full'
            words={["Swap", "Buy", "Sell", "Bridge", "Futures", "Limit"]}
          />
        </div>
        <svg
          viewBox='0 0 306 160'
          fill='none'
          aria-hidden='true'
          className='absolute right-full top-1/2 -mt-20 mr-[calc(1.1875rem-2px)] h-40'
        >
          <path
            fill='url(#paint0_linear_591_5220)'
            d='M305.354 4.354a.5.5 0 0 0 0-.708L302.172.464a.501.501 0 0 0-.708.708L304.293 4l-2.829 2.828a.5.5 0 0 0 .708.708l3.182-3.182ZM0 81h223.5v-1H0v1Zm248-24.5V28h-1v28.5h1Zm23.5-52H305v-1h-33.5v1ZM248 28c0-12.979 10.521-23.5 23.5-23.5v-1C257.969 3.5 247 14.469 247 28h1Zm-24.5 53c13.531 0 24.5-10.969 24.5-24.5h-1c0 12.979-10.521 23.5-23.5 23.5v1Z'
          ></path>
          <path
            fill='url(#paint1_linear_591_5220)'
            d='M305.354 155.646a.502.502 0 0 1 0 .708l-3.182 3.182a.502.502 0 0 1-.708-.708l2.829-2.828-2.829-2.828a.502.502 0 0 1 .708-.708l3.182 3.182ZM0 80h223.5v1H0v-1Zm248 24.5V132h-1v-27.5h1Zm23.5 51H305v1h-33.5v-1ZM248 132c0 12.979 10.521 23.5 23.5 23.5v1c-13.531 0-24.5-10.969-24.5-24.5h1Zm-24.5-52c13.531 0 24.5 10.969 24.5 24.5h-1c0-12.979-10.521-23.5-23.5-23.5v-1Z'
          ></path>
          <path
            fill='#404040'
            d='M305.354 117.646a.502.502 0 0 1 0 .708l-3.182 3.182a.502.502 0 0 1-.708-.708l2.829-2.828-2.829-2.828a.502.502 0 0 1 .708-.708l3.182 3.182ZM263 117.5h42v1h-42v-1Zm-15-15c0 8.284 6.716 15 15 15v1c-8.837 0-16-7.163-16-16h1ZM305.354 41.854a.5.5 0 0 0 0-.708l-3.182-3.181a.501.501 0 0 0-.708.707l2.829 2.828-2.829 2.828a.5.5 0 0 0 .708.707l3.182-3.181ZM263 42h42v-1h-42v1Zm-15 15c0-8.284 6.716-15 15-15v-1c-8.837 0-16 7.163-16 16h1Z'
          ></path>
          <defs>
            <linearGradient
              id='paint0_linear_591_5220'
              x1='305'
              x2='0'
              y1='42.25'
              y2='42.25'
              gradientUnits='userSpaceOnUse'
            >
              <stop offset='.246' stop-color='#404040'></stop>
              <stop offset='1' stop-color='#404040' stop-opacity='0'></stop>
            </linearGradient>
            <linearGradient
              id='paint1_linear_591_5220'
              x1='305'
              x2='0'
              y1='118.25'
              y2='118.25'
              gradientUnits='userSpaceOnUse'
            >
              <stop offset='.246' stop-color='#404040'></stop>
              <stop offset='1' stop-color='#404040' stop-opacity='0'></stop>
            </linearGradient>
          </defs>
        </svg>
        <svg
          viewBox='0 0 344 116'
          fill='none'
          aria-hidden='true'
          className='absolute left-full top-1/2 ml-4 mt-[-3.625rem] h-[7.25rem]'
        >
          <path
            stroke='url(#paint0_linear_591_5229)'
            stroke-linecap='round'
            d='M343 58H105.956c-18.783 0-37-4.213-53.471-12A125.108 125.108 0 0 1 1 1'
          ></path>
          <path
            stroke='url(#paint1_linear_591_5229)'
            stroke-linecap='round'
            d='M52.485 46A125.108 125.108 0 0 1 9 11.974'
          ></path>
          <path
            stroke='url(#paint2_linear_591_5229)'
            stroke-linecap='round'
            d='M343 58H105.956A125.13 125.13 0 0 0 1 115'
          ></path>
          <path
            stroke='url(#paint3_linear_591_5229)'
            stroke-linecap='round'
            d='M343 58H79.593A172.05 172.05 0 0 0 1 77'
          ></path>
          <path
            stroke='url(#paint4_linear_591_5229)'
            stroke-linecap='round'
            d='M343 58H79.593A172.05 172.05 0 0 1 1 39'
          ></path>
          <path
            stroke='url(#paint5_linear_591_5229)'
            stroke-linecap='round'
            d='M105.955 58a125.03 125.03 0 0 0-45.334 8.5'
          ></path>
          <defs>
            <linearGradient
              id='paint0_linear_591_5229'
              x1='1'
              x2='343'
              y1='29.5'
              y2='29.5'
              gradientUnits='userSpaceOnUse'
            >
              <stop stop-color='#404040' stop-opacity='0'></stop>
              <stop offset='.18' stop-color='#2F3037'></stop>
            </linearGradient>
            <linearGradient
              id='paint1_linear_591_5229'
              x1='24.5'
              x2='44.5'
              y1='12.5'
              y2='44.5'
              gradientUnits='userSpaceOnUse'
            >
              <stop stop-color='#404040' stop-opacity='0'></stop>
              <stop offset='1' stop-color='#f9c0cd'></stop>
            </linearGradient>
            <linearGradient
              id='paint2_linear_591_5229'
              x1='1'
              x2='343'
              y1='86.5'
              y2='86.5'
              gradientUnits='userSpaceOnUse'
            >
              <stop stop-color='#404040' stop-opacity='0'></stop>
              <stop offset='.18' stop-color='#404040'></stop>
            </linearGradient>
            <linearGradient
              id='paint3_linear_591_5229'
              x1='1'
              x2='343'
              y1='67.5'
              y2='67.5'
              gradientUnits='userSpaceOnUse'
            >
              <stop stop-color='#404040' stop-opacity='0'></stop>
              <stop offset='.18' stop-color='#404040'></stop>
            </linearGradient>
            <linearGradient
              id='paint4_linear_591_5229'
              x1='1'
              x2='343'
              y1='48.5'
              y2='48.5'
              gradientUnits='userSpaceOnUse'
            >
              <stop stop-color='#404040' stop-opacity='0'></stop>
              <stop offset='.18' stop-color='#404040'></stop>
            </linearGradient>
            <linearGradient
              id='paint5_linear_591_5229'
              x1='76.78'
              x2='105.499'
              y1='58.132'
              y2='60.5'
              gradientUnits='userSpaceOnUse'
            >
              <stop stop-color='#f9c0cd' stop-opacity='0'></stop>
              <stop offset='1' stop-color='#f9c0cd'></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  )
}

export default FastService
