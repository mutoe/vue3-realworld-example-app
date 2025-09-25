/* eslint-disable ts/no-unsafe-function-type,ts/no-unsafe-return */
import { test } from '../extends'

export function step(target: Function, context: ClassMethodDecoratorContext) {
  return async function replacementMethod(this: Function, ...args: unknown[]) {
    const className = this.constructor.name
    const name = `${className.replace(/PageObject$/, '')}.${context.name as string}`
    return await test.step(name, async () => {
      return await target.call(this, ...args)
    })
  }
}

export function boxedStep(target: Function, context: ClassMethodDecoratorContext) {
  return async function replacementMethod(this: Function, ...args: unknown[]) {
    const className = this.constructor.name
    const name = `${className.replace(/PageObject$/, '')}.${context.name as string}`
    return await test.step(name, async () => {
      return await target.call(this, ...args)
    }, { box: true })
  }
}
