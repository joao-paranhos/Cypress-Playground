describe('Spec criada para realizar os exercicios do cypress playground', () => {

  beforeEach(() => {
    cy.visit('https://cypress-playground.s3.eu-central-1.amazonaws.com/index.html')
  })
  it('Utilizando o comando click para clicar em um botão', () => {
    cy.contains('button', 'Subscribe').click()
    cy.contains('span', "You've been successfully subscribed to our newsletter.").should('be.visible')
  })

  it('Utilizando o comando type para digitar em um campo do tipo input', () => {
    cy.get('#signature-textarea').type('Cypress Assinatura')
    cy.contains('#signature', 'Cypress Assinatura').should('be.visible')
  })

  it('Utilizando o comando check e uncheck para marca e desmarcar seletores de checkbox', () => {
    cy.get('#signature-textarea-with-checkbox').type('Cypress é top!')
    cy.get('#signature-checkbox').check()
    cy.contains('#signature-triggered-by-check', 'Cypress é top!').should('be.visible')
    cy.get('#signature-checkbox').uncheck()
    cy.get('#signature-triggered-by-check').should('not.be.visible')

  })
  it('Utilizando o comando check para marcar elementos do tipo radio', () => {

    cy.contains('#on-off', 'ON').should('be.visible')
    cy.get('#off').check()
    cy.contains('#on-off', 'OF').should('be.visible')
    cy.get('#on').check()
    cy.contains('#on-off', 'ON').should('be.visible')

  })

  it('Utilizando o comando Select para selecionar elementos dentro de uma lista', () => {
    cy.get('#fruit').select(['Apple', 'Banana', 'Cherry']) //Utilizando o conteudo dentro da lista
    cy.contains('#fruits-paragraph', "You've selected the following fruits: apple, banana, cherry").should('be.visible')
    cy.get('#fruit').select([0, 1, 2]) //Utilizando o index dos conteudos
    cy.contains('#fruits-paragraph', "You've selected the following fruits: apple, banana, cherry").should('be.visible')
    cy.get('#fruit').select(['apple', 'banana', 'cherry']) //Utilizando os valores (values) dos elementos
    cy.contains('#fruits-paragraph', "You've selected the following fruits: apple, banana, cherry").should('be.visible')
  })

  it('Comando select para lista suspensas', () => {

    cy.get('select[name="selection-type"]').select('Basic')
    cy.contains('#select-selection', "You've selected: BASIC").should('be.visible')
    cy.get('select[name="selection-type"]').select('Standard')
    cy.contains('#select-selection', "You've selected: STANDARD").should('be.visible')
    cy.get('select[name="selection-type"]').select('VIP')
    cy.contains('#select-selection', "You've selected: VIP").should('be.visible')


  })

  it('Utilizando o comando selectFile para selecionar um arquivo', () => {
    cy.get('input[type="file"]').selectFile('./cypress/fixtures/example.json')
  })

  it('Utilizando o intercept para capturar uma requisição', () => {

    cy.contains('button', 'Get TODO').click()
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/todos/1').as('getTodo')
    cy.wait('@getTodo').its('response.statusCode').should('be.equal', 200)
    cy.contains('li', 'TODO ID: 1').should('be.visible')
    cy.contains('li', 'Title: delectus aut autem').should('be.visible')
    cy.contains('li', 'Completed: false').should('be.visible')
    cy.contains('li', 'User ID: 1').should('be.visible')
  })

  it('Utilizando o intercept para capturar uma requisição e manipular os dados com fixtures', () => {


    const dados = require('../fixtures/todo.json')
    cy.contains('button','Get TODO').click()
    cy.intercept('GET','https://jsonplaceholder.typicode.com/todos/1',{fixture: 'todo.json'}).as('getTodo')
    cy.wait('@getTodo').its('response.statusCode').should('eq',200)
    cy.contains('li', `TODO ID: ${dados.id}`).should('be.visible')
    cy.contains('li', `Title: ${dados.title}`).should('be.visible')
    cy.contains('li', `Completed: ${dados.completed}`).should('be.visible')
    cy.contains('li', `User ID: ${dados.userId}`).should('be.visible')
  })
  it('Simulando falha na rede',()=>{

  cy.contains('button','Get TODO').click()
  cy.intercept('GET','https://jsonplaceholder.typicode.com/todos/1',{forceNetworkError: true}).as('getTodo')
  cy.wait('@getTodo')
  cy.contains('span','Oops, something went wrong. Check your internet connection, refresh the page, and try again.')
    .should('be.visible')
  })

})
