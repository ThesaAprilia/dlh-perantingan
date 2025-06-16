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


// test.beforeEach('semua usulan', async({page}) => {
//      await page.locator('.text-center').getByText('Semua').click()
// })


test.describe('add new data usulan', () => {
    //test.beforeEach(async ({page}) => {
    test('input name', async ({page}) => {
        await page.getByRole('button', {name: 'Tambah Data'}).click()
        await page.waitForURL('**/usulan/form?type=semua')
        expect(page.url()).toContain('/dlh-perantingan/admin/usulan/form?type=semua')

        const formNamaUsulan = page.getByPlaceholder('Masukkan nama usulan')
        const valueName = 'Pemangkasan ranting'
        await formNamaUsulan.click()
        await formNamaUsulan.fill(valueName)
        
        const value = await formNamaUsulan.inputValue()
        expect(value).toBe(valueName)


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
    })

    test('input pengusul', async ({page}) => {
        const nameValue = 'Linda'
        const inputName = page.getByPlaceholder('Masukkan nama pengusul')
        await inputName.click()
        await inputName.fill(nameValue)
        const value = await inputName.inputValue()

        expect(value).toContain(nameValue)
    })

    test('input valid phone number', async ({page}) => {
        const validNumber = '0888888888888'
        const numberField = page.getByPlaceholder('Masukkan nomor hp pengusul')

        await numberField.click()
        await numberField.fill(validNumber)
        const numberValue = await numberField.inputValue()

        await expect(numberField).toHaveValue(numberValue)

    })

    test('input jenis usulan: search', async ({page}) => {
        const validJenis = 'Taruna'
        const invalidJenis = 'Tarunda'
        const inputField = page.locator('.dropdown-vue-wrapper').first()
        const searchResult = page.locator('.dropdown-vue-content-item').first().getByText(validJenis)
        await inputField.click()
        await page.waitForTimeout(500)

        const searchField =  page.locator('input[placeholder="Search"]').first()
        await searchField.click()
        await searchField.fill(validJenis)
        const searchValue = searchField.inputValue()
        await page.waitForTimeout(1000)

        expect(searchResult).toHaveText(validJenis)
    })

    test.skip('input jenis usulan: invalid search', async ({page}) => {
        const invalidJenis = 'Tarunda'
        const message = 'Tidak Ada Data'
        const inputField = page.locator('.dropdown-vue-wrapper').first()
        const searchResult = page.locator('.dropdown-vue-content-item').first()
        await inputField.click()
        await page.waitForTimeout(500)

        const searchField =  page.locator('input[placeholder="Search"]').first()
        await searchField.click()
        await searchField.fill(invalidJenis)
        await page.waitForTimeout(1000)

        expect(searchResult).toHaveText(message)
    })

    test('jenis usulan: taruna', async ({page}) => {
        const inputField = page.locator('.dropdown-vue-wrapper').first()
        const taruna = page.locator('.dropdown-vue-content-item').first().getByText('Taruna')
        const priorty = page.locator('.dropdown-vue-wrapper').nth(1).getByText('Tinggi')
        await inputField.click()
        await taruna.click()
        await priorty.click()

        expect(taruna).toHaveText('Taruna')
        expect(priorty).toHaveText('Tinggi')

        
    })
    
    test.skip('jenis usulan: wargaku', async ({page}) => {
        const inputField = page.locator('.dropdown-vue-wrapper').first()
        const wargaku = page.locator('.dropdown-vue-content-item').first().getByText('Wargaku')
        const priorty = page.locator('.dropdown-vue-wrapper').nth(1).getByText('Menengah').first()
        const nomorTiket = page.locator('[class="form-label fs-6"]').getByText('Nomor Tiket')
        const nomorTiketField = page.getByPlaceholder('Masukkan nama usulan').nth(1)
        await inputField.click()
        await wargaku.click()
        await page.locator('.dropdown-vue-wrapper').nth(1).click()
        await priorty.click()
        await nomorTiketField.click()
        await nomorTiketField.fill('abc-123')
        const value = await nomorTiketField.inputValue()

        expect(wargaku).toHaveText('Wargaku')
        expect(nomorTiket).toHaveText('Nomor Tiket')
        expect(priorty).toHaveText('Menengah')
        expect(value).toEqual('abc-123')
 
    })

    test.skip('jenis usulan: media', async ({page}) => {
        const inputField = page.locator('.dropdown-vue-wrapper').first()
        const media = page.locator('.dropdown-vue-content-item').first().getByText('Media')
        const priorty = page.locator('.dropdown-vue-wrapper').nth(1).getByText('Menengah').first()
        await inputField.click()
        await media.click()
        await page.locator('.dropdown-vue-wrapper').nth(1).click()
        await priorty.click()

        expect(media).toHaveText('Media')
        expect(priorty).toHaveText('Menengah')

    })
    
    test.skip('jenis usulan: sapa warga surabaya', async ({page}) => {
        const usulan = 'Sapa Warga Surabaya'
        const inputField = page.locator('.dropdown-vue-wrapper').first()
        const media = page.locator('.dropdown-vue-content-item').first().getByText(usulan)
        const priorty = page.locator('.dropdown-vue-wrapper').nth(1).getByText('Rendah').first()
        await inputField.click()
        await media.click()
        await page.locator('.dropdown-vue-wrapper').nth(1).click()
        await priorty.click()

        expect(media).toHaveText(usulan)
        expect(priorty).toHaveText('Rendah')

    })

    test.skip('jenis usulan: kecamatan kelurahan', async ({page}) => {
        const usulan = 'Kecamatan Kelurahan'
        const inputField = page.locator('.dropdown-vue-wrapper').first()
        const media = page.locator('.dropdown-vue-content-item').first().getByText(usulan)
        const priorty = page.locator('.dropdown-vue-wrapper').nth(1).getByText('Rendah').first()
        await inputField.click()
        await media.click()
        await page.locator('.dropdown-vue-wrapper').nth(1).click()
        await priorty.click()

        expect(media).toHaveText(usulan)
        expect(priorty).toHaveText('Rendah')

    })

    test.skip('jenis usulan: e-surat', async ({page}) => {
        const usulan = 'E-surat'
        const inputField = page.locator('.dropdown-vue-wrapper').first()
        const media = page.locator('.dropdown-vue-content-item').first().getByText(usulan)
        const priorty = page.locator('.dropdown-vue-wrapper').nth(1).getByText('Rendah').first()
        await inputField.click()
        await media.click()
        await page.locator('.dropdown-vue-wrapper').nth(1).click()
        await priorty.click()

        expect(media).toHaveText(usulan)
        expect(priorty).toHaveText('Rendah')

    })

    test.skip('jenis usulan: perantingan', async ({page}) => {
        const usulan = 'Perantingan'
        const inputField = page.locator('.dropdown-vue-wrapper').first()
        const media = page.locator('.dropdown-vue-content-item').first().getByText(usulan)
        const priorty = page.locator('.dropdown-vue-wrapper').nth(1).getByText('Rendah').first()
        await inputField.click()
        await media.click()
        await page.locator('.dropdown-vue-wrapper').nth(1).click()
        await priorty.click()

        expect(media).toHaveText(usulan)
        expect(priorty).toHaveText('Rendah')

    })

    test.skip('jenis usulan: pohon tumbang', async ({page}) => {
        const usulan = 'Pohon Tumbang'
        const inputField = page.locator('.dropdown-vue-wrapper').first()
        const taruna = page.locator('.dropdown-vue-content-item').first().getByText(usulan)
        const priorty = page.locator('.dropdown-vue-wrapper').nth(1).getByText('Tinggi')
        await inputField.click()
        await taruna.click()
        await priorty.click()

        expect(taruna).toHaveText(usulan)
        expect(priorty).toHaveText('Tinggi')

        
    })

    test('pilih rayon', async ({page}) => {
        const rayonName = 'Surabaya Pusat'
        const inputField = page.locator('.dropdown-vue-wrapper').nth(2)
        const rayon = page.locator('.dropdown-vue-content-item').nth(2).getByText(rayonName)
        const choosenValue = page.getByText(rayonName).first()

        await inputField.click()
        await rayon.click()
        await expect(choosenValue).toHaveText(rayonName)
    })

    test('pilih jalan', async ({page}) => {
        const inputJalan = 'Jl. Kepoetran'
        const inputField = page.locator('.dropdown-vue-wrapper').nth(3)
        const jalan = page.locator('.dropdown-vue-content-item').nth(3).getByText(inputJalan)

        await inputField.click()
        await jalan.click()
    })

    test('input RT', async ({page}) => {
        const inputField = page.getByPlaceholder('Cth: 01').first()
        await inputField.click()
        await inputField.fill('01')
        const valueField = inputField.inputValue()

        expect(valueField).toContain('01')

    })

    test('input RW', async ({page}) => {
        const inputField = page.getByPlaceholder('Cth: 01').last()
        await inputField.click()
        await inputField.fill('01')
        const valueField = await inputField.inputValue()

        expect(valueField).toContain('01')

    })

    test('input alamat', async ({page}) => {
        const addr = 'Jl. Tegalsari No. 16'
        const inputField = page.getByPlaceholder('Masukkan alamat lengkap')
        await inputField.click()
        await inputField.fill(addr)
        const valueField = await inputField.inputValue()

        expect(valueField).toContain(addr)

    })

    test('set location', async ({page}) => {
        const location = page.getByPlaceholder('Cari lokasi pada maps')
        await location.click()
        await location.fill('Tegalsari')
        await page.waitForTimeout(3000)

        const mapElement = page.locator('#map')
 
        if (!mapElement) {
        throw new Error('Elemen #map tidak ditemukan');
        }

        const box = await mapElement.boundingBox();
            if (!box) {
            throw new Error('Bounding box tidak tersedia (mungkin elemen belum tampil)');
        }

        await page.mouse.click(
            box.x + 100,
            box.y + 200
        )

    })

    test('upload file pendukung', async ({page}) => {
        const uploadFile = page.locator('input[type="file"]').first()

        await uploadFile.setInputFiles(['/Users/drajat/Documents/valid.jpg',  
                                        '/Users/drajat/Documents/view.jpeg', 
                                        '/Users/drajat/Documents/file.pdf'])

        await page.waitForTimeout(5000)

        await page.locator('.dz-remove').last().click()
    })


    test('upload foto Sekarang', async ({page}) => {
        const uploadFile = page.locator('input[type="file"]').last()
        await uploadFile.setInputFiles(['/Users/drajat/Documents/valid.jpg', 
                                        '/Users/drajat/Documents/view.jpeg', 
                                        '/Users/drajat/Documents/file.pdf'])

        await page.waitForTimeout(5000)

        await page.locator('.dz-remove').last().click()
    })

})

test('save', async ({page}) => {
    const popUpText = 'Berhasil'
    const button = page.locator('[class="btn btn-custom"]')
    const popUp = page.locator('.swal2-title').getByText(popUpText)
    await button.click()

    expect(popUp).toContainText(popUpText)

})
