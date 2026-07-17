import { expect, test } from '@playwright/test';

test('section 7 is interactive, themed, and persists progress', async ({ page }) => {
  await page.goto('/AI100/algoritmos-aprendizaje-automatico');

  await expect(page.getByRole('heading', { name: 'Algoritmos de aprendizaje automático' })).toBeVisible();
  await expect(page.getByTestId('section-seven-lab')).toBeVisible();

  await page.getByLabel('Seleccionar tema').selectOption('dark');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

  await page.getByRole('button', { name: 'KNN' }).click();
  await expect(page.getByText('Clasificación:')).toBeVisible();
  await page.getByLabel(/Vecinos K/).fill('7');
  await expect(page.getByText('Los 7 vecinos más cercanos')).toBeVisible();

  await page.getByRole('button', { name: 'Regresión' }).click();
  await expect(page.getByText('Ventas estimadas:')).toBeVisible();

  await page.getByRole('button', { name: 'K-means' }).click();
  await expect(page.getByText(/Centroides/)).toBeVisible();

  await page.getByRole('button', { name: 'Naive Bayes' }).click();
  await expect(page.getByText('Riesgo estimado:')).toBeVisible();

  await page.getByRole('button', { name: 'Mini quiz' }).click();
  await page.getByLabel('Clasificar un perro con vecinos etiquetados').selectOption('KNN');
  await page.getByLabel('Predecir ventas como número continuo').selectOption('Regresión');
  await page.getByLabel('Descubrir grupos sin etiquetas').selectOption('K-means');
  await page.getByLabel('Combinar señales para estimar fraude').selectOption('Naive Bayes');
  await expect(page.getByText('Puntaje actual: 4/4')).toBeVisible();

  await page.getByRole('button', { name: 'Guardar progreso local' }).click();
  await expect(page.getByText('Guardado con 4/4 respuestas correctas')).toBeVisible();

  const response = await page.request.get('/api/progress?sectionId=ai100-07');
  expect(response.ok()).toBeTruthy();
  const json = await response.json();
  expect(JSON.stringify(json)).toContain('section_completed');
});
