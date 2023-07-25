import users from '../fixtures/users.json'

import loginPage from './pages/LoginPage'
import studentPage from './pages/StudentPage'

Cypress.Commands.add('adminLogin', () => {

    const user = users.admin

    loginPage.doLogin(user)
    studentPage.navbar.userLoggedIn(user.name)

})