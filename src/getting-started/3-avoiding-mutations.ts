export const addCounter = (list: number[]): number[] => {
  // return list.concat([0])
  return [...list, 0]
}

export const removeCounter = (list: number[], index: number): number[] => {
  return [...list.slice(0, index), ...list.slice(index + 1)]
}

export const incrementCounter = (list: number[], index: number): number[] => {
  // Slowest implementation
  // return list.map((item, i) => (index === i ? item + 1 : item))

  // Faster, more concise, but speed is semi-random
  // return [...list.slice(0, index), list[index] + 1, ...list.slice(index + 1)]

  // Fastest, consistent execution time
  return list
    .slice(0, index)
    .concat(list[index] + 1)
    .concat(...list.slice(index + 1))
}
