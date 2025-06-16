import {expect, test} from '@playwright/test'
import { log } from 'console'
import { escape } from 'querystring'

test.beforeEach(async({page})=> {                   
    await page.goto ('/dlh-perantingan/')
})


type MyFixtures = {
    loginAsTestUser: () => Promise<void>;
  };
  


test('Login Successful', async({page}) => {
    const usernameInput = 'administrator';
    const passwordInput = '123456';

    const usernameField = page.locator('input[placeholder="Masukan username"]')
    const passwordField = page.locator('input[type="password"]')

    await usernameField.click()
    await usernameField.fill(usernameInput)

    const username = usernameField.inputValue()
    expect(await username).toBe(usernameInput)

    await passwordField.click()
    await passwordField.fill(passwordInput)

    const password = passwordField.inputValue()
    expect(await password).toBe(passwordInput)
    
    await page.locator('.btn').getByText('Login').click()
    await expect(page).toHaveURL('/dlh-perantingan/admin/dashboard')

})

test('Login Unsuccessful', async({page}) => {
    const usernameInput = 'administrator';
    const passwordInputFalse = '1234567';
    const errorMessage = 'Silahkan login kembali';

    const usernameField = page.locator('input[placeholder="Masukan username"]')
    const passwordField = page.locator('input[type="password"]')

    await usernameField.click()
    await usernameField.fill(usernameInput)

    const username = usernameField.inputValue()
    expect(await username).toBe(usernameInput)

    await passwordField.click()
    await passwordField.fill(passwordInputFalse)

    const password = passwordField.inputValue()
    expect(await password).toBe(passwordInputFalse)
    
    await page.locator('.btn').getByText('Login').click()
    const errorLogin = page.getByText(errorMessage)
    await expect(errorLogin).toHaveText(errorMessage)

    await page.getByRole('button', {name: 'OK'}).click()
    await expect(page).toHaveURL('/dlh-perantingan/')

})

test('hide and show password', async ({page}) => {
    const passwordInput = '123456';
    const passwordField = page.locator('input[placeholder="Masukan password"]')
    const showPassword = page.locator('[class="fa fa-eye"]')
    const hidePassword = page.locator('[class="fa fa-eye-slash"]')

    await passwordField.click()
    await passwordField.fill(passwordInput)

    //show password
    await expect(passwordField).toHaveAttribute('type', 'password');
    await showPassword.click()

    await expect(passwordField).toHaveAttribute('type', 'text');

    //icon change
    await expect(showPassword).not.toBeVisible();
    await expect(hidePassword).toBeVisible();

    //hide password
    await hidePassword.click();
    await expect(passwordField).toHaveAttribute('type', 'password');

})