import users from '../fixtures/users.json'

import loginPage from './pages/LoginPage'
import studentPage from './pages/StudentPage'

Cypress.Commands.add('adminLogin', () => {

    const user = users.admin

    loginPage.doLogin(user)
    studentPage.navbar.userLoggedIn(user.name)

})

Cypress.Commands.add('createEnroll', (dataTest) => {

    cy.task('selectStudentId', dataTest.student.email)
        .then(result => {

            cy.request({
                url: 'http://localhost:3333/sessions',
                method: 'POST',
                body: {
                    email: users.admin.email,
                    password: users.admin.password
                }
            }).then(response => {
                cy.log(response.body.token)

                const payload = {
                    student_id: result.success.rows[0].id,
                    plan_id: dataTest.plan.id,
                    credit_card: "4242"
                }

                cy.request({
                    url: 'http://localhost:3333/enrollments',
                    method: 'POST',
                    body: payload,
                    headers: {
                        Authorization: 'Bearer ' + response.body.token
                    }
                })
            }).then(response => {
                expect(response.status).to.eq(201)
            })

        })
})

Cypress.Commands.add('resetStudent', (student) => {
    cy.request({
        url: 'http://localhost:5555/students',
        method: 'POST',
        body: student
    }).then(response => {
        expect(response.status).to.eq(201)
    })
})

Cypress.Commands.add('deleteStudent', (studentEmail) => {
    cy.request({
        url: 'http://localhost:5555/students/' + studentEmail,
        method: 'DELETE',
    }).then(response => {
        expect(response.status).to.eq(204)
    })
})