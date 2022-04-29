/// <reference types="cypress"/>
describe('<ExpenseTracker/>',()=>{
    it('<ExpenseTracker /> - verificar auttenticacion',()=>{
        
        cy.visit('/logout')
        cy.get('[data-cy=btnlogout]')
        .should('exist')
        .invoke('text')
        .should('equals','Logout');

        cy.get('[data-cy=btnlogout]').click();
        
        cy.visit('/')
        cy.get('[data-cy=titulo]')
        .invoke('text')
        .should('equals','Registration or Authentication is required');
        cy.get('[data-cy=btnlogin]')
        .should('exist')
        .invoke('text')
        .should('equals','Login');

        cy.get('[data-cy=btnlogin]').click();
   
        cy.get('[id=username]')
        .should('exist');
        cy.get('[id=password]')
        .should('exist');
        cy.get('[name=action]')
        .should('exist');

        cy.get('[id=username]').type('usertesting@auth0.com')
        cy.get('[id=password]').type('Testing2022')
        cy.get('[name=action]').click();
        
    });
    it('<ExpenseTracker /> - verificar totales',()=>{
        cy.get('[data-cy=ingresos]')
        .should('exist');
        cy.get('[data-cy=central]')
        .should('exist');
        cy.get('[data-cy=gastado]')
        .should('exist');
        cy.get('[data-cy=add-income]')
        .should('exist');
        cy.get('[data-cy=add-expense]')
        .should('exist');

    });

    it('<ExpenseTracker /> - add Income',()=>{
        
        cy.get('[data-cy=add-income]').click();
        cy.get('[data-cy=name]')
        .should('exist');
        cy.get('[data-cy=value]')
        .should('exist');
        cy.get('[data-cy=category]')
        .should('exist');
        cy.get('[data-cy=btn-submit]')
        .should('exist');

        cy.get('[data-cy=name]')
        .type('Income Test');
        cy.get('[data-cy=value]')
        .type('100');
        cy.get('[data-cy=category]')
        .select('salary');
        
        cy.get('[data-cy=btn-submit]').click();

    });

    it('<ExpenseTracker /> - valid Income',()=>{
                
        cy.get('[data-cy=lst-category-salary]')
        .should('exist')
        .contains("salary");

        cy.get('[data-cy=lst-name-salary]')
        .should('exist')
        .contains("Income Test");
    });

    it('<ExpenseTracker /> - add Expense',()=>{
        
        cy.get('[data-cy=add-expense]').click();
        cy.get('[data-cy=name]')
        .should('exist');
        cy.get('[data-cy=value]')
        .should('exist');
        cy.get('[data-cy=category]')
        .should('exist');
        cy.get('[data-cy=btn-submit]')
        .should('exist');

        cy.get('[data-cy=name]')
        .type('Expense Test');
        cy.get('[data-cy=value]')
        .type('50');
        cy.get('[data-cy=category]')
        .select('foods');
        
        cy.get('[data-cy=btn-submit]').click();

    });

    it('<ExpenseTracker /> - valid Expense',()=>{
        cy.get('[data-cy=lst-category-foods]')
        .should('exist')
        .contains("foods");

        cy.get('[data-cy=lst-name-foods]')
        .should('exist')
        .contains("Expense Test");
        
    });

})