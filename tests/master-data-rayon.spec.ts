import {expect, Page, test} from '@playwright/test'
import { login } from './login'
import { warn } from 'console';

test.beforeEach(async({page})=> {                   
    await page.goto ('/dlh-perantingan/')
    await login(page, 'administrator', '123456');
    await page.getByText('Data Master').click()
    const toRayon = page.locator('[class="menu-title"]').getByText('Rayon')

    const groupMenuItem = page.getByText('Data Master')
    const expandedState = await groupMenuItem.getAttribute('style')

        if(expandedState == "display: none; overflow: hidden;"){
            await groupMenuItem.click()
        }
    
    await page.waitForTimeout(1000)
    await toRayon.click()
    await expect(page).toHaveURL('/dlh-perantingan/admin/master/rayon')
})


test('save valid data', async ({page}) => {
    const btn = page.getByRole('button', {name: "Tambah Data"})
    const toForm = page.getByPlaceholder('Contoh: Surabaya Pusat')
    await btn.click()
    await toForm.click()

    const rayonName = 'Blitar'
    await toForm.click()
    await toForm.fill(rayonName)
    const value = await toForm.inputValue()
    expect (value).toBe(rayonName)

    await page.getByRole('button', {name: "Simpan"}).click()
    
    //pop up
    const popUpText = 'Data berhasil disimpan'
    const popUpSuccess = page.locator('#swal2-html-container').getByText(popUpText)
    expect(popUpSuccess).toContainText(popUpText)

    //OK
    await page.getByRole('button', {name: "OK"}).click()
    expect(page).toHaveURL('/dlh-perantingan/admin/master/rayon')

})

test('save invalid data', async ({page}) => {
    const btn = page.getByRole('button', {name: "Tambah Data"})
    const toForm = page.getByPlaceholder('Contoh: Surabaya Pusat')
    await btn.click()
    await toForm.click()

    const rayonName = 'Kediri'
    await toForm.click()
    await toForm.fill(rayonName)
    const value = await toForm.inputValue()
    expect (value).toBe(rayonName)

    await page.getByRole('button', {name: "Simpan"}).click()
    
    //pop up
    const popUpTextFail = 'Pastikan data sudah benar!'
    const popUpFailed = page.locator('#swal2-title').getByText(popUpTextFail)
    expect(popUpFailed).toContainText(popUpTextFail)

    //OK
    await page.getByRole('button', {name: "OK"}).click()
    expect(page).toHaveURL('/dlh-perantingan/admin/master/rayon')
})


test('unfill form', async ({page}) =>{
    const btn = page.getByRole('button', {name: "Tambah Data"})
    const toForm = page.getByPlaceholder('Contoh: Surabaya Pusat')
    await btn.click()
    await toForm.click()
    await page.getByRole('button', {name: "Simpan"}).click()

    const warning = page.locator('[class="text-danger pt-2"]')
    expect(warning).toContainText('Nama wajib diisi!')

})

test('close and cancel pop up form', async ({page}) => {
    const btn = page.getByRole('button', {name: "Tambah Data"})
    const toForm = page.getByPlaceholder('Contoh: Surabaya Pusat')
    await btn.click()
    await toForm.click()

    const closeIcon = page.locator('[class="btn btn-icon btn-sm btn-active-light-primary ms-2"]')
    await closeIcon.click()

    await btn.click()
    await toForm.click()

    const cancelButton = page.getByRole('button', {name: "Batal"})
    await cancelButton.click()
   
})

test('searching rayon', async ({page}) => {

    const searchRayons = ['Surabaya Pusat','Surabaya Barat', 'Surabata']
    for(let searchRayon of searchRayons) {
        await page.locator('#update-search').clear()
        await page.locator('#update-search').fill(searchRayon)
        await page.waitForTimeout(1000)
        const ageRows = page.locator('tbody tr')

        for(let row of await ageRows.all()){
            const cellValue = await row.locator('td').nth(1).textContent()

            if(searchRayon == "Surabata"){
                expect(await page.locator('tbody tr').textContent()).toContain('Tidak ditemukan data apapun disini.')

            } else {
                expect(cellValue).toEqual(searchRayon)
            }

        }

    }
})


test('activating rayon', async ({page}) => {
    const alertText = 'Data berhasil disimpan'
    const targetActive = page.locator('input[type="checkbox"]').first()
    const message = page.locator('.c-toast').getByText(alertText)
    await targetActive.check()
    expect(message).toContainText(alertText)
    
})

test('deactive rayon', async ({page}) => {
    const alertText = 'Data berhasil disimpan'
    const message = page.locator('.c-toast').getByText(alertText)
    const targetDeactive = page.locator('input[type="checkbox"]').nth(1)
    await targetDeactive.uncheck()
    expect(message).toContainText(alertText)
    
})

test('edit rayon', async ({page}) => {
    const valueEdit = 'Semarang Kota'
    const editTarget = page.locator('[class="btn btn-sm btn-icon btn-light-primary"]').first()
    const target = page.locator('tbody tr').first()
    const editPage = page.locator('.modal-title').getByText('Edit Rayon')
    const toForm = page.getByPlaceholder('Contoh: Surabaya Pusat')
    await editTarget.click()
    expect(editPage).toContainText('Edit Rayon')

    await toForm.click()
    await toForm.clear()
    await toForm.fill(valueEdit)
    const value = toForm.inputValue()
    await page.getByRole('button', {name: "Simpan"}).click()


    const popUpText = 'Data berhasil diubah'
    const popUp= page.locator('#swal2-html-container').getByText(popUpText)
    expect(popUp).toContainText(popUpText)

    await page.getByRole('button', {name: "OK"}).click()
    await page.waitForTimeout(500)

    //find edited data
    expect(target).toContainText(valueEdit)

})

test('sorting table', async ({page}) => {
    const sortingUp = page.locator('thead tr').nth(1)
    const sortingDown = page.locator('thead tr').locator('[class="fa fa-fw fa-sort-amount-down"]').nth(1)
    const beforeClick = page.locator('thead tr').locator('[class="fa fa-fw fa-sort disabled"]').nth(1)

    await beforeClick.click()

    await page.waitForTimeout(2000)

    //await sortingDown.click()

    //await page.waitForTimeout(1000) 
    
    await sortingUp.click()
})

