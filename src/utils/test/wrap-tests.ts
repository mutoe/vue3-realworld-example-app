/* eslint-disable @typescript-eslint/ban-ts-comment */

interface WrapTestsProps <Item> {
  task: string
  list: Item[]
  fn: (item: Item) => void
  only?: boolean
  testName?: (item: Item, index: number) => string
}

function wrapTests<Item> ({ task, list, fn, testName, only = false }: WrapTestsProps<Item>): void {
  // @ts-ignore
  const descFn = only ? context.only : context

  descFn(task, () => {
    for (const [index, item] of list.entries()) {
      const name = testName !== undefined ? testName(item, index) : ''
      // @ts-ignore
      it(name, () => fn(item))
    }
  })
}
wrapTests.only = function <Item> ({ task, list, fn, testName }: WrapTestsProps<Item>): ReturnType<typeof wrapTests> {
  wrapTests({ task, list, fn, testName, only: true })
}

export default wrapTests
