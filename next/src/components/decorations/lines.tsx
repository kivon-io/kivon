const Lines = () => {
  return (
    <>
      <div
        className='absolute opacity-30 inset-x-0 h-px -top-px bg-zinc-400/50 dark:bg-zinc-400/50'
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 1'%3E%3Crect width='1' height='1' fill='%404040'/%3E%3C/svg%3E')",
          maskImage:
            "linear-gradient(to right, transparent, white 4rem, white calc(100% - 4rem), transparent)",
          marginLeft: "-4rem",
          marginRight: "-4rem",
        }}
      ></div>
      <div
        className='absolute opacity-30 inset-y-0 w-px -right-px bg-zinc-400/50 dark:bg-zinc-400/50'
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 4'%3E%3Crect width='1' height='1' fill='%23212126'/%3E%3C/svg%3E')",
          maskImage:
            "linear-gradient(transparent, white 4rem, white calc(100% - 4rem), transparent)",
          marginTop: "-4rem",
          marginBottom: "-4rem",
        }}
      ></div>
      <div
        className='absolute opacity-30 inset-x-0 h-px -bottom-px bg-zinc-400/50 dark:bg-zinc-400/50'
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 1'%3E%3Crect width='1' height='1' fill='%23212126'/%3E%3C/svg%3E')",
          maskImage:
            "linear-gradient(to right, transparent, white 4rem, white calc(100% - 4rem), transparent)",
          marginLeft: "-4rem",
          marginRight: "-4rem",
        }}
      ></div>
      <div
        className='absolute opacity-30 inset-y-0 w-px -left-px bg-zinc-400/50 dark:bg-zinc-400/50'
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 4'%3E%3Crect width='1' height='1' fill='%23212126'/%3E%3C/svg%3E')",
          maskImage:
            "linear-gradient(transparent, white 4rem, white calc(100% - 4rem), transparent)",
          marginTop: "-4rem",
          marginBottom: "-4rem",
        }}
      ></div>
    </>
  )
}

export default Lines
