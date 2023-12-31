import students from '../fixtures/students.json'

import studentPage from '../support/pages/StudentPage'

describe('alunos', () => {

    it('deve poder cadastrar um novo aluno', () => {
        const student = students.create

        //cy.task('deleteStudent', student.email)
        cy.deleteStudent(student.email)

        cy.adminLogin()

        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.popup.haveText('Dados cadastrados com sucesso.')

    })

    it('não deve cadastrar com email duplicado', () => {
        const student = students.duplicate

        //cy.task('resetStudent', student)
        cy.resetStudent(student)
        cy.adminLogin()

        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.popup.haveText('O email informado já foi cadastrado!')

    })

    it('deve remover um aluno sem matricula', () => {
        const student = students.remove

        //cy.task('resetStudent', student)
        cy.resetStudent(student)

        cy.adminLogin()

        studentPage.search(student.name)
        studentPage.remove(student.email)
        studentPage.popup.confirm()
        studentPage.popup.haveText('Exclusão realizada com sucesso.')

    })

    it('todos os campos são obrigatórios', () => {
        const student = students.required

        cy.adminLogin()
        
        studentPage.goToRegister()
        studentPage.submitForm(student)

        studentPage.alertMessage('Nome completo', 'Nome é obrigatório')
        studentPage.alertMessage('E-mail', 'O email é obrigatório')
        studentPage.alertMessage('Idade', 'A idade é obrigatória')
        studentPage.alertMessage('Peso (em kg)', 'O peso é obrigatório')
        studentPage.alertMessage('Altura', 'A altura é obrigatória')

    })

    it('Não deve cadastrar aluno com idade menor que 16', () => {
        const student = students.inv_min_age

        cy.adminLogin()

        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.alertMessage('Idade', 'A idade mínima para treinar é 16 anos!')

    })

    it('Não deve cadastrar aluno com idade maior que 90', () => {
        const student = students.inv_max_age

        cy.adminLogin()

        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.alertMessage('Idade', 'A idade máxima para treinar é 90 anos!')

    })

    it('Não deve cadastrar aluno com peso menor ou igual a 0', () => {
        const student = students.inv_weight

        cy.adminLogin()

        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.alertMessage('Peso', 'O peso deve ser maior que 0')

    })

    it('Não deve cadastrar aluno com altura menor ou igual a 0', () => {
        const student = students.inv_feet_tall

        cy.adminLogin()

        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.alertMessage('Altura', 'A altura deve ser maior que 0')
    })

})