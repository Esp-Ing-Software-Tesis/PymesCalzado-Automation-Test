import { loginPage } from "../support/pageObjects/loginPage";

describe("Pruebas login - Pymes de Calzado", function () {
  beforeEach(function () {
    cy.visit("/");
    // Cargar fixture y asignar alias
    cy.fixture("users.json").as("users");
  });

  it("Inicio de sesion exitoso - Gerente", function () {
    const gerente = this.users.userManager;

    cy.get(loginPage.inputDocument).type(gerente.document);
    cy.get(loginPage.inputPassword).type(gerente.password);
    cy.get(loginPage.btnLogin).click();

    cy.get(loginPage.labelUserName, { timeout: 10000 }).should(
      "contain.text",
      gerente.name
    );

    cy.get(loginPage.labelRole, { timeout: 10000 }).should(
      "contain.text",
      gerente.role
    );

    cy.get(loginPage.btnLogout).click();
    cy.url().should("include", "/login");
  });

  it("Inicio de sesion exitoso - Administrador", function () {
    const admin = this.users.userAdmin;

    cy.get(loginPage.inputDocument).type(admin.document);
    cy.get(loginPage.inputPassword).type(admin.password);
    cy.get(loginPage.btnLogin).click();

    cy.get(loginPage.labelUserName, { timeout: 10000 }).should(
      "contain.text",
      admin.name
    );

    cy.get(loginPage.labelRole, { timeout: 10000 }).should(
      "contain.text",
      admin.role
    );

    cy.get(loginPage.btnLogout).click();
    cy.url().should("include", "/login");
  });

  it("Inicio de sesion exitoso - Operario", function () {
    const operator = this.users.userOperator;

    cy.get(loginPage.inputDocument).type(operator.document);
    cy.get(loginPage.inputPassword).type(operator.password);
    cy.get(loginPage.btnLogin).click();

    cy.get(loginPage.labelUserName, { timeout: 10000 }).should(
      "contain.text",
      operator.name
    );

    cy.get(loginPage.labelRole, { timeout: 10000 }).should(
      "contain.text",
      operator.role
    );

    cy.get(loginPage.labelProductionLine, { timeout: 10000 }).should(
      "contain.text",
      operator.productionLine
    );

    cy.get(loginPage.btnLogout).click();
    cy.url().should("include", "/login");
  });

  it("Inicio de sesion fallido por usuario inexistente", function () {
    const user = this.users.usuarioInvalido;

    cy.get(loginPage.inputDocument).type(user.document);
    cy.get(loginPage.inputPassword).type(user.password);
    cy.get(loginPage.btnLogin).click();

    cy.get(loginPage.alertError, { timeout: 10000 }).should(
      "contain.text",
      "Número de documento o contraseña incorrectos"
    );
  });

  it("Inicio de sesion fallido por contraseña incorrecta", function () {
    const user = this.users.passwordIncorrecto;

    cy.get(loginPage.inputDocument).type(user.document);
    cy.get(loginPage.inputPassword).type(user.password);
    cy.get(loginPage.btnLogin).click();

    cy.get(loginPage.alertError, { timeout: 10000 }).should(
      "contain.text",
      "Ocurrió un error al iniciar sesión. Inténtalo nuevamente."
    );
  });

  it("Inicio de sesion fallido por datos mal ingresados", function () {
    const user = this.users.dataIncorrecta;

    cy.get(loginPage.inputDocument).type(user.document);
    cy.get(loginPage.inputPassword).type(user.password);
    cy.get(loginPage.btnLogin).click();

    cy.get(loginPage.alertError, { timeout: 10000 }).should(
      "contain.text",
      "Ocurrió un error al iniciar sesión. Inténtalo nuevamente."
    );
  });

  it("Inicio de sesion fallido por usuario inactivo", function () {
    const user = this.users.userDisabled;

    cy.get(loginPage.inputDocument).type(user.document);
    cy.get(loginPage.inputPassword).type(user.password);
    cy.get(loginPage.btnLogin).click();

    cy.get(loginPage.alertError, { timeout: 10000 }).should(
      "contain.text",
      "Número de documento o contraseña incorrectos"
    );
  });
});
