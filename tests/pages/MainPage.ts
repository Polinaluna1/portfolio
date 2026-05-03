import { type Page, type Locator } from '@playwright/test';

export class MainPage {
  readonly page: Page;
  readonly heroTitle: Locator;
  readonly heroSubtitle: Locator;
  readonly navLinks: Locator;
  readonly footer: Locator;
  readonly contactsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heroTitle = page.locator('.hero-title');
    this.heroSubtitle = page.locator('.hero-sub');
    this.navLinks = page.locator('nav a');
    this.footer = page.locator('footer');
    this.contactsLink = page.locator('nav a[href="contacts.html"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/index.html');
  }

  async getHeroTitleText(): Promise<string> {
    return await this.heroTitle.textContent() || '';
  }

  async clickContactsLink(): Promise<void> {
    await this.contactsLink.click();
  }

  async isFooterVisible(): Promise<boolean> {
    return await this.footer.isVisible();
  }
}