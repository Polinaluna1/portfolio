import { test, expect } from '@playwright/test';
import { MainPage } from './pages/MainPage';
import { ContactsPage } from './pages/ContactsPage';

test.describe('Тестування веб-сайту Поліни Прокопенко', () => {

  test('TC1: Головна сторінка має правильний заголовок та контент', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.goto();
    

    await expect(page).toHaveTitle(/Портфоліо | Поліна Прокопенко/);
    
    
    const heroTitle = await mainPage.getHeroTitleText();
    expect(heroTitle).toContain('ПОЛІНА');
    expect(heroTitle).toContain('ПРОКОПЕНКО');
    
    await expect(page.locator('.hero')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
  });

  test('TC2: Сторінка контактів має GitHub посилання', async ({ page }) => {
    const contactsPage = new ContactsPage(page);
    await contactsPage.goto();
    
    await expect(page).toHaveTitle(/Контакти | Поліна Прокопенко/);
    
 
    await expect(contactsPage.heading).toContainText('Контакти');
    
   
    await expect(contactsPage.githubLink).toBeVisible();
    
    const githubHref = await contactsPage.getGithubHref();
    expect(githubHref).toContain('github.com');
  });

  test('TC3: Навігація між сторінками працює', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.goto();
    
    await mainPage.clickContactsLink();
    await expect(page).toHaveURL(/contacts.html/);
   
    await expect(page.locator('h1')).toContainText('Контакти');
   
    const contactsPage = new ContactsPage(page);
    await contactsPage.clickHomeLink();
    await expect(page).toHaveURL(/index.html/);
    
    
    await expect(page.locator('.hero-title')).toBeVisible();
  });
});