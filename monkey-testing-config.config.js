const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'Monkey-Bono-With-Cypress',
  env: {
    //Nombre de la aplicacion
    appName: 'Monkey Cypress',
    //Cantidad de mokeys a lanzar: 10
    events: 100,
    //Tiempo entre lanzamientos en milisegundos: 1000
    delay: 1000,
    //Eventos permitidos: randomClick,randomClickButton,randomInputInText,randomSelectors
    typeEvents: "randomClick,randomClickButton,randomInputInText,randomSelectors"
  },
  pageLoadTimeout: 300000,
  videosFolder: './results',
  e2e: {
    setupNodeEvents(on, config) { },
    //Url a vistar: 'https://losestudiantes.com/'
    baseUrl: 'https://losestudiantes.com/',
    specPattern: './cypress/integration/monkey/monkey_testing.spec.js',
  },
})
