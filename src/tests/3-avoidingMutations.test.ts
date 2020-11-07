import {
  addCounter,
  incrementCounter,
  removeCounter,
} from "../getting-started/3-avoidingMutations"
import deepFreeze from "../utils/deepFreeze"

test("adds counter immutably", () => {
  const listBefore: number[] = []
  const listAfter = [0]

  deepFreeze(listBefore)

  expect(addCounter(listBefore)).toEqual(listAfter)
})

test("removes counter immutably", () => {
  const listBefore = [2, 1, 4, 5]
  const listAfter = [2, 1, 5]

  deepFreeze(listBefore)

  expect(removeCounter(listBefore, 2)).toEqual(listAfter)
})

test("increments counter immutably", () => {
  const listBefore = [0, 10, 20]
  const listAfter = [0, 10, 21]

  deepFreeze(listBefore)

  expect(incrementCounter(listBefore, 2)).toEqual(listAfter)
})
