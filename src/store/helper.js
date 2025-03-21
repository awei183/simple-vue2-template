import { snakeCase } from 'lodash-es'

export function createMutations(state) {
  return Object.fromEntries(
    Object.entries(state).map(([key]) => [snakeCase(`set_${key}`).toUpperCase(), (st, val) => (st[key] = val)]),
  )
}
