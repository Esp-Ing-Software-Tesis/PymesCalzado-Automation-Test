export const usersPage = {
  // Tabla de usuarios
  rows: "tbody > tr",
  cell: "td",
  nextPageButton: ".buttons > :last-child",
  prevPageButton: ".buttons > :first-child",

  // Creacion de usuarios
  btnCrearUsuario: ".crear-button",
  inputName: "#input_generic_name_0",
  inputLastName: "#input_generic_lastname_1",
  openDocumentType: ":nth-child(4) > .custom-select-container > .custom-select-container-button > .selected",
  documentTypeOptions: '[id^="option_documentType_"]',
  inputDocumentNumber: "#input_generic_document_3",
  inputEmail: "#input_generic_email_4",
  inputPhone: "#input_generic_phone_5",
  openRole: ":nth-child(8) > .custom-select-container > .custom-select-container-button > .selected",
  roleOptions: '[id^="option_rol_"]',
  openProductionLine: ":nth-child(9) > .custom-select-container > .custom-select-container-button > .selected",
  productionLineOptions: '[id^="option_productionLine_"]',
  inputPassword: "#input_password_password_8",
  inputConftirmPassword: "#input_password_confirmPassword_9",
  btnCreate: "#aceptar",

  // Activar o desactivar
  btnSwich: "#input-switch",
  alertModalTitle: ".container-title > .title",
  btnAceptar: ".aceptar",
};