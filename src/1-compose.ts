import {
  // createStore,
  // combineReducers,
  compose,
  // applyMiddleware,
} from "redux"

const makeLouder = (string: string) => string.toUpperCase()
const repeatThreeTimes = (string: string) => string.repeat(3)
const embolden = (string: string) => string.bold()

const makeLouderAndBoldAndRepeatThreeTimes = compose(
  repeatThreeTimes,
  embolden,
  makeLouder
)

console.log(makeLouderAndBoldAndRepeatThreeTimes("hello"))
