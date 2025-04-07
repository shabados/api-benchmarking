import React from 'react'

const MAX_MS = 700

const toPercent = (ms: number) => (ms / MAX_MS) * 100

const thresholds = {
  ideal: 50,
  good: 100,
  ok: 150,
  bad: 300,
  awful: Infinity,
} as const

type Thresholds = keyof typeof thresholds

const getRating = (ms: number) =>
  Object.entries(thresholds)
    .sort(([, v1], [, v2]) => v1 - v2)
    .find(([, threshold]) => ms < threshold)![0] as Thresholds

const colours: { [key in Thresholds]: ProgressProps['colorScheme'] } = {
  ideal: 'green',
  good: 'green',
  ok: 'yellow',
  bad: 'orange',
  awful: 'red',
}

type ResultProps = {
  value?: number
}

const Result = ({ value }: ResultProps) => (
  <>
    {!!value && <span>{`${value.toFixed(0)}ms`}</span>}

    <progress className="w-full" value={value} max={MAX_MS} color={value ? colours[getRating(value)] : 'blue'} />
  </>
)

export default Result
