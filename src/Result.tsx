import React from 'react'
import { Reading } from './use-measure-endpoint'
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
    .find(([, threshold]) => ms <= threshold)![0] as Thresholds

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

export const getCacheHit = (boolean: boolean | undefined) => {
  if (boolean === undefined) return ''

  return boolean ? '✓' : '⨯'
}

type ResultProps = {
  value?: Reading
}

const Result = ({ value }: ResultProps) => (
  <div className="relative flex items-center w-full">
    <progress
      className={`absolute -z-1 w-full overflow-hidden rounded-full  [&::-webkit-progress-bar]:bg-slate-300 ${
        value ? colours[getRating(value.duration)] : '[&::-webkit-progress-value]:bg-blue-500'
      }`}
      value={value?.duration}
      max={MAX_MS}
    />

    {!!value && (
      <div className="ml-2 text-sm flex items-center w-full">
        {`${value.duration.toFixed(0)}ms`}

        <div className="text-sm mr-2 ml-auto">{getCacheHit(value?.cacheHit)}</div>
      </div>
    )}
  </div>
)

export default Result
