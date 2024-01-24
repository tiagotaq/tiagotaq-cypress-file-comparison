// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const ExcelJS = require('exceljs');

Cypress.Commands.add('compararPlanilhas', function (caminhoplanilha1, caminhoplanilha2) {
    cy.readFile(caminhoplanilha1, 'binary').then(originalContent => {
        cy.readFile(caminhoplanilha2, 'binary').then(generatedContent => {
            const originalWorkbook = new ExcelJS.Workbook();
            const generatedWorkbook = new ExcelJS.Workbook();

            originalWorkbook.xlsx.load(originalContent).then(() => {
                generatedWorkbook.xlsx.load(generatedContent).then(() => {
                    const originalSheet = originalWorkbook.getWorksheet(1);
                    const generatedSheet = generatedWorkbook.getWorksheet(1);

                    expect(originalSheet.rowCount).to.equal(generatedSheet.rowCount);

                    expect(originalSheet.columnCount).to.equal(generatedSheet.columnCount);

                    for (let row = 1; row <= originalSheet.rowCount; row++) {
                        for (let col = 1; col <= originalSheet.columnCount; col++) {
                            const originalValue = originalSheet.getCell(row, col).value;
                            const generatedValue = generatedSheet.getCell(row, col).value;

                            expect(originalValue).to.equal(generatedValue);
                        }
                    }
                });
            });
        });
    });
})
