import data from '../fixtures/questions.json'

import questionsPage from '../support/pages/questionsPage'

describe('Receber perguntas', () => {

    it('Deve poder recber uma notificação com uma pergunta do aluno', () => {

        const dataTest = data.create

        cy.deleteQuestion()
        cy.resetStudent(dataTest.student)
        cy.createEnroll(dataTest)
        cy.createQuestion(dataTest.notification)

        cy.adminLogin()
        questionsPage.navbar.goToNotifications()
        questionsPage.checkNotifications(dataTest.notification)

    })

    it('deve poder responder uma pergunta de alunos', () => {

        const dataTest = data.response

        cy.deleteQuestion()
        cy.resetStudent(dataTest.student)
        cy.createEnroll(dataTest)
        cy.createQuestion(dataTest.notification.question)

        cy.adminLogin()
        questionsPage.navbar.goToNotifications()
        questionsPage.selectQuestion()
        questionsPage.submitAnswer(dataTest.notification.answer)

        questionsPage.popup.haveText('Resposta enviada com sucesso')

    })

})