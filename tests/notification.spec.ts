import {expect, test} from '@playwright/test'
import { login } from './login'
import { log } from 'console'
import { escape } from 'querystring'
import { CONNREFUSED, NOTFOUND } from 'dns'
import { read } from 'fs'

test.beforeEach(async({page})=> {                   
    await page.goto ('/dlh-perantingan/')
    await login(page, 'administrator', '123456');
    await expect(page).toHaveURL('/dlh-perantingan/admin/dashboard')
})


test('navigate to notification', async ({page}) => {
    await page.getByText('Notifikasi').click()
    await expect(page).toHaveURL('/dlh-perantingan/admin/notifikasi')
})

test.describe('navigate to notification page (for usulan)', () => {
    test.beforeEach(async ({page}) => {
        const notificationTab = page.getByText('Notifikasi')
        const detailPage = page.locator('[class="card border mb-5 rounded-3 bg-light-success border-success cursor-pointer"]').getByText("Usulan baru diterima").first()
        await notificationTab.click()
        expect(page.url()).toContain('/notifikasi')

        //navigate to detail page
        let readMessage = false;
        let attempts = 0;

        while (!readMessage&& attempts < 10) { 

            if (await detailPage.count() > 0 && await detailPage.first().isVisible()) {
            await detailPage.first().click();
            readMessage = true;

            } else {
            await page.evaluate(() => window.scrollBy(0, 300)); // scroll 300px ke bawah
            await page.waitForTimeout(1000); 
            attempts++;
            }  
        }
        //check map
        await expect(page.locator('#map')).toBeVisible()
        await expect(page.locator('.map-marker')).toHaveCount(0)

        const map = page.locator('#map')
        await map.scrollIntoViewIfNeeded()
        const box = await map.boundingBox()

        if (box) {
        await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
        } else {
        throw new Error('Element bounding box not found — is the element visible?');
        }
    })

    test('notifikasi usulan baru', async ({page}) => {
        const usulan = page.locator('#tab-usulans').getByText('Detail Pekerjaan')
        await expect (usulan).toHaveText('Detail Pekerjaan')

        //back to notif
        await page.getByRole('button', {name: "Kembali"}).click()
        await page.waitForTimeout(6000)
        await expect(page).toHaveURL('/dlh-perantingan/admin/notifikasi')
    })


    test.skip('notifikasi usulan baru, sudah dikerjakan belum dibaca', async ({page}) => {
        const usulan = page.locator('#tab-usulans').getByText('Detail Pekerjaan')
        await expect (usulan).toHaveText('Detail Pekerjaan')

    
        const realizationTab = page.locator('.nav-link').getByText('Detail Progress Realisasi')
        const realizationTabActive = page.locator('#detail-tab-content').getByText('Detail Progress Realisasi')
        realizationTab.click()
        await page.waitForTimeout(1000)
        await expect(realizationTabActive).toHaveText('Detail Progress Realisasi')


        //back to notif
        await page.getByRole('button', {name: "Kembali"}).click()
        await page.waitForTimeout(6000)
        await expect(page).toHaveURL('/dlh-perantingan/admin/notifikasi')

    })

})


test('navigate to realization notification', async ({page}) => {
    const notificationTab = page.getByText('Notifikasi')
    const detailPageRealizaion = page.locator('[class="card border mb-5 rounded-3 bg-light-success border-success cursor-pointer"]').getByText("Realisasi selesai dilakukan").first()
    await notificationTab.click()
    expect(page.url()).toContain('/notifikasi')

    //navigate to detail page
    let readMessage = false;
    let attempts = 0;

    while (!readMessage&& attempts < 10) { 
        if (await detailPageRealizaion.count() > 0 && await detailPageRealizaion.first().isVisible()) {
        await detailPageRealizaion.first().click();
        readMessage = true;

        } else {
        await page.evaluate(() => window.scrollBy(0, 1000)); // scroll ke bawah
        await page.waitForTimeout(1000); 
        attempts++;
        }  
        
        const detailUsulan = page.getByText('Detail Usulan')

        //check map
        const map = page.locator('#map')
        await expect(map).toBeVisible()

        await map.scrollIntoViewIfNeeded()
        const box = await map.boundingBox()

        if (box) {
        await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
        } else {
        throw new Error('Element bounding box not found — is the element visible?');
        }

    }
    
    const usulan = page.locator('#tab-usulans').getByText('Detail Pekerjaan')
    await expect (usulan).toHaveText('Detail Pekerjaan')

    //tab realisasi
    await page.locator('.nav-link').getByText('Realisasi').click()
    const realizationTabActive = page.locator('#tab-realisasi').getByText('Detail Progress Realisasi')
    await page.waitForTimeout(1000)
    await expect (realizationTabActive).toHaveText('Detail Progress Realisasi')



    //back to notif
    await page.getByRole('button', {name: "Kembali"}).click()
    await page.waitForTimeout(6000)
    await expect(page).toHaveURL('/dlh-perantingan/admin/notifikasi')

})


test('Read all', async ({page}) => {
    await page.getByText('Notifikasi').click()
    const getButtonText = 'Tandai Semua Sudah Dibaca';
    const readAll = page.locator('[class="fw-bolder text-custom cursor-pointer"]').getByText(getButtonText)
    const borderColor = page.locator('.konten')
    await expect(readAll).toHaveText(getButtonText)

    await readAll.click()
    await expect(borderColor).toHaveCSS('border', '0px none rgb(24, 28, 50)')

})



