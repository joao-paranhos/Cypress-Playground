describe('Spec criada para realizar os exercicios do cypress playground', () => {
  
  beforeEach(()=>{
    cy.visit('https://cypress-playground.s3.eu-central-1.amazonaws.com/index.html')
  })
  it('Utilizando o comando click para clicar em um botão', () => {
      cy.contains('button','Subscribe').click()
      cy.contains('span',"You've been successfully subscribed to our newsletter.").should('be.visible')
  })

  it('Utilizando o comando type para digitar em um campo do tipo input',()=>{
    cy.get('#signature-textarea').type('Cypress Assinatura')
    cy.contains('#signature','Cypress Assinatura').should('be.visible')
  })
})