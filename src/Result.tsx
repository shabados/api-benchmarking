import React from 'react'

export const thresholds = {
  ideal: 50,
  good: 100,
  ok: 150,
  bad: 300,
  awful: Infinity,
} as const

const MAX_MS = thresholds.bad + 50

type Thresholds = keyof typeof thresholds

const getRating = (ms: number) =>
  Object.entries(thresholds)
    .sort(([, v1], [, v2]) => v1 - v2)
    .find(([, threshold]) => ms < threshold)![0] as Thresholds

export const colours: { [key in Thresholds]: string } = {
  ideal: '[&::-webkit-progress-value]:bg-green-500 bg-green-500',
  good: '[&::-webkit-progress-value]:bg-teal-500 bg-teal-500',
  ok: '[&::-webkit-progress-value]:bg-yellow-500 bg-yellow-500',
  bad: '[&::-webkit-progress-value]:bg-orange-500 bg-orange-500',
  awful: '[&::-webkit-progress-value]:bg-red-500 bg-red-500',
}

export const msKey = Object.fromEntries(
  Object.entries(thresholds).map(([key, value]) => [key, { ms: value, class: colours[key] }])
)

type ResultProps = {
  value?: number
}

const Result = ({ value }: ResultProps) => (
  <div className="flex items-center w-full">
    <progress
      className={`flex-1 overflow-hidden rounded-full  [&::-webkit-progress-bar]:bg-slate-300 ${
        value ? colours[getRating(value)] : '[&::-webkit-progress-value]:bg-blue-500'
      }`}
      value={value}
      max={MAX_MS}
    />
    {!!value && <span className="text-sm mx-4">{`${value.toFixed(0)}ms`}</span>}
  </div>
)

export default Result
