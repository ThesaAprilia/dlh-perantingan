import {expect, test} from '@playwright/test'
import { jenisUsulanPage} from '../tests/jenis-usulan'
import { login } from './login'


test.beforeEach('login page', async({page})=> {                   
    await page.goto ('/dlh-perantingan/')
    await login(page, 'administrator', '123456');
    await page.locator('.menu-title').getByText('Usulan').click()
    await expect(page).toHaveURL('/dlh-perantingan/admin/usulan')
    await page.getByRole('button', {name: 'Tambah Data'}).click()
})



test('jenis usulan rayon', async ({page}) => {
    const namaUsulan = 'testing usulan'
    const nama = 'linda'
    const nomor = '08888888888'
    const rayon = 'Surabaya Pusat'
    const address = 'Jl. Raya N0.16'
    const formJenisUsulan = new jenisUsulanPage(page)
 
    await formJenisUsulan.usulanRayon(namaUsulan, nama, nomor, '01' , '01', address)


})
