import { test, expect } from '@playwright/test';

test.describe('Landing and Authentication', () => {
  test('landing page redirects to login', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/login');
  });

  test('login page renders correctly', async ({ page }) => {
    await page.goto('/login');
    
    // Vérifier les éléments de la page de login
    await expect(page.locator('.logo').getByText('Cinetica')).toBeVisible();
    await expect(page.locator('input[placeholder="Nom d\'utilisateur"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Mot de passe"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Se connecter' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Google' })).toBeVisible();
  });

  test('displays error message with invalid credentials', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('input[placeholder="Nom d\'utilisateur"]', 'invalid');
    await page.fill('input[placeholder="Mot de passe"]', 'wrongpassword');
    await page.click('button:has-text("Se connecter")');

    await expect(page.locator('text=Identifiants incorrects')).toBeVisible();
  });
});

test.describe('Dashboard Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Authentifier l'utilisateur
    await page.goto('/login');
    await page.fill('input[placeholder="Nom d\'utilisateur"]', 'admin');
    await page.fill('input[placeholder="Mot de passe"]', 'admin');
    await page.click('button:has-text("Se connecter")');
    await expect(page).toHaveURL('/dashboard');
  });

  test('navigation in main sections via sidebar', async ({ page }) => {
    const menuButton = page.locator('[data-testid="menu"]');
    await menuButton.click();
    // Vérifier la section Popular Movies depuis la sidebar
    await page.getByRole('button', { name: 'Popular' }).first().click();
    await expect(page).toHaveURL('/dashboard/movies/popular');

    // Vérifier la section Popular TV Shows depuis la sidebar
    await page.getByRole('button', { name: 'Popular' }).nth(1).click();
    await expect(page).toHaveURL('/dashboard/shows/popular');
});

  test('navigation via slider titles', async ({ page }) => {
      // Navigation via titre Popular Movies
      await page.click('a:has-text("Popular Movies")');
      await expect(page).toHaveURL('/dashboard/movies/popular');

      // Retour au dashboard
      await page.click('a:has-text("CINETICA")');
      await expect(page).toHaveURL('/dashboard');

      // Navigation via titre Popular TV Shows
      await page.click('a:has-text("Popular TV Shows")');
      await expect(page).toHaveURL('/dashboard/shows/popular');
  });
});

test.describe('Search Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Authentifier l'utilisateur
    await page.goto('/login');
    await page.fill('input[placeholder="Nom d\'utilisateur"]', 'admin');
    await page.fill('input[placeholder="Mot de passe"]', 'admin');
    await page.click('button:has-text("Se connecter")');
    await expect(page).toHaveURL('/dashboard');
  });

  test('search for movies and shows', async ({ page }) => {
    const desktopSearchInput = page.locator('.hidden.lg\\:block input[placeholder="Search movies, series..."]');
    await desktopSearchInput.fill('Batman');
    await desktopSearchInput.press('Enter');

    await expect(page).toHaveURL(/.*\/search\?q=Batman/);
    // Attendre que les résultats de recherche soient chargés
    await page.waitForSelector('[data-testid="movie-card"], [data-testid="show-card"]');
  });

  test('search for movies and shows on mobile', async ({ page }) => {
    // Configurer la vue mobile
    await page.setViewportSize({ width: 375, height: 667 });
    const mobileSearchInput = page.locator('.lg\\:hidden input[placeholder="Search movies, series..."]');
    await mobileSearchInput.fill('Batman');
    await mobileSearchInput.press('Enter');

    await expect(page).toHaveURL(/.*\/search\?q=Batman/);
    // Attendre que les résultats de recherche soient chargés
    await page.waitForSelector('[data-testid="movie-card"], [data-testid="show-card"]');
  });
});

test.describe('Movie Details', () => {
  test.beforeEach(async ({ page }) => {
    // Authentifier l'utilisateur
    await page.goto('/login');
    await page.fill('input[placeholder="Nom d\'utilisateur"]', 'admin');
    await page.fill('input[placeholder="Mot de passe"]', 'admin');
    await page.click('button:has-text("Se connecter")');
    await expect(page).toHaveURL('/dashboard');
  });
  test('display movie details when clicking on a movie', async ({ page }) => {

    // Cliquer sur le premier film
    await page.locator('[data-testid="movie-card"]').first().waitFor({ state: 'visible' });
    await page.locator('[data-testid="movie-card"]').first().click();

    // Vérifier les éléments de la page de détails
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByText('Synopsis')).toBeVisible();
    await expect(page.getByText('Cast')).toBeVisible();
    await expect(page.locator('[data-testid="movie-poster"]')).toBeVisible();
    await expect(page.getByText('Synopsis')).toBeVisible();
    await expect(page.getByText('Director')).toBeVisible();
    await expect(page.getByText('Genres')).toBeVisible();
  });
});

test.describe('Responsive Design', () => {
  test.beforeEach(async ({ page }) => {
    // Authentifier l'utilisateur
    await page.goto('/login');
    await page.fill('input[placeholder="Nom d\'utilisateur"]', 'admin');
    await page.fill('input[placeholder="Mot de passe"]', 'admin');
    await page.click('button:has-text("Se connecter")');
    await expect(page).toHaveURL('/dashboard');
  });
  test('sidebar collapses on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Vérifier que le menu est visible
    const menuButton = page.locator('[data-testid="menu"]');
    await expect(menuButton).toBeVisible();

    // Cliquer sur le menu et vérifier que la sidebar s'ouvre
    await menuButton.click();
    await expect(page.locator('[data-testid="x"]')).toBeVisible();
  });

  test('search bar adjusts on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/dashboard');
    const searchInput = page.locator('.lg\\:hidden input[placeholder="Search movies, series..."]');
    await expect(searchInput).toBeVisible();
    // Vérifier que la largeur est adaptée au mobile
    const searchInputBox = await searchInput.boundingBox();
    expect(searchInputBox?.width).toBeLessThan(375);
  });
});

test.describe('Theme System', () => {
  test.beforeEach(async ({ page }) => {
    // Authentifier l'utilisateu
    await page.goto('/login');
    await page.fill('input[placeholder="Nom d\'utilisateur"]', 'admin');
    await page.fill('input[placeholder="Mot de passe"]', 'admin');
    await page.click('button:has-text("Se connecter")');
    await expect(page).toHaveURL('/dashboard');
  });

  test('theme follows system preferences', async ({ page }) => {
    // Simuler le mode clair du système
    await page.emulateMedia({ colorScheme: 'light' });
    await expect(page.locator('html')).not.toHaveClass(/dark/);

    // Simuler le mode sombre du système
    await page.emulateMedia({ colorScheme: 'dark' });
    await expect(page.locator('html')).toHaveClass(/dark/);
  });
});