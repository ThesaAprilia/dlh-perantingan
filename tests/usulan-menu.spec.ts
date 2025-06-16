import {expect, test} from '@playwright/test'
import { login } from './login'
import { escape } from 'querystring';
import { parseEnv } from 'util';
import { statSync } from 'fs';
import { INSPECT_MAX_BYTES } from 'buffer';

test.beforeEach('login page', async({page})=> {                   
    await page.goto ('/dlh-perantingan/')
    await login(page, 'administrator', '123456');
    await page.locator('.menu-title').getByText('Usulan').click()
    await expect(page).toHaveURL('/dlh-perantingan/admin/usulan')
})

test.describe('add new data usulan', () => {
    //test.beforeEach(async ({page}) => {
    test('input name', async ({page}) => {
        await page.getByRole('button', {name: 'Tambah Data'}).click()
        await page.waitForURL('**/usulan/form?type=semua')
        expect(page.url()).toContain('/dlh-perantingan/admin/usulan/form?type=semua')

        const formNamaUsulan = page.getByPlaceholder('Masukkan nama usulan')
        const valueName = 'Pemangkasan ranting'
        await formNamaUsulan.fill(valueName)

        //form input date
        let date = new Date()
        let month = new Date()
        date.setDate(date.getDate() + 1)
        month.setMonth(month.getMonth()+ 1)
        const expectedDate = date.getDate().toString()
        const expectedDateFormat = expectedDate.padStart(2, '0')
        const expectedMonth = month.getMonth().toString().padStart(2, '0')
        const expectedYear = date.getFullYear()
        const expectedFullDate = `${expectedDateFormat}-${expectedMonth}-${expectedYear}`

        const calendarInputField = page.getByPlaceholder('Pilih tanggal')
        calendarInputField.click()


        const choosenDate = await page.locator('[class="cell"]').getByText(expectedDate, {exact: true}).click()
        await expect(calendarInputField).toHaveValue(expectedFullDate)

        await page.getByPlaceholder('Masukkan nama pengusul').fill('Linda')

        await page.getByPlaceholder('Masukkan nomor hp pengusul').fill('0888888888')
        
        
    })
})
