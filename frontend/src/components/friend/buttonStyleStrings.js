const positiveButtonTW = `
    text-white text-sm font-medium
    w-full h-11 rounded-lg
    bg-[#4087ca] hover:bg-[#4d76b2]
    focus:ring-2 focus:outline-none focus:ring-sky-300
    dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800`

const negativeButtonTW = `
    text-[#282828d3] text-sm 
    w-full h-11 rounded-lg
    bg-gray-200 hover:bg-gray-300
    focus:ring-2 focus:outline-none focus:ring-sky-300
    dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800
`

const buttonInheritTW = `
    w-full h-full rounded-lg px-7 py-2.5 text-center
    flex items-center justify-center
    bg-inherit hover:bg-inherit
    focus:ring-2 focus:outline-none focus:ring-inherit
    dark:bg-inherit dark:hover:bg-inherit dark:focus:ring-inherit
`

export {positiveButtonTW, negativeButtonTW, buttonInheritTW}