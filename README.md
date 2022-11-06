# Prueba automatizadas con Cypress (Monkey - Los Estudiantes)
Este proyecto permite realizar pruebas automatizadas de forma aleatoria, haciendo uso de las API´s suministradas por [Cypress](https://www.cypress.io/). A continuación se explica el detalle: 

## Eventos 
El proyecto cuenta con un evento principal llamado **randomEvents**, el cual ejecuta de forma aleatoria los siguientes los siguientes eventos:

- **Random Clicks**:
Este evento realiza clicks de forma aleatoria sobre los diferentes enlaces de la aplicación.
- **Random Click Buttons**:
Este evento realiza clicks de forma aleatoria sobre los diferentes botones de la aplicación.
- **Random Input Texts**:
Este evento escribe palabras de forma aleatoria sobre las diferentes entradas de texto.
- **Random Selects**:
Este evento selecciona de forma aleatoria una opción de una lista, checkboxs o radio.

## Como ejecutar
- Configure the desired parameters: The repository's root folder contains two JSON files which have the configuration parameters for each test. Open them and edit the parameters as needed. You can change the baseURL, the seed for the test, the percentage of events, the delay between events, and the number of events.
Configure los parámetros según las necesidades de la prueba: 
- La carpeta raíz del repositorio contiene el archivo `monkey-testing-config.config.js`, el cual brinda los siguientes parámetros que se pueden modificar: 
<br>* **appName:** Nombre de la aplicación a probar. Ej: Monkey Cypress.
<br>* **baseUrl:** Url de la aplicación a pruebas. Ej: https://losestudiantes.com.
<br>* **events:** Número de ejecuciones que se desea lanzar. Ej: 100.
<br>* **delay:** Tiempo de retraso entre ejecuciones. Este valor debe ser en milisegundos. Ej: 1000.
<br>* **typeEvents:** Tipos de eventos a ejecutar. Los eventos deben estar separados por `,` . Ej: randomClick,randomClickButton.
- Una vez realizada la configuración del archivo ´monkey-testing-config.config.js´ para lanzar la ejecucón de las pruebas, a través de la terminal ejecute el siguiente comando `./node_modules/.bin/cypress run --config-file ./monkey-testing-config.config.js`: 


## Resultados
Cuando finalice la ejecución de la prueba, se generará en la carpeta de `./results` con un video de la ejecución en un navegador y adicional a esto se genera una carpeta en la ruta `./cypress/screenshots` con los screenshots tomados durante la ejecución de la prueba.
