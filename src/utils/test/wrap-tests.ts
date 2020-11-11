interface WrapTestsProps <Item> {
  task: string
  list: Item[]
  fn: (item: Item) => void
  only?: boolean
  testName?: (item: Item, index: number) => string
}

function wrapTests<Item> ({ task, list, fn, testName, only = false }: WrapTestsProps<Item>): void {
  const descFn = only ? describe.only : describe

  descFn(task, () => {
    list.forEach((item, index) => {
      const name = testName !== undefined ? testName(item, index) : ''
      it(name, () => fn(item))
    })
  })
}
wrapTests.only = function <Item> ({ task, list, fn, testName }: WrapTestsProps<Item>): ReturnType<typeof wrapTests> {
  wrapTests({ task, list, fn, testName, only: true })
}

export default wrapTests
