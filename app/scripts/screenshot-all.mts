import { chromium } from '@playwright/test';

const pages = [
  ['AI100-index', 'http://localhost:8080/AI100'],
  ['01-introduccion-ia', 'http://localhost:8080/AI100/introduccion-inteligencia-artificial'],
  ['02-historia', 'http://localhost:8080/AI100/historia-evolucion-ia'],
  ['03-tipos-ia', 'http://localhost:8080/AI100/tipos-ia'],
  ['04-fundamentos-ml', 'http://localhost:8080/AI100/fundamentos-machine-learning'],
  ['05-supervisado', 'http://localhost:8080/AI100/aprendizaje-supervisado'],
  ['06-algoritmos', 'http://localhost:8080/AI100/algoritmos-aprendizaje-automatico'],
  ['07-preparacion-datos', 'http://localhost:8080/AI100/preparacion-datos'],
  ['08-redes-neuronales', 'http://localhost:8080/AI100/introduccion-redes-neuronales'],
  ['09-nlp', 'http://localhost:8080/AI100/procesamiento-lenguaje-natural'],
  ['10-vision', 'http://localhost:8080/AI100/vision-computadora'],
  ['11-etica', 'http://localhost:8080/AI100/etica-inteligencia-artificial'],
  ['12-ciclo-vida', 'http://localhost:8080/AI100/ciclo-vida-proyecto-ia'],
  ['13-herramientas', 'http://localhost:8080/AI100/herramientas-frameworks-ia'],
  ['14-proyecto-final', 'http://localhost:8080/AI100/proyecto-final-revision'],
];

const outDir = '/tmp/opencode/screenshots';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  for (const [name, url] of pages) {
    try {
      const resp = await page.goto(url, { waitUntil: 'load', timeout: 30000 });
      await page.waitForTimeout(800);
      await page.screenshot({ path: `${outDir}/${name}.png`, fullPage: true });
      console.log(`${resp?.status()}  ${name}  ${url}`);
    } catch (e) {
      console.log(`ERR  ${name}  ${url}  ${(e as Error).message.slice(0, 120)}`);
    }
  }

  await browser.close();
  console.log('done');
})();
