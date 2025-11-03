import { loginPage } from "./pageObjects/loginPage";

// Comando general de login
Cypress.Commands.add("login", (user) => {
  cy.visit("/");

  cy.get(loginPage.inputDocument).type(user.document);
  cy.get(loginPage.inputPassword).type(user.password);
  cy.get(loginPage.btnLogin).click();

  // Validar que los datos del usuario aparezcan
  cy.get(loginPage.labelUserName, { timeout: 10000 }).should(
    "contain.text",
    user.name
  );

  cy.get(loginPage.labelRole, { timeout: 10000 }).should(
    "contain.text",
    user.role
  );
});