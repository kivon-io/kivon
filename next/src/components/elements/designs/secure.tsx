import { motion } from "motion/react"

const Secure = () => {
  return (
    <div className='h-[16rem] pointer-events-none relative mx-auto w-[6.5rem] select-none'>
      <div className='absolute left-1/2 top-1/2 ml-[calc(-600/2/16*1rem)] mt-[calc(-600/2/16*1rem)] size-[calc(600/16*1rem)] [mask:radial-gradient(closest-side_at_center,black,transparent)]'>
        <div
          className='absolute left-1/2 top-1/2 mt-[-0.5px] flex w-[calc(300/16*1rem)] origin-left justify-end overflow-hidden'
          style={{ transform: "rotate(0deg)" }}
        >
          <motion.div
            data-line='true'
            className='h-px w-[calc((300*2)/16*1rem)] flex-none bg-[linear-gradient(to_right,_#545454_25%,transparent_25%,transparent_75%,_#545454_75%)] dark:bg-[linear-gradient(to_right,white_25%,transparent_25%,transparent_75%,white_75%)] bg-[25%_auto] opacity-12.5'
            style={{ transform: "translateX(0%)" }}
            animate={{ x: ["0%", "40%", "0%"] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          ></motion.div>
        </div>
        <div
          className='absolute left-1/2 top-1/2 mt-[-0.5px] flex w-[calc(300/16*1rem)] origin-left justify-end overflow-hidden'
          style={{ transform: "rotate(226.667deg)" }}
        >
          <motion.div
            data-line='true'
            className='h-px w-[calc((300*2)/16*1rem)] flex-none bg-[linear-gradient(to_right,_#545454_25%,transparent_25%,transparent_75%,_#545454_75%)] dark:bg-[linear-gradient(to_right,white_25%,transparent_25%,transparent_75%,white_75%)] bg-[25%_auto] opacity-12.5'
            style={{ transform: "translateX(2.5%)" }}
            animate={{ x: ["0%", "60%", "0%"] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          ></motion.div>
        </div>
        <div
          className='absolute left-1/2 top-1/2 mt-[-0.5px] flex w-[calc(300/16*1rem)] origin-left justify-end overflow-hidden'
          style={{ transform: "rotate(186.667deg)" }}
        >
          <motion.div
            data-line='true'
            className='h-px w-[calc((300*2)/16*1rem)] flex-none bg-[linear-gradient(to_right,_#545454_25%,transparent_25%,transparent_75%,_#545454_75%)] dark:bg-[linear-gradient(to_right,white_25%,transparent_25%,transparent_75%,white_75%)] bg-[25%_auto] opacity-12.5'
            style={{ transform: "translateX(5%)" }}
            animate={{ x: ["0%", "60%", "0%"] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          ></motion.div>
        </div>
        <div
          className='absolute left-1/2 top-1/2 mt-[-0.5px] flex w-[calc(300/16*1rem)] origin-left justify-end overflow-hidden'
          style={{ transform: "rotate(146.667deg)" }}
        >
          <motion.div
            data-line='true'
            className='h-px w-[calc((300*2)/16*1rem)] flex-none bg-[linear-gradient(to_right,_#545454_25%,transparent_25%,transparent_75%,_#545454_75%)] dark:bg-[linear-gradient(to_right,white_25%,transparent_25%,transparent_75%,white_75%)] bg-[25%_auto] opacity-12.5'
            style={{ transform: "translateX(7.5%)" }}
            animate={{ x: ["20%", "40%", "20%"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          ></motion.div>
        </div>
        <div
          className='absolute left-1/2 top-1/2 mt-[-0.5px] flex w-[calc(300/16*1rem)] origin-left justify-end overflow-hidden'
          style={{ transform: "rotate(240deg)" }}
        >
          <motion.div
            data-line='true'
            className='h-px w-[calc((300*2)/16*1rem)] flex-none bg-[linear-gradient(to_right,_#545454_25%,transparent_25%,transparent_75%,_#545454_75%)] dark:bg-[linear-gradient(to_right,white_25%,transparent_25%,transparent_75%,white_75%)] bg-[25%_auto] opacity-12.5'
            style={{ transform: "translateX(10%)" }}
            animate={{ x: ["20%", "40%", "20%"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          ></motion.div>
        </div>
        <div
          className='absolute left-1/2 top-1/2 mt-[-0.5px] flex w-[calc(300/16*1rem)] origin-left justify-end overflow-hidden'
          style={{ transform: "rotate(120deg)" }}
        >
          <motion.div
            data-line='true'
            className='h-px w-[calc((300*2)/16*1rem)] flex-none bg-[linear-gradient(to_right,_#545454_25%,transparent_25%,transparent_75%,_#545454_75%)] dark:bg-[linear-gradient(to_right,white_25%,transparent_25%,transparent_75%,white_75%)] bg-[25%_auto] opacity-12.5'
            style={{ transform: "translateX(12.5%)" }}
            animate={{ x: ["0%", "40%", "0%"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          ></motion.div>
        </div>
        <div
          className='absolute left-1/2 top-1/2 mt-[-0.5px] flex w-[calc(300/16*1rem)] origin-left justify-end overflow-hidden'
          style={{ transform: "rotate(40deg)" }}
        >
          <motion.div
            data-line='true'
            className='h-px w-[calc((300*2)/16*1rem)] flex-none bg-[linear-gradient(to_right,_#545454_25%,transparent_25%,transparent_75%,_#545454_75%)] dark:bg-[linear-gradient(to_right,white_25%,transparent_25%,transparent_75%,white_75%)] bg-[25%_auto] opacity-12.5'
            style={{ transform: "translateX(15%)" }}
            animate={{ x: ["0%", "90%", "70%"] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          ></motion.div>
        </div>
        <div
          className='absolute left-1/2 top-1/2 mt-[-0.5px] flex w-[calc(300/16*1rem)] origin-left justify-end overflow-hidden'
          style={{ transform: "rotate(320deg)" }}
        >
          <motion.div
            data-line='true'
            className='h-px w-[calc((300*2)/16*1rem)] flex-none bg-[linear-gradient(to_right,_#545454_25%,transparent_25%,transparent_75%,_#545454_75%)] dark:bg-[linear-gradient(to_right,white_25%,transparent_25%,transparent_75%,white_75%)] bg-[25%_auto] opacity-12.5'
            style={{ transform: "translateX(17.5%)" }}
            animate={{ x: ["0%", "60%", "20%"] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          ></motion.div>
        </div>
        <div
          className='absolute left-1/2 top-1/2 mt-[-0.5px] flex w-[calc(300/16*1rem)] origin-left justify-end overflow-hidden'
          style={{ transform: "rotate(160deg)" }}
        >
          <motion.div
            data-line='true'
            className='h-px w-[calc((300*2)/16*1rem)] flex-none bg-[linear-gradient(to_right,_#545454_25%,transparent_25%,transparent_75%,_#545454_75%)] dark:bg-[linear-gradient(to_right,white_25%,transparent_25%,transparent_75%,white_75%)] bg-[25%_auto] opacity-12.5'
            style={{ transform: "translateX(20%)" }}
            animate={{ x: ["0%", "50%", "10%"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          ></motion.div>
        </div>
        <div
          className='absolute left-1/2 top-1/2 mt-[-0.5px] flex w-[calc(300/16*1rem)] origin-left justify-end overflow-hidden'
          style={{ transform: "rotate(266.667deg)" }}
        >
          <motion.div
            data-line='true'
            className='h-px w-[calc((300*2)/16*1rem)] flex-none bg-[linear-gradient(to_right,_#545454_25%,transparent_25%,transparent_75%,_#545454_75%)] dark:bg-[linear-gradient(to_right,white_25%,transparent_25%,transparent_75%,white_75%)] bg-[25%_auto] opacity-12.5'
            style={{ transform: "translateX(22.5%)" }}
            animate={{ x: ["0%", "40%", "10%"] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          ></motion.div>
        </div>
        <div
          className='absolute left-1/2 top-1/2 mt-[-0.5px] flex w-[calc(300/16*1rem)] origin-left justify-end overflow-hidden'
          style={{ transform: "rotate(333.333deg)" }}
        >
          <motion.div
            data-line='true'
            className='h-px w-[calc((300*2)/16*1rem)] flex-none bg-[linear-gradient(to_right,_#545454_25%,transparent_25%,transparent_75%,_#545454_75%)] dark:bg-[linear-gradient(to_right,white_25%,transparent_25%,transparent_75%,white_75%)] bg-[25%_auto] opacity-12.5'
            style={{ transform: "translateX(25%)" }}
            animate={{ x: ["0%", "40%", "60%"] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          ></motion.div>
        </div>
        <div
          className='absolute left-1/2 top-1/2 mt-[-0.5px] flex w-[calc(300/16*1rem)] origin-left justify-end overflow-hidden'
          style={{ transform: "rotate(293.333deg)" }}
        >
          <motion.div
            data-line='true'
            className='h-px w-[calc((300*2)/16*1rem)] flex-none bg-[linear-gradient(to_right,_#545454_25%,transparent_25%,transparent_75%,_#545454_75%)] dark:bg-[linear-gradient(to_right,white_25%,transparent_25%,transparent_75%,white_75%)] bg-[25%_auto] opacity-12.5'
            style={{ transform: "translateX(27.5%)" }}
            animate={{ x: ["0%", "40%", "80%"] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          ></motion.div>
        </div>
        <div
          className='absolute left-1/2 top-1/2 mt-[-0.5px] flex w-[calc(300/16*1rem)] origin-left justify-end overflow-hidden'
          style={{ transform: "rotate(280deg)" }}
        >
          <motion.div
            data-line='true'
            className='h-px w-[calc((300*2)/16*1rem)] flex-none bg-[linear-gradient(to_right,_#545454_25%,transparent_25%,transparent_75%,_#545454_75%)] dark:bg-[linear-gradient(to_right,white_25%,transparent_25%,transparent_75%,white_75%)] bg-[25%_auto] opacity-12.5'
            style={{ transform: "translateX(30%)" }}
            animate={{ x: ["0%", "40%", "50%"] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          ></motion.div>
        </div>
        <div
          className='absolute left-1/2 top-1/2 mt-[-0.5px] flex w-[calc(300/16*1rem)] origin-left justify-end overflow-hidden'
          style={{ transform: "rotate(106.667deg)" }}
        >
          <motion.div
            data-line='true'
            className='h-px w-[calc((300*2)/16*1rem)] flex-none bg-[linear-gradient(to_right,_#545454_25%,transparent_25%,transparent_75%,_#545454_75%)] dark:bg-[linear-gradient(to_right,white_25%,transparent_25%,transparent_75%,white_75%)] bg-[25%_auto] opacity-12.5'
            style={{ transform: "translateX(32.5%)" }}
            animate={{ x: ["0%", "40%", "10%"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          ></motion.div>
        </div>
        <div
          className='absolute left-1/2 top-1/2 mt-[-0.5px] flex w-[calc(300/16*1rem)] origin-left justify-end overflow-hidden'
          style={{ transform: "rotate(346.667deg)" }}
        >
          <motion.div
            data-line='true'
            className='h-px w-[calc((300*2)/16*1rem)] flex-none bg-[linear-gradient(to_right,_#545454_25%,transparent_25%,transparent_75%,_#545454_75%)] dark:bg-[linear-gradient(to_right,white_25%,transparent_25%,transparent_75%,white_75%)] bg-[25%_auto] opacity-12.5'
            style={{ transform: "translateX(35%)" }}
            animate={{ x: ["0%", "40%", "80%"] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          ></motion.div>
        </div>
        <div
          className='absolute left-1/2 top-1/2 mt-[-0.5px] flex w-[calc(300/16*1rem)] origin-left justify-end overflow-hidden'
          style={{ transform: "rotate(173.333deg)" }}
        >
          <motion.div
            data-line='true'
            className='h-px w-[calc((300*2)/16*1rem)] flex-none bg-[linear-gradient(to_right,_#545454_25%,transparent_25%,transparent_75%,_#545454_75%)] dark:bg-[linear-gradient(to_right,white_25%,transparent_25%,transparent_75%,white_75%)] bg-[25%_auto] opacity-12.5'
            style={{ transform: "translateX(37.5%)" }}
            animate={{ x: ["0%", "60%", "0%"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          ></motion.div>
        </div>
        <div
          className='absolute left-1/2 top-1/2 mt-[-0.5px] flex w-[calc(300/16*1rem)] origin-left justify-end overflow-hidden'
          style={{ transform: "rotate(13.3333deg)" }}
        >
          <motion.div
            data-line='true'
            className='h-px w-[calc((300*2)/16*1rem)] flex-none bg-[linear-gradient(to_right,_#545454_25%,transparent_25%,transparent_75%,_#545454_75%)] dark:bg-[linear-gradient(to_right,white_25%,transparent_25%,transparent_75%,white_75%)] bg-[25%_auto] opacity-12.5'
            style={{ transform: "translateX(40%)" }}
            animate={{ x: ["0%", "60%", "0%"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          ></motion.div>
        </div>
        <div
          className='absolute left-1/2 top-1/2 mt-[-0.5px] flex w-[calc(300/16*1rem)] origin-left justify-end overflow-hidden'
          style={{ transform: "rotate(66.6667deg)" }}
        >
          <motion.div
            data-line='true'
            className='h-px w-[calc((300*2)/16*1rem)] flex-none bg-[linear-gradient(to_right,_#545454_25%,transparent_25%,transparent_75%,_#545454_75%)] dark:bg-[linear-gradient(to_right,white_25%,transparent_25%,transparent_75%,white_75%)] bg-[25%_auto] opacity-12.5'
            style={{ transform: "translateX(42.5%)" }}
            animate={{ x: ["0%", "20%", "0%"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          ></motion.div>
        </div>
        <div
          className='absolute left-1/2 top-1/2 mt-[-0.5px] flex w-[calc(300/16*1rem)] origin-left justify-end overflow-hidden'
          style={{ transform: "rotate(253.333deg)" }}
        >
          <motion.div
            data-line='true'
            className='h-px w-[calc((300*2)/16*1rem)] flex-none bg-[linear-gradient(to_right,_#545454_25%,transparent_25%,transparent_75%,_#545454_75%)] dark:bg-[linear-gradient(to_right,white_25%,transparent_25%,transparent_75%,white_75%)] bg-[25%_auto] opacity-12.5'
            style={{ transform: "translateX(45%)" }}
            animate={{ x: ["0%", "20%", "0%"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          ></motion.div>
        </div>
        <div
          className='absolute left-1/2 top-1/2 mt-[-0.5px] flex w-[calc(300/16*1rem)] origin-left justify-end overflow-hidden'
          style={{ transform: "rotate(133.333deg)" }}
        >
          <motion.div
            data-line='true'
            className='h-px w-[calc((300*2)/16*1rem)] flex-none bg-[linear-gradient(to_right,_#545454_25%,transparent_25%,transparent_75%,_#545454_75%)] dark:bg-[linear-gradient(to_right,white_25%,transparent_25%,transparent_75%,white_75%)] bg-[25%_auto] opacity-12.5'
            style={{ transform: "translateX(47.5%)" }}
            animate={{ x: ["0%", "30%", "0%"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          ></motion.div>
        </div>
        <div
          className='absolute left-1/2 top-1/2 mt-[-0.5px] flex w-[calc(300/16*1rem)] origin-left justify-end overflow-hidden'
          style={{ transform: "rotate(306.667deg)" }}
        >
          <motion.div
            data-line='true'
            className='h-px w-[calc((300*2)/16*1rem)] flex-none bg-[linear-gradient(to_right,_#545454_25%,transparent_25%,transparent_75%,_#545454_75%)] dark:bg-[linear-gradient(to_right,white_25%,transparent_25%,transparent_75%,white_75%)] bg-[25%_auto] opacity-12.5'
            style={{ transform: "translateX(50%)" }}
            animate={{ x: ["0%", "50%", "0%"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          ></motion.div>
        </div>
        <div
          className='absolute left-1/2 top-1/2 mt-[-0.5px] flex w-[calc(300/16*1rem)] origin-left justify-end overflow-hidden'
          style={{ transform: "rotate(80deg)" }}
        >
          <div
            data-line='true'
            className='h-px w-[calc((300*2)/16*1rem)] flex-none bg-[linear-gradient(to_right,_#545454_25%,transparent_25%,transparent_75%,_#545454_75%)] dark:bg-[linear-gradient(to_right,white_25%,transparent_25%,transparent_75%,white_75%)] bg-[25%_auto] opacity-12.5'
            style={{ transform: "translateX(52.5%)" }}
          ></div>
        </div>
        <div
          className='absolute left-1/2 top-1/2 mt-[-0.5px] flex w-[calc(300/16*1rem)] origin-left justify-end overflow-hidden'
          style={{ transform: "rotate(93.3333deg)" }}
        >
          <motion.div
            data-line='true'
            className='h-px w-[calc((300*2)/16*1rem)] flex-none bg-[linear-gradient(to_right,_#545454_25%,transparent_25%,transparent_75%,_#545454_75%)] dark:bg-[linear-gradient(to_right,white_25%,transparent_25%,transparent_75%,white_75%)] bg-[25%_auto] opacity-12.5'
            style={{ transform: "translateX(55%)" }}
            animate={{ x: ["0%", "40%", "0%"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          ></motion.div>
        </div>
        <div
          className='absolute left-1/2 top-1/2 mt-[-0.5px] flex w-[calc(300/16*1rem)] origin-left justify-end overflow-hidden'
          style={{ transform: "rotate(200deg)" }}
        >
          <motion.div
            data-line='true'
            className='h-px w-[calc((300*2)/16*1rem)] flex-none bg-[linear-gradient(to_right,_#545454_25%,transparent_25%,transparent_75%,_#545454_75%)] dark:bg-[linear-gradient(to_right,white_25%,transparent_25%,transparent_75%,white_75%)] bg-[25%_auto] opacity-12.5'
            style={{ transform: "translateX(57.5%)" }}
            animate={{ x: ["0%", "20%", "0%"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          ></motion.div>
        </div>
        <div
          className='absolute left-1/2 top-1/2 mt-[-0.5px] flex w-[calc(300/16*1rem)] origin-left justify-end overflow-hidden'
          style={{ transform: "rotate(213.333deg)" }}
        >
          <motion.div
            data-line='true'
            className='h-px w-[calc((300*2)/16*1rem)] flex-none bg-[linear-gradient(to_right,_#545454_25%,transparent_25%,transparent_75%,_#545454_75%)] dark:bg-[linear-gradient(to_right,white_25%,transparent_25%,transparent_75%,white_75%)] bg-[25%_auto] opacity-12.5'
            style={{ transform: "translateX(60%)" }}
            animate={{ x: ["0%", "10%", "0%"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          ></motion.div>
        </div>
        <div
          className='absolute left-1/2 top-1/2 mt-[-0.5px] flex w-[calc(300/16*1rem)] origin-left justify-end overflow-hidden'
          style={{ transform: "rotate(26.6667deg)" }}
        >
          <motion.div
            data-line='true'
            className='h-px w-[calc((300*2)/16*1rem)] flex-none bg-[linear-gradient(to_right,_#545454_25%,transparent_25%,transparent_75%,_#545454_75%)] dark:bg-[linear-gradient(to_right,white_25%,transparent_25%,transparent_75%,white_75%)] bg-[25%_auto] opacity-12.5'
            style={{ transform: "translateX(62.5%)" }}
            animate={{ x: ["0%", "80%", "0%"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          ></motion.div>
        </div>
        <div
          className='absolute left-1/2 top-1/2 mt-[-0.5px] flex w-[calc(300/16*1rem)] origin-left justify-end overflow-hidden'
          style={{ transform: "rotate(53.3333deg)" }}
        >
          <motion.div
            data-line='true'
            className='h-px w-[calc((300*2)/16*1rem)] flex-none bg-[25%_auto] opacity-12.5 bg-[linear-gradient(to_right,_#545454_25%,transparent_25%,transparent_75%,_#545454_75%)] dark:bg-[linear-gradient(to_right,white_25%,transparent_25%,transparent_75%,white_75%)]'
            style={{ transform: "translateX(65%)" }}
            animate={{ x: ["0%", "10%", "0%"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          ></motion.div>
        </div>
      </div>
      <div
        className='absolute left-1/2 top-1/2 mt-[-0.5px] w-[calc(300/16*1rem)] origin-left overflow-hidden'
        style={{ transform: "rotate(0deg)" }}
      >
        <div
          className='h-px w-[calc(100/16*1rem)] bg-gradient-to-r from-[#545454]'
          style={{ transform: "translateX(12.5rem)", opacity: 0 }}
        ></div>
      </div>
      <div
        className='absolute left-1/2 top-1/2 mt-[-0.5px] w-[calc(300/16*1rem)] origin-left overflow-hidden'
        style={{ transform: "rotate(40deg)" }}
      >
        <div
          className='h-px w-[calc(100/16*1rem)] bg-gradient-to-r from-[#545454]'
          style={{ transform: "translateX(12.5rem)", opacity: 0 }}
        ></div>
      </div>
      <div
        className='absolute left-1/2 top-1/2 mt-[-0.5px] w-[calc(300/16*1rem)] origin-left overflow-hidden'
        style={{ transform: "rotate(80deg)" }}
      >
        <div
          className='h-px w-[calc(100/16*1rem)] bg-gradient-to-r from-[#545454]'
          style={{ transform: "translateX(12.5rem)", opacity: 0 }}
        ></div>
      </div>
      <div
        className='absolute left-1/2 top-1/2 mt-[-0.5px] w-[calc(300/16*1rem)] origin-left overflow-hidden'
        style={{ transform: "rotate(120deg)" }}
      >
        <div
          className='h-px w-[calc(100/16*1rem)] bg-gradient-to-r from-[#545454]'
          style={{ transform: "translateX(12.5rem)", opacity: 0 }}
        ></div>
      </div>
      <div
        className='absolute left-1/2 top-1/2 mt-[-0.5px] w-[calc(300/16*1rem)] origin-left overflow-hidden'
        style={{ transform: "rotate(160deg)" }}
      >
        <div
          className='h-px w-[calc(100/16*1rem)] bg-gradient-to-r from-[#545454]'
          style={{ transform: "translateX(12.5rem)", opacity: 0 }}
        ></div>
      </div>
      <div
        className='absolute left-1/2 top-1/2 mt-[-0.5px] w-[calc(300/16*1rem)] origin-left overflow-hidden'
        style={{ transform: "rotate(200deg)" }}
      >
        <div
          className='h-px w-[calc(100/16*1rem)] bg-gradient-to-r from-[#545454]'
          style={{ transform: "translateX(12.5rem)", opacity: 0 }}
        ></div>
      </div>
      <div
        className='absolute left-1/2 top-1/2 mt-[-0.5px] w-[calc(300/16*1rem)] origin-left overflow-hidden'
        style={{ transform: "rotate(240deg)" }}
      >
        <div
          className='h-px w-[calc(100/16*1rem)] bg-gradient-to-r from-[#545454]'
          style={{ transform: "translateX(12.5rem)", opacity: 0 }}
        ></div>
      </div>
      <div
        className='absolute left-1/2 top-1/2 mt-[-0.5px] w-[calc(300/16*1rem)] origin-left overflow-hidden'
        style={{ transform: "rotate(280deg)" }}
      >
        <div
          className='h-px w-[calc(100/16*1rem)] bg-gradient-to-r from-[#545454]'
          style={{ transform: "translateX(12.5rem)", opacity: 0 }}
        ></div>
      </div>
      <div
        className='absolute left-1/2 top-1/2 mt-[-0.5px] w-[calc(300/16*1rem)] origin-left overflow-hidden'
        style={{ transform: "rotate(320deg)" }}
      >
        <div
          className='h-px w-[calc(100/16*1rem)] bg-gradient-to-r from-[#545454]'
          style={{ transform: "translateX(12.5rem)", opacity: 0 }}
        ></div>
      </div>
      <svg width='0' height='0' style={{ position: "absolute" }}>
        <mask id='shield-mask' maskUnits='userSpaceOnUse'>
          <rect width='104' height='122' fill='black' />
          <path
            d='m9.853 14.128 38-12.264a13.5 13.5 0 0 1 8.294 0l38 12.264a13.5 13.5 0 0 1 9.353 12.848v36.766a47.5 47.5 0 0 1-23.186 40.805L57.887 117.91a11.498 11.498 0 0 1-11.773.001l-22.428-13.364A47.5 47.5 0 0 1 .5 63.742V26.976a13.5 13.5 0 0 1 9.353-12.848Z'
            fill='white'
          />
        </mask>
      </svg>
      <div
        className='absolute inset-0 bg-gradient-to-b from-white/10 to-white/[0.03] to-55% backdrop-blur-[3.5px]'
        style={{ mask: "url(#shield-mask)", WebkitMask: "url(#shield-mask)" }}
      ></div>
      <svg
        viewBox='0 0 104 122'
        aria-hidden='true'
        fill='none'
        className='absolute inset-0 size-full'
      >
        <path
          stroke='#fff'
          stroke-opacity='.03'
          d='m9.853 14.128 38-12.264a13.5 13.5 0 0 1 8.294 0l38 12.264a13.5 13.5 0 0 1 9.353 12.848v36.766a47.5 47.5 0 0 1-23.186 40.805L57.887 117.91a11.498 11.498 0 0 1-11.773.001l-22.428-13.364A47.5 47.5 0 0 1 .5 63.742V26.976a13.5 13.5 0 0 1 9.353-12.848Z'
        ></path>
      </svg>
      <svg
        viewBox='0 0 104 122'
        aria-hidden='true'
        className='absolute inset-0 size-full'
        fill='none'
      >
        <g filter='url(#filter0_dii_599_187)'>
          <path
            fill='url(#paint0_linear_599_187)'
            d='m50.145 9.603-38 12.356A6 6 0 0 0 8 27.665v37.412a38 38 0 0 0 18.442 32.581l22.47 13.488a6 6 0 0 0 6.176 0l22.47-13.488A38 38 0 0 0 96 65.078V27.664a6 6 0 0 0-4.145-5.706l-38-12.356a6 6 0 0 0-3.71 0Z'
          ></path>
          <path
            fill='url(#paint1_radial_599_187)'
            fill-opacity='.5'
            d='m50.145 9.603-38 12.356A6 6 0 0 0 8 27.665v37.412a38 38 0 0 0 18.442 32.581l22.47 13.488a6 6 0 0 0 6.176 0l22.47-13.488A38 38 0 0 0 96 65.078V27.664a6 6 0 0 0-4.145-5.706l-38-12.356a6 6 0 0 0-3.71 0Z'
            style={{ mixBlendMode: "plus-lighter" }}
          ></path>
        </g>
        <g filter='url(#filter1_d_599_187)' shape-rendering='crispEdges'>
          <path
            fill='#000'
            fill-opacity='.08'
            d='m51.052 15.316-35 11.657A3 3 0 0 0 14 29.819v35.024a33.616 33.616 0 0 0 16.008 28.635l20.944 12.878a2 2 0 0 0 2.096 0l20.944-12.878A33.615 33.615 0 0 0 90 64.843V29.819a3 3 0 0 0-2.052-2.846l-35-11.657a3 3 0 0 0-1.896 0Z'
          ></path>
          <path
            stroke='#000'
            stroke-opacity='.08'
            d='m16.21 27.447 35-11.657a2.5 2.5 0 0 1 1.58 0l35 11.657a2.5 2.5 0 0 1 1.71 2.372v35.024a33.115 33.115 0 0 1-15.77 28.209L52.786 105.93a1.501 1.501 0 0 1-1.572 0L30.27 93.052a33.115 33.115 0 0 1-15.77-28.21V29.82a2.5 2.5 0 0 1 1.71-2.372Z'
          ></path>
        </g>
        <g filter='url(#filter2_di_599_187)'>
          <path
            fill='url(#paint2_linear_599_187)'
            fill-rule='evenodd'
            d='M39 45c0-5.523 4.477-10 10-10h6c5.523 0 10 4.477 10 10v7c0 .552.451.991.996 1.082A6.002 6.002 0 0 1 71 59v18a6 6 0 0 1-6 6H39a6 6 0 0 1-6-6V59a6.002 6.002 0 0 1 5.004-5.918c.545-.09.996-.53.996-1.082v-7Zm22 7a1 1 0 0 1-1 1H44a1 1 0 0 1-1-1v-7a6 6 0 0 1 6-6h6a6 6 0 0 1 6 6v7ZM51 64a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-2Z'
            clip-rule='evenodd'
          ></path>
        </g>
        <g filter='url(#filter3_f_599_187)'>
          <path
            fill='url(#paint3_linear_599_187)'
            fill-opacity='.16'
            d='m50.145 9.603-38 12.356A6 6 0 0 0 8 27.665v37.412a38 38 0 0 0 18.442 32.581l22.47 13.488a6 6 0 0 0 6.176 0l22.47-13.488A38 38 0 0 0 96 65.078V27.664a6 6 0 0 0-4.145-5.706l-38-12.356a6 6 0 0 0-3.71 0Z'
            style={{ mixBlendMode: "plus-lighter" }}
          ></path>
        </g>
        <defs>
          <filter
            id='filter0_dii_599_187'
            width='96'
            height='110.693'
            x='3'
            y='6.309'
            color-interpolation-filters='sRGB'
            filterUnits='userSpaceOnUse'
          >
            <feFlood flood-opacity='0' result='BackgroundImageFix'></feFlood>
            <feColorMatrix
              in='SourceAlpha'
              result='hardAlpha'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            ></feColorMatrix>
            <feOffset dx='-1' dy='1'></feOffset>
            <feGaussianBlur stdDeviation='2'></feGaussianBlur>
            <feComposite in2='hardAlpha' operator='out'></feComposite>
            <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.29 0'></feColorMatrix>
            <feBlend in2='BackgroundImageFix' result='effect1_dropShadow_599_187'></feBlend>
            <feBlend in='SourceGraphic' in2='effect1_dropShadow_599_187' result='shape'></feBlend>
            <feColorMatrix
              in='SourceAlpha'
              result='hardAlpha'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            ></feColorMatrix>
            <feOffset dy='-1'></feOffset>
            <feGaussianBlur stdDeviation='.5'></feGaussianBlur>
            <feComposite in2='hardAlpha' k2='-1' k3='1' operator='arithmetic'></feComposite>
            <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0'></feColorMatrix>
            <feBlend in2='shape' result='effect2_innerShadow_599_187'></feBlend>
            <feColorMatrix
              in='SourceAlpha'
              result='hardAlpha'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            ></feColorMatrix>
            <feOffset dy='1'></feOffset>
            <feGaussianBlur stdDeviation='.5'></feGaussianBlur>
            <feComposite in2='hardAlpha' k2='-1' k3='1' operator='arithmetic'></feComposite>
            <feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.12 0'></feColorMatrix>
            <feBlend
              in2='effect2_innerShadow_599_187'
              mode='plus-lighter'
              result='effect3_innerShadow_599_187'
            ></feBlend>
          </filter>
          <filter
            id='filter1_d_599_187'
            width='76'
            height='92.49'
            x='14'
            y='15.162'
            color-interpolation-filters='sRGB'
            filterUnits='userSpaceOnUse'
          >
            <feFlood flood-opacity='0' result='BackgroundImageFix'></feFlood>
            <feColorMatrix
              in='SourceAlpha'
              result='hardAlpha'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            ></feColorMatrix>
            <feOffset dy='1'></feOffset>
            <feComposite in2='hardAlpha' operator='out'></feComposite>
            <feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.06 0'></feColorMatrix>
            <feBlend in2='BackgroundImageFix' result='effect1_dropShadow_599_187'></feBlend>
            <feBlend in='SourceGraphic' in2='effect1_dropShadow_599_187' result='shape'></feBlend>
          </filter>
          <filter
            id='filter2_di_599_187'
            width='40'
            height='50'
            x='32'
            y='35'
            color-interpolation-filters='sRGB'
            filterUnits='userSpaceOnUse'
          >
            <feFlood flood-opacity='0' result='BackgroundImageFix'></feFlood>
            <feColorMatrix
              in='SourceAlpha'
              result='hardAlpha'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            ></feColorMatrix>
            <feOffset dy='1'></feOffset>
            <feGaussianBlur stdDeviation='.5'></feGaussianBlur>
            <feComposite in2='hardAlpha' operator='out'></feComposite>
            <feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0'></feColorMatrix>
            <feBlend in2='BackgroundImageFix' result='effect1_dropShadow_599_187'></feBlend>
            <feBlend in='SourceGraphic' in2='effect1_dropShadow_599_187' result='shape'></feBlend>
            <feColorMatrix
              in='SourceAlpha'
              result='hardAlpha'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            ></feColorMatrix>
            <feOffset dy='1'></feOffset>
            <feGaussianBlur stdDeviation='1.5'></feGaussianBlur>
            <feComposite in2='hardAlpha' k2='-1' k3='1' operator='arithmetic'></feComposite>
            <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0'></feColorMatrix>
            <feBlend in2='shape' result='effect2_innerShadow_599_187'></feBlend>
          </filter>
          <filter
            id='filter3_f_599_187'
            width='94'
            height='108.693'
            x='5'
            y='6.309'
            color-interpolation-filters='sRGB'
            filterUnits='userSpaceOnUse'
          >
            <feFlood flood-opacity='0' result='BackgroundImageFix'></feFlood>
            <feBlend in='SourceGraphic' in2='BackgroundImageFix' result='shape'></feBlend>
            <feGaussianBlur
              result='effect1_foregroundBlur_599_187'
              stdDeviation='1.5'
            ></feGaussianBlur>
          </filter>
          <linearGradient
            id='paint0_linear_599_187'
            x1='52'
            x2='52'
            y1='9'
            y2='113'
            gradientUnits='userSpaceOnUse'
          >
            <stop stop-color='#797979'></stop>
            <stop offset='1' stop-color='#5E5E5E'></stop>
          </linearGradient>
          <linearGradient
            id='paint2_linear_599_187'
            x1='52'
            x2='52'
            y1='53'
            y2='83'
            gradientUnits='userSpaceOnUse'
          >
            <stop stop-color='#3D3D3D'></stop>
            <stop offset='1' stop-color='#424242'></stop>
          </linearGradient>
          <linearGradient
            id='paint3_linear_599_187'
            x1='8'
            x2='99.5'
            y1='9'
            y2='100.5'
            gradientUnits='userSpaceOnUse'
          >
            <stop offset='.5' stop-color='#fff'></stop>
            <stop offset='.5' stop-color='#fff' stop-opacity='0'></stop>
          </linearGradient>
          <radialGradient
            id='paint1_radial_599_187'
            cx='0'
            cy='0'
            r='1'
            gradientTransform='matrix(0 104 -156 0 52 9)'
            gradientUnits='userSpaceOnUse'
          >
            <stop stop-color='#fff'></stop>
            <stop offset='.614' stop-color='#fff' stop-opacity='0'></stop>
          </radialGradient>
        </defs>
      </svg>
    </div>
  )
}

export default Secure
