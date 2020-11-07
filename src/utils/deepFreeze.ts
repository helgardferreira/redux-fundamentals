export default function deepFreeze<T extends Record<string, any>>(
  object: T
): T {
  Object.keys(object).forEach(key => {
    if (typeof object[key] === "object") deepFreeze(object[key])
  })

  return Object.freeze(object)
}
