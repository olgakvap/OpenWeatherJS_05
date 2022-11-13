/// <reference types="cypress"/>


describe('GroupReporters', () => {

    const inputSearchCity = 'input[placeholder = "Search city"]';

    beforeEach(function () {
        cy.visit('https://openweathermap.org/')
    });

    function enterCityOrZipCode(city) {
        cy.get(inputSearchCity)
            .clear()
            .type(city);
        return this
    };

    function submit() {
        cy.get('.search-block button').click()
    };

    it('AT_001.006 | Main page > Section with search > Verify text message when entering special characters', () => {
        const inputCity = "$$$";

        enterCityOrZipCode(inputCity);
        submit();
        cy.get('.sub.not-found')
            .should('be.visible')
            .should('have.text', "Not found. To make search more precise put the city's name, comma, 2-letter country code (ISO3166).");
        cy.get('div.widget-notification')
            .should('be.visible')
            .should('have.text', `No results for ${inputCity}`);
    })

    it('AT_005.001 | Verify the website name and description', () => {
        cy.get('h1 .orange-text').should('have.text', 'OpenWeather')
        cy.get('h2 .white-text')
            .should('have.text', 'Weather forecasts, nowcasts and history in a fast and elegant way')
    })

    it('AT_001.001 | Main page > Section with search > Verify entered a Zip code into the Search city field', () => {
        const zipCode = '60604';

        enterCityOrZipCode(zipCode);
        submit();
        cy.get(inputSearchCity).invoke('val').should('eq', zipCode);
    });

    it('AT_034.001 | <Header > verify "For Business" button', () => {
        cy.get('#desktop-menu :nth-child(10) > a').invoke('removeAttr', 'target').click()
        cy.url().should('eq', 'https://openweather.co.uk/')
    });

    it('AT_001.010 | Main page > Section with search > Verify entered a city or Zip code into the Search city field', () => {
        cy.get(inputSearchCity)
          .type('Buffalo Grove')
          .click()
        cy.get('button[class="button-round dark"]')
          .click()
        cy.get('ul[class="search-dropdown-menu"]')
          .click()
        cy.url()
          .should('include', '/city/4885955')
        cy.get('div[class="current-container mobile-padding"]')
          .should('include.text', 'Buffalo Grove')
    });
});

