const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'Monkey-Bono-With-Cypress',
  env: {
    appName: 'App prueba Monkey LosEstudiantes',
    events: 5,
    delay: 1000,
    typeEventos: "randomClick, randomClickButton, randomInputInText, randomClickSelectors, randomClickCheckbox, randomClickRadio"
  },
  pageLoadTimeout: 120000,
  videosFolder: './results/',
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'https://losestudiantes.com/',
    specPattern: './cypress/integration/monkey_testing.spec.js',
  },
})
