import {expect, test, Page} from '@playwright/test'
import { log } from 'console'
import { escape } from 'querystring'

export async function login(page: Page, username: string, password: string) {
    await page.goto ('/dlh-perantingan/')
    await page.fill('input[placeholder="Masukan username"]', username);
    await page.fill('input[placeholder="Masukan password"]', password);
    await page.locator('.btn').getByText('Login').click()
  }