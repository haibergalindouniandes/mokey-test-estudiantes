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
//Constant that getted the string events
const stringEvents = Cypress.env('typeEvents') || "randomClick,randomClickButton,randomInputInText,randomSelectors";
//Constant that defines the events that can be executed
const events = getEvents(stringEvents);
//Constant that defines the events that can be executed
const eventsTypeSelect = ['select', '[type="checkbox"]', '[type="radio"]'
];

//Test setup
describe(appName, function () {
    console.log(typeof events)
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

//Function that contains array events
function getEvents(stringEvents) {
    console.log(stringEvents)
    let eventsList = [];
    if (stringEvents.includes('randomClick')) {
        eventsList.push(randomClick);
    }
    if (stringEvents.includes('randomClickButton')) {
        eventsList.push(randomClickButton);
    }
    if (stringEvents.includes('randomInputInText')) {
        eventsList.push(randomInputInText);
    }
    if (stringEvents.includes('randomSelectors')) {
        eventsList.push(randomSelectors);
    }
    if (stringEvents.includes('randomClickCheckbox')) {
        eventsList.push(randomClickRadioCheckbox);
    }
    return eventsList;
};


//Function that generates the attempts randomly
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

//Function that makes random clicks of a link or button type object
function randomClick() {
    let element = 'a';
    cy.get('body').then($body => {
        if ($body.find(element).length) {
            cy.get(element).then($links => {
                console.log('Number of ' + element + ' found => [' + $links.length + ']')
                let randomLink = $links.get(getRandomInt(0, $links.length));
                if (!Cypress.dom.isHidden(randomLink)) {
                    cy.wrap(randomLink).click({ force: true });
                    cy.screenshot(executeInstance + '/' + element + '/' + getCurrentTimestamp());
                }
                cy.wait(delay);
            });
        } else {
            console.log('El elemento => [' + element + '] no existe en la página')
        }
    });
}

//Function that makes random clicks of a link or button type object
function randomClickButton() {
    let element = 'button';
    cy.get('body').then($body => {
        if ($body.find(element).length) {
            cy.get(element).then($links => {
                console.log('Number of ' + element + ' found => [' + $links.length + ']')
                let randomLink = $links.get(getRandomInt(0, $links.length));
                if (!Cypress.dom.isHidden(randomLink)) {
                    cy.wrap(randomLink).click({ force: true });
                    cy.screenshot(executeInstance + '/' + element + '/' + getCurrentTimestamp());
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
                    cy.screenshot(executeInstance + '/' + element + '/' + getCurrentTimestamp());
                }
                cy.wait(delay);
            });
        } else {
            console.log('El elemento => [' + element + '] no existe en la página')
        }
    });
}

//Function that makes random clicks of a button type object
function randomClickSelect() {
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
                    cy.screenshot(executeInstance + '/' + element + '/' + getCurrentTimestamp());
                }
                cy.wait(delay);
            });
        } else {
            console.log('El elemento => [' + element + '] no existe en la página')
        }
    });
}

//Function that makes random clicks in a radio or a checkbox
function randomClickRadioCheckbox(element) {
    cy.get('body').then($body => {
        if ($body.find(element).length) {
            cy.get(element).then($radios => {
                console.log('Number of ' + element + ' found => [' + $radios.length + ']')
                let randomRadio = $radios.get(getRandomInt(0, $radios.length));
                if (!Cypress.dom.isHidden(randomRadio)) {
                    if (!randomRadio.hasAttribute('disabled')
                        && !randomRadio.hasAttribute('checked')) {
                        cy.wrap(randomRadio).check();
                        cy.screenshot(executeInstance + '/' + element + '/' + getCurrentTimestamp());
                    }
                }
                cy.wait(delay);
            });
        } else {
            console.log('El elemento => [' + element + '] no existe en la página')
        }
    });
}

//Function that makes random clicks in random selectors
function randomSelectors() {
    let executed = false;
    for (let index = 0; index < eventsTypeSelect.length; index++) {
        cy.get('body').then($body => {
            if ($body.find(eventsTypeSelect[index]).length) {
                if (eventsTypeSelect[index] == 'select') {
                    randomClickSelect();
                } else if (eventsTypeSelect[index] == '[type="checkbox"]'
                    || eventsTypeSelect[index] == '[type="radio"]') {
                    randomClickRadioCheckbox(eventsTypeSelect[index])
                } else {
                    console.log('El elemento => [' + eventsTypeSelect[index] + '] no se encuentra configurado')
                }
                executed = true;
            }
        });
        if (executed) {
            break;
        }
    }
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

