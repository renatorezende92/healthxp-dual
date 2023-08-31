import navbar from "./components/Navbar";
import popup from "./components/Popup";

class QuestionsPage {

    constructor() {
        this.navbar = navbar
        this.popup = popup
    }

    selectQuestion(question) {
        cy.get('aside .scrollbar-container')
            .parent()
            .find('p')
            .click(question)
    }

    submitAnswer(answer) {
        cy.get('textarea[name=answer]').type(answer)

        cy.contains('button', 'Enviar resposta').click()
    }

    checkNotifications(question) {
        cy.get('aside .scrollbar-container')
            .parent()
            .find('p')
            .should('have.text', question)
    }

}

export default new QuestionsPage()