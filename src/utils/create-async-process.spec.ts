import { isRef } from 'vue'
import createAsyncProcess from './create-async-process'

describe('# Create async process', function () {
  const someProcess = (): Promise<null> => Promise.resolve(null)

  it('should expect active as Vue Ref type', function () {
    const { active } = createAsyncProcess(someProcess)

    cy.wrap(isRef(active)).should('be.true')
  })

  it('should correctly test active functionality', async function () {
    const { active, run } = createAsyncProcess(someProcess)

    cy.wrap(active.value).should('be.false')

    void run()

    cy.wrap(active.value).should('be.true')

    cy.wrap(active.value).should('be.false')
  })

  it('should expect run as a function', function () {
    const { run } = createAsyncProcess(someProcess)

    cy.wrap(run).should('be.instanceOf', Function)
  })

  it('should expect original function called with correct params and return correct data', async function () {
    const someProcess = cy.stub().callsFake(a => Promise.resolve({ a, b: null }))
    const { run } = createAsyncProcess(someProcess)

    const result = await run(null)

    cy.wrap(someProcess).should('be.calledWith', null)
    cy.wrap(result).should('eq', { a: null, b: null })
  })
})
