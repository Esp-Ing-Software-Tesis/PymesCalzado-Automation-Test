import { usersPage } from "../support/pageObjects/usersPage";
import { generateRandomData, generateNumberInRange } from "../utils/randomData";

describe("Pruebas users - Pymes de Calzado", function () {
  beforeEach(function () {
    cy.fixture("users.json").as("users");
    cy.fixture("dataUsersManage.json").as("dataUsersManage");

    cy.get("@users").then((users) => {
      cy.login(users.userManager);
    });
  });
  
  it("Validar que un usuario exista en la tabla", function () {
    const userExist = this.dataUsersManage.userExist;

    function searchInTable() {
      let found = false;

      // Recorremos todas las filas visibles
      cy.get(usersPage.rows)
        .each(($row) => {
          cy.wrap($row).within(() => {
            cy.get(usersPage.cell).then(($cells) => {
              const name = $cells.eq(0).text().trim();
              const documentType = $cells.eq(1).text().trim();
              const document = $cells.eq(2).text().trim();
              const email = $cells.eq(3).text().trim();
              const phone = $cells.eq(4).text().trim();
              const role = $cells.eq(5).text().trim();
              const productionLine = $cells.eq(6).text().trim();

              if (
                name === userExist.name &&
                documentType === userExist.documentType &&
                document === userExist.document &&
                email === userExist.email &&
                phone === userExist.phone &&
                role === userExist.role &&
                productionLine === userExist.productionLine
              ) {
                found = true;
              }
            });
          });
        })
        .then(() => {
          if (found) {
            // Usuario encontrado, la prueba pasa y termina
            return;
          }

          // Revisar si hay botón siguiente página habilitado
          cy.get(usersPage.nextPageButton).then(($nextBtn) => {
            if (!$nextBtn.is(":disabled")) {
              cy.wrap($nextBtn).click();
              cy.wait(500);
              searchInTable();
            } else {
              throw new Error("Usuario no encontrado");
            }
          });
        });
    }
    searchInTable();
  });

  it("Crear nuevo usuario", function () {
    const newUser = this.dataUsersManage.newUser;

    // Generar datos aleatorios
    const name = generateRandomData().name;
    const lastName = generateRandomData().lastName;
    const documentNumber = generateRandomData().documentNumber;
    const email = generateRandomData().email;
    const phone = generateRandomData().phoneNumber;
    const password = generateRandomData().password;

    let documentType = "";
    let role = "";
    let productionLine = "";

    cy.get(usersPage.btnCrearUsuario).click();
    cy.get(usersPage.inputName).type(name);
    cy.get(usersPage.inputLastName).type(lastName);
    cy.get(usersPage.openDocumentType).click();

    // Seleccionar un tipo de documento
    cy.get(usersPage.documentTypeOptions).then(($options) => {
      const count = $options.length;
      const randomIndex = generateNumberInRange(0, count - 1);

      cy.wrap($options[randomIndex]).click();

      const fullText = $options[randomIndex].textContent.trim();
      documentType = fullText.split(" ")[0];

      cy.get(usersPage.inputDocumentNumber).type(documentNumber);
      cy.get(usersPage.inputEmail).type(email);
      cy.get(usersPage.inputPhone).type(phone);
      cy.get(usersPage.openRole).click();

      // Seleccionar un role
      cy.get(usersPage.roleOptions).then(($options) => {
        const count = $options.length;
        const randomIndex = generateNumberInRange(0, count - 1);

        cy.wrap($options[randomIndex]).click();

        const fullText = $options[randomIndex].textContent.trim();
        role = fullText;

        // Seleccionar una línea de producción solo si es Operario
        if (role === "Operario") {
          cy.get(usersPage.openProductionLine).click();

          cy.get(usersPage.productionLineOptions).then(($options) => {
            const count = $options.length;
            const randomIndex = generateNumberInRange(0, count - 1);

            cy.wrap($options[randomIndex]).click();

            const fullText = $options[randomIndex].textContent.trim();
            productionLine = fullText;

            // Guardar datos en newUser
            Object.assign(newUser, {
              name: `${name} ${lastName}`,
              documentType,
              document: documentNumber,
              email,
              phone,
              role,
              productionLine,
            });
          });
        } else {
          // Si no es Operario, productionLine = 'No aplica'
          productionLine = "No aplica";

          Object.assign(newUser, {
            name: `${name} ${lastName}`,
            documentType,
            document: documentNumber,
            email,
            phone,
            role,
            productionLine,
          });
        }
      });
    });

    // Escribir la contraseña
    cy.get(usersPage.inputPassword).type(password);
    cy.get(usersPage.inputConftirmPassword).type(password);

    // Crear nuevo usuario
    cy.get(usersPage.btnCreate).click();

    // Función para buscar en la tabla paginada
    function searchInTable(user) {
      let found = false;

      // Normalizar strings para comparación
      function normalizeString(str) {
        return (str || "") // Asegura que sea string
          .toString() // Por si acaso es un número
          .normalize("NFD") // Normaliza acentos
          .replace(/[\u0300-\u036f]/g, "") // Quita tildes
          .trim()
          .toLowerCase();
      }

      cy.get(usersPage.rows)
        .each(($row) => {
          cy.wrap($row).within(() => {
            cy.get(usersPage.cell).then(($cells) => {
              const nameCell = normalizeString($cells.eq(0).text());
              const documentTypeCell = normalizeString($cells.eq(1).text());
              const documentCell = normalizeString($cells.eq(2).text());
              const emailCell = normalizeString($cells.eq(3).text());
              const phoneCell = normalizeString($cells.eq(4).text());
              const roleCell = normalizeString($cells.eq(5).text());
              const productionLineCell = normalizeString($cells.eq(6).text());

              if (
                nameCell === normalizeString(user.name) &&
                documentTypeCell === normalizeString(user.documentType) &&
                documentCell === normalizeString(user.document) &&
                emailCell === normalizeString(user.email) &&
                phoneCell === normalizeString(user.phone) &&
                roleCell === normalizeString(user.role) &&
                productionLineCell === normalizeString(user.productionLine)
              ) {
                found = true;
              }
            });
          });
        })
        .then(() => {
          if (found) return; // Usuario encontrado

          cy.get(usersPage.nextPageButton).then(($nextBtn) => {
            if (!$nextBtn.is(":disabled")) {
              cy.wrap($nextBtn).click();
              cy.wait(500);
              searchInTable(user);
            } else {
              throw new Error("Nuevo usuario no encontrado en la tabla");
            }
          });
        });
    }
    searchInTable(newUser);
  });

  it("Desactivar el primer usuario activo", function () {
    cy.get(usersPage.rows)
      .filter((index, row) =>
        Cypress.$(row)
          .find(usersPage.btnSwich + " input")
          .prop("checked")
      )
      .first()
      .within(() => {
        cy.get(usersPage.btnSwich + " input").click({ force: true });
      });

    // Esperar a que el modal se renderice y validar texto
    cy.get(usersPage.alertModalTitle, { timeout: 8000 }) // aumentar timeout
      .should("exist")
      .should("be.visible")
      .and("contain.text", "¿Desea inactivar este usuario?");

    cy.get(usersPage.btnAceptar).click();
  });

  it("Activar el primer usuario desactivado", function () {
    cy.get(usersPage.rows)
      .filter(
        (index, row) =>
          !Cypress.$(row)
            .find(usersPage.btnSwich + " input")
            .prop("checked")
      )
      .first()
      .within(() => {
        cy.get(usersPage.btnSwich + " input").click({ force: true });
      });

    cy.get(usersPage.alertModalTitle, { timeout: 8000 })
      .should("exist")
      .should("be.visible")
      .and("contain.text", "¿Desea activar este usuario?");

    cy.get(usersPage.btnAceptar).click();
  });
});
