import { type Page, type Locator } from '@playwright/test';

export class ContactsPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly githubLink: Locator;
  readonly homeLink: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator('h1');
    this.githubLink = page.locator('#github-link');
    this.homeLink = page.locator('nav a[href="index.html"]');
    this.footer = page.locator('footer');
  }

  async goto(): Promise<void> {
    await this.page.goto('/contacts.html');
  }

  async getHeadingText(): Promise<string> {
    return await this.heading.textContent() || '';
  }

  async getGithubHref(): Promise<string> {
    return await this.githubLink.getAttribute('href') || '';
  }

  async clickHomeLink(): Promise<void> {
    await this.homeLink.click();
  }
}