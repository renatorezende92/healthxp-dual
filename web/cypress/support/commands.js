import users from '../fixtures/users.json'

import loginPage from './pages/LoginPage'
import studentPage from './pages/StudentPage'

Cypress.Commands.add('adminLogin', () => {

    const user = users.admin

    loginPage.doLogin(user)
    studentPage.navbar.userLoggedIn(user.name)

})

Cypress.Commands.add('createQuestion', (question) => {
    cy.request({
        url: Cypress.env('apiUrl') + `/students/${Cypress.env('studentId')}/help-orders`,
        method: 'POST',
        body: { question }
    }).then(response => {
        expect(response.status).to.eq(201)
    })
})

Cypress.Commands.add('createEnroll', (dataTest) => {

    cy.request({
        url: Cypress.env('apiHelper') + '/enrolls',
        method: 'POST',
        body: {
            email: dataTest.student.email,
            plan_id: dataTest.plan.id,
            price: dataTest.plan.price
        }
    }).then(response => {
        expect(response.status).to.eq(201)
    })

    // cy.task('selectStudentId', dataTest.student.email)
    //     .then(result => {

    //         cy.request({
    //             url: 'http://localhost:3333/sessions',
    //             method: 'POST',
    //             body: {
    //                 email: users.admin.email,
    //                 password: users.admin.password
    //             }
    //         }).then(response => {
    //             cy.log(response.body.token)

    //             const payload = {
    //                 student_id: result.success.rows[0].id,
    //                 plan_id: dataTest.plan.id,
    //                 credit_card: "4242"
    //             }

    //             cy.request({
    //                 url: 'http://localhost:3333/enrollments',
    //                 method: 'POST',
    //                 body: payload,
    //                 headers: {
    //                     Authorization: 'Bearer ' + response.body.token
    //                 }
    //             })
    //         }).then(response => {
    //             expect(response.status).to.eq(201)
    //         })

    //     })
})

Cypress.Commands.add('resetStudent', (student) => {
    cy.request({
        url: Cypress.env('apiHelper') + '/students',
        method: 'POST',
        body: student
    }).then(response => {
        expect(response.status).to.eq(201)
        cy.log(response.body.student_id)
        Cypress.env('studentId', response.body.student_id)
    })
})

Cypress.Commands.add('deleteStudent', (studentEmail) => {
    cy.request({
        url: Cypress.env('apiHelper') + '/students/' + studentEmail,
        method: 'DELETE',
    }).then(response => {
        expect(response.status).to.eq(204)
    })
})