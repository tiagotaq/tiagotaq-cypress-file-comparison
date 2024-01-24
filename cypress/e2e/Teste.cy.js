//const ExcelJS = require('exceljs');

describe('template spec', () => {
  it('passes', () => {
    
      const caminhoPlanilha1 = 'cypress/fixtures/arquivos_originais/Teste.xlsx'
      const caminhoPlanilha2 = 'C:/File_testing/Original/Teste.xlsx'

      cy.compararPlanilhas(caminhoPlanilha1, caminhoPlanilha2)

  });
});