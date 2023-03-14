import React from 'react'
import { QandASection } from './index'

describe('<QandASection />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<QandASection />)
  })
})