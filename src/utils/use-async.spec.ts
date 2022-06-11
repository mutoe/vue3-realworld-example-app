import { isRef } from 'vue'
import useAsync from 'src/utils/use-async'

describe('# Create async process', () => {
  const someProcess = (): Promise<null> => Promise.resolve(null)

  it('should expect active as Vue Ref type', () => {
    const { active } = useAsync(someProcess)

    expect(isRef(active)).to.be.true
  })

  it('should correctly test active functionality', async () => {
    const { active, run } = useAsync(someProcess)

    expect(active.value).to.be.false

    const promise = run()

    expect(active.value).to.be.true

    await promise

    expect(active.value).to.be.false
  })

  it('should expect run as a function', () => {
    const { run } = useAsync(someProcess)

    expect(run).to.be.instanceof(Function)
  })

  it('should expect original function called with correct params and return correct data', () => {
    const someProcess = cy.stub().returns(Promise.resolve({ a: 1, b: null }))
    const { run } = useAsync(someProcess)

    cy.wrap(run(null))
      .its('a')
      .should('to.be', 1)
      .its('b')
      .should('to.be', null)

    expect(someProcess).to.be.calledWith(null)
  })
})
