import {expect, test, Page} from '@playwright/test'
import { log } from 'console'



export class jenisUsulanPage{

    private readonly page: Page

    constructor(page) {
        this.page = page
    }


    async usulanRayon(namaUsulan: string, nama:string, nomor: string, rt: string, rw: string, alamat: string){
        //const formUsulan = this.page.locator('.app').getByText('Form Usulan')
        await this.page.getByPlaceholder('Masukkan nama usulan').fill(namaUsulan)
        await this.page.getByPlaceholder('Masukkan nama pengusul').fill(nama)
        await this.page.getByPlaceholder('Masukkan nomor hp pengusul').fill(nomor)
        await this.page.getByPlaceholder('Cth: 01').first().fill(rt)
        await this.page.getByPlaceholder('Cth: 01').last().fill(rw)
        await this.page.getByPlaceholder('Masukkan alamat lengkap').fill(alamat)

        //const inputField = this.page.locator('.dropdown-vue-wrapper').nth(2)
        // const selectRayon = this.page.locator('.dropdown-vue-content-item').nth(2)
        // await this.page.waitForTimeout(500)
        // await selectRayon.selectOption(rayon)

        
    }


}
//     async inputName(email: string, password: string, optionText: string) {
//         const usingTheGrid = this.page.locator('nb-card', {hasText: "Using The Grid"})
//         await usingTheGrid.getByRole('textbox', {name: "Email"}).fill(email)
//         await usingTheGrid.getByRole('textbox', {name: "Password"}).fill(password)
//         await usingTheGrid.getByRole('radio', {name: optionText}).check({force:true})
//         await usingTheGrid.getByRole('button').click()


//     }

//     async SubmitInlineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean) {
//         const InlineForm = this.page.locator('nb-card', {hasText: "InlineForm"})
//         await InlineForm.getByRole('textbox', {name: "Jane Doe"}).fill(name)
//         await InlineForm.getByRole('textbox', {name: "Email"}).fill(email)
//         if (rememberMe)
//             await InlineForm.getByRole('checkbox').check({force:true})
//         await InlineForm.getByRole('button').click()

//     }
// }

//    test('jenis usulan: taruna', async ({page}) => {
//         const inputField = page.locator('.dropdown-vue-wrapper').first()
//         const taruna = page.locator('.dropdown-vue-content-item').first().getByText('Taruna')
//         const priorty = page.locator('.dropdown-vue-wrapper').nth(1).getByText('Tinggi')
//         await inputField.click()
//         await taruna.click()
//         await priorty.click()

//         expect(taruna).toHaveText('Taruna')
//         expect(priorty).toHaveText('Tinggi')

        
//     })
    
//     test.skip('jenis usulan: wargaku', async ({page}) => {
//         const inputField = page.locator('.dropdown-vue-wrapper').first()
//         const wargaku = page.locator('.dropdown-vue-content-item').first().getByText('Wargaku')
//         const priorty = page.locator('.dropdown-vue-wrapper').nth(1).getByText('Menengah').first()
//         const nomorTiket = page.locator('[class="form-label fs-6"]').getByText('Nomor Tiket')
//         const nomorTiketField = page.getByPlaceholder('Masukkan nama usulan').nth(1)
//         await inputField.click()
//         await wargaku.click()
//         await page.locator('.dropdown-vue-wrapper').nth(1).click()
//         await priorty.click()
//         await nomorTiketField.click()
//         await nomorTiketField.fill('abc-123')
//         const value = await nomorTiketField.inputValue()

//         expect(wargaku).toHaveText('Wargaku')
//         expect(nomorTiket).toHaveText('Nomor Tiket')
//         expect(priorty).toHaveText('Menengah')
//         expect(value).toEqual('abc-123')
 
//     })

//     test.skip('jenis usulan: media', async ({page}) => {
//         const inputField = page.locator('.dropdown-vue-wrapper').first()
//         const media = page.locator('.dropdown-vue-content-item').first().getByText('Media')
//         const priorty = page.locator('.dropdown-vue-wrapper').nth(1).getByText('Menengah').first()
//         await inputField.click()
//         await media.click()
//         await page.locator('.dropdown-vue-wrapper').nth(1).click()
//         await priorty.click()

//         expect(media).toHaveText('Media')
//         expect(priorty).toHaveText('Menengah')

//     })
    
//     test.skip('jenis usulan: sapa warga surabaya', async ({page}) => {
//         const usulan = 'Sapa Warga Surabaya'
//         const inputField = page.locator('.dropdown-vue-wrapper').first()
//         const media = page.locator('.dropdown-vue-content-item').first().getByText(usulan)
//         const priorty = page.locator('.dropdown-vue-wrapper').nth(1).getByText('Rendah').first()
//         await inputField.click()
//         await media.click()
//         await page.locator('.dropdown-vue-wrapper').nth(1).click()
//         await priorty.click()

//         expect(media).toHaveText(usulan)
//         expect(priorty).toHaveText('Rendah')

//     })

//     test.skip('jenis usulan: kecamatan kelurahan', async ({page}) => {
//         const usulan = 'Kecamatan Kelurahan'
//         const inputField = page.locator('.dropdown-vue-wrapper').first()
//         const media = page.locator('.dropdown-vue-content-item').first().getByText(usulan)
//         const priorty = page.locator('.dropdown-vue-wrapper').nth(1).getByText('Rendah').first()
//         await inputField.click()
//         await media.click()
//         await page.locator('.dropdown-vue-wrapper').nth(1).click()
//         await priorty.click()

//         expect(media).toHaveText(usulan)
//         expect(priorty).toHaveText('Rendah')

//     })

//     test.skip('jenis usulan: e-surat', async ({page}) => {
//         const usulan = 'E-surat'
//         const inputField = page.locator('.dropdown-vue-wrapper').first()
//         const media = page.locator('.dropdown-vue-content-item').first().getByText(usulan)
//         const priorty = page.locator('.dropdown-vue-wrapper').nth(1).getByText('Rendah').first()
//         await inputField.click()
//         await media.click()
//         await page.locator('.dropdown-vue-wrapper').nth(1).click()
//         await priorty.click()

//         expect(media).toHaveText(usulan)
//         expect(priorty).toHaveText('Rendah')

//     })

//     test.skip('jenis usulan: perantingan', async ({page}) => {
//         const usulan = 'Perantingan'
//         const inputField = page.locator('.dropdown-vue-wrapper').first()
//         const media = page.locator('.dropdown-vue-content-item').first().getByText(usulan)
//         const priorty = page.locator('.dropdown-vue-wrapper').nth(1).getByText('Rendah').first()
//         await inputField.click()
//         await media.click()
//         await page.locator('.dropdown-vue-wrapper').nth(1).click()
//         await priorty.click()

//         expect(media).toHaveText(usulan)
//         expect(priorty).toHaveText('Rendah')

//     })

//     test.skip('jenis usulan: pohon tumbang', async ({page}) => {
//         const usulan = 'Pohon Tumbang'
//         const inputField = page.locator('.dropdown-vue-wrapper').first()
//         const taruna = page.locator('.dropdown-vue-content-item').first().getByText(usulan)
//         const priorty = page.locator('.dropdown-vue-wrapper').nth(1).getByText('Tinggi')
//         await inputField.click()
//         await taruna.click()
//         await priorty.click()

//         expect(taruna).toHaveText(usulan)
//         expect(priorty).toHaveText('Tinggi')

        
//     })