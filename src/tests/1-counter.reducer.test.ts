import { counter } from "../getting-started/1-counterReducer"

test("increments 0", () => {
  expect(
    counter(0, {
      type: "INCREMENT",
    })
  ).toBe(1)
})

test("increments 1", () => {
  expect(
    counter(1, {
      type: "INCREMENT",
    })
  ).toBe(2)
})

test("decrements 2", () => {
  expect(
    counter(2, {
      type: "DECREMENT",
    })
  ).toBe(1)
})

test("decrements 1", () => {
  expect(
    counter(1, {
      type: "DECREMENT",
    })
  ).toBe(0)
})

test("returns default", () => {
  expect(
    counter(10, {
      type: "SOMETHING_ELSE",
    })
  ).toBe(10)
})

test("returns initial", () => {
  expect(counter(undefined, { type: "" })).toBe(0)
})
