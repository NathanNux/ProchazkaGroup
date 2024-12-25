// utils.js
import clsx from "clsx"
import { twMerge } from "tailwind-merge"

export function cx(...args) {
  return twMerge(clsx(...args))
}

export const focusInput = [
  // base
  "focus:ring-2",
  // ring color
  "focus:ring-blue-200 focus:dark:ring-blue-700/30", 
  // border color
  "focus:border-blue-500 focus:dark:border-blue-700",
]

export const focusRing = [
  // base
  "outline outline-offset-2 outline-0 focus-visible:outline-2",
  // outline color
  "outline-blue-500 dark:outline-blue-500",
]

export const hasErrorInput = [
  // base
  "ring-2",
  // border color 
  "border-red-500 dark:border-red-700",
  // ring color
  "ring-red-200 dark:ring-red-700/30",
]

// chartUtils.js
export const chartColors = {
  blue: {
    bg: "bg-blue-500",
    stroke: "stroke-blue-500", 
    fill: "fill-blue-500",
    text: "text-blue-500"
  },
  customGray: {
    bg: "bg-[#5E758D]",
    stroke: "stroke-[#5E758D]", 
    fill: "fill-[#5E758D]",
    text: "text-[#5E758D]"
  },
  customCyan: {
    bg: "bg-[#00F0FF]",
    stroke: "stroke-[#00F0FF]",
    fill: "fill-[#00F0FF]",
    text: "text-[#00F0FF]"
  }
}

export const getColorClassName = (color, type) => {
  const fallbackColor = {
    bg: "bg-gray-500",
    stroke: "stroke-gray-500",
    fill: "fill-gray-500", 
    text: "text-gray-500"
  }
  return chartColors[color]?.[type] ?? fallbackColor[type]
}

export const constructCategoryColors = (categories, colors) => {
  const categoryColors = new Map()
  categories.forEach((category, index) => {
    categoryColors.set(category, colors[index % colors.length])
  })
  return categoryColors
}