//Imports libreries
const faker = require("faker");

//Modifiable Test Variables
//Constant that allows defining the url of the web application to test
const siteUrl = Cypress.config('baseUrl') || "https://losestudiantes.com/";
const appName = Cypress.env('appName') || "Monkey App";
//Constant that defines the number of attempts to execute
const attempts = Cypress.env('events') || 5;
//Constant defining the delay time in milliseconds
const delay = Cypress.env('delay') || 1000;
//Constant that defines the execute instance
const executeInstance = getRandomInt(0, 10000000);
//Constant that defines the events that can be executed
const events =
    [
        // randomClick,
        // randomClickButton,
        randomInputInText,
        // randomClickSelectors,
        // randomClickCheckbox,
        // randomClickRadio
    ];

//Test setup
describe('App prueba Monkey LosEstudiantes', function () {
    it('[ID_' + executeInstance + ']', function () {
        cy.visit(siteUrl);
        cy.wait(delay);
        randomEvents(attempts);
    })
})

//Function that generates the timestamp
function getCurrentTimestamp() {
    return Math.floor(Date.now() / 1000);
};

//Function that generates the attempts randomly
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

//Function that makes random clicks of a link type object
function randomClick() {
    let element = 'a';
    cy.get('body').then($body => {
        if ($body.find(element).length) {
            cy.get(element).then($links => {
                console.log('Number of links found => [' + $links.length + ']')
                let randomLink = $links.get(getRandomInt(0, $links.length));
                if (!Cypress.dom.isHidden(randomLink)) {
                    cy.wrap(randomLink).click({ force: true });
                    cy.screenshot(executeInstance + '/links/' + getCurrentTimestamp());
                }
                cy.wait(delay);
            });
        } else {
            console.log('El elemento => [' + element + '] no existe en la página')
        }
    });
}

//Function that makes random clicks of a button type object
function randomClickButton() {
    let element = 'button';
    cy.get('body').then($body => {
        if ($body.find(element).length) {
            cy.get(element).then($buttons => {
                console.log('Number of buttons found => [' + $buttons.length + ']')
                let randomButton = $buttons.get(getRandomInt(0, $buttons.length));
                console.log('Number of buttons found => [' + $buttons.length + ']')
                if (!Cypress.dom.isHidden(randomButton)) {
                    cy.wrap(randomButton).click({ force: true });
                    cy.screenshot(executeInstance + '/buttons/' + getCurrentTimestamp());
                }
                cy.wait(delay);
            });
        } else {
            console.log('El elemento => [' + element + '] no existe en la página')
        }
    });
}

//Function that makes random clicks of a button type object
function randomInputInText() {
    let element = 'input';
    cy.get('body').then($body => {
        if ($body.find(element).length) {
            cy.get(element).then($inputTexts => {
                console.log('Number of input texts found => [' + $inputTexts.length + ']')
                let randomInputText = $inputTexts.get(getRandomInt(0, $inputTexts.length));
                if (!Cypress.dom.isHidden(randomInputText)) {
                    if (randomInputText.getAttribute('type') == 'email') {
                        cy.wrap(randomInputText).type(faker.internet.email(), { force: true });
                    } else if (randomInputText.getAttribute('type') == 'tel') {
                        cy.wrap(randomInputText).type(faker.phone.number(), { force: true });
                    } else if (randomInputText.getAttribute('type') == 'number') {
                        cy.wrap(randomInputText).type(faker.random.numeric(), { force: true });
                    } else if (randomInputText.getAttribute('type') == 'date') {
                        cy.wrap(randomInputText).type(faker.date.recent(), { force: true });
                    } else {
                        cy.wrap(randomInputText).type(faker.random.words(1), { force: true });
                    }
                    cy.screenshot(executeInstance + '/inputs/' + getCurrentTimestamp());
                }
                cy.wait(delay);
            });
        } else {
            console.log('El elemento => [' + element + '] no existe en la página')
        }
    });
}

//Function that makes random clicks of a button type object
function randomClickSelectors() {
    let element = 'select';
    cy.get('body').then($body => {
        if ($body.find(element).length) {
            cy.get('select').then($selects => {
                console.log('Number of selectors found => [' + $selects.length + ']')
                let randomSelect = $selects.get(getRandomInt(0, $selects.length));
                let randomOptions = getRandomInt(0, randomSelect.length - 1);
                console.log(randomOptions)
                if (!Cypress.dom.isHidden(randomSelect)) {
                    cy.wrap(randomSelect).select(randomOptions, { force: true });
                    cy.screenshot(executeInstance + '/selects/' + getCurrentTimestamp());
                }
                cy.wait(delay);
            });
        } else {
            console.log('El elemento => [' + element + '] no existe en la página')
        }
    });
}

//Function that makes random clicks in a checkbox
function randomClickCheckbox() {
    let element = '[type="checkbox"]';
    cy.get('body').then($body => {
        if ($body.find(element).length) {
            cy.get(element).then($checks => {
                console.log('Number of checks found => [' + $checks.length + ']')
                let randomCheck = $checks.get(getRandomInt(0, $checks.length));
                if (!Cypress.dom.isHidden(randomCheck)) {
                    if (!randomCheck.hasAttribute('disabled')
                        && !randomCheck.hasAttribute('checked')) {
                        cy.wrap(randomCheck).check();
                        cy.screenshot(executeInstance + '/checkboxs/' + getCurrentTimestamp());
                    }
                }
                cy.wait(delay);
            });
        } else {
            console.log('El elemento => [' + element + '] no existe en la página')
        }
    });
}

//Function that makes random clicks in a radio
function randomClickRadio() {
    let element = '[type="radio"]';
    cy.get('body').then($body => {
        if ($body.find(element).length) {
            cy.get(element).then($radios => {
                console.log('Number of radios found => [' + $radios.length + ']')
                let randomRadio = $radios.get(getRandomInt(0, $radios.length));
                if (!Cypress.dom.isHidden(randomRadio)) {
                    if (!randomRadio.hasAttribute('disabled')
                        && !randomRadio.hasAttribute('checked')) {
                        cy.wrap(randomRadio).check();
                        cy.screenshot(executeInstance + '/radios/' + getCurrentTimestamp());
                    }
                }
                cy.wait(delay);
            });
        } else {
            console.log('El elemento => [' + element + '] no existe en la página')
        }
    });
}

//Function that executes random events
function randomEvents(monkeysLeft) {
    var monkeysLeft = monkeysLeft;
    if (monkeysLeft > 0) {
        let eventIndex = getRandomInt(0, events.length);
        events[eventIndex](monkeysLeft);
        monkeysLeft = monkeysLeft - 1;
        cy.wait(delay);
        randomEvents(monkeysLeft);
    };
}
