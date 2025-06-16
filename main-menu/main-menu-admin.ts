import { Page } from "@playwright/test";

export class NavigationPage {

    readonly page: Page


    constructor(page: Page ){
        this.page = page
    }

    async rayon (){
        await this.page.getByText('Data Master').click()
        await this.page.getByText('Rayon').click()
    }

    async kecamatan(){
        await this.page.getByText('Data Master').click()
        await this.page.getByText('Kecamatan').click()
    }

    async jalan(){
        await this.page.getByText('Data Master').click()
        await this.page.getByText('Jalan').click()    
    }

    async jenisPohon(){
        await this.page.getByText('Data Master').click()
        await this.page.getByText('Jenis Pohon').click()   
    }

    async keteranganLokasi(){
        await this.page.getByText('Data Master').click()
        await this.page.getByText('Keterangan Lokasi').click()   
    }

    async Penanganan(){
        await this.page.getByText('Data Master').click()
        await this.page.getByText('Penanganan').click()   
    }

    async keadaanPohon(){
        await this.page.getByText('Data Master').click()
        await this.page.getByText('Keadaan Pohon').click()   
    }

    async penyebabTumbang(){
    await this.page.getByText('Data Master').click()
    await this.page.getByText('Penyebab Tumbang').click()   
    }

    async pegawai(){
    await this.page.getByText('Data Master').click()
    await this.page.getByText('Pegawai').click()   
    }

    async Tim(){
    await this.page.getByText('Data Master').click()
    await this.page.getByText('Tim').click()   
    }

    async user(){
    await this.page.getByText('Data Master').click()
    await this.page.getByText('User').click()   
    }
   

    async penangananPerantigan(){
    await this.page.getByText('Report').click()
    await this.page.getByText('Penanganan Perantingan').click()   
    }

    async pohonTumbang(){
    await this.page.getByText('Report').click()
    await this.page.getByText('Pohon Tumbang').click()   
    }

    async laporanPerantingan(){
    await this.page.getByText('Report').click()
    await this.page.getByText('Laporan Perantingan').click()   
    }   
    // private async selectGroupMenuItem(groupItemTitle: string){
    // const groupMenuItem = this.page.getByText('Data Master')
    // const expandedState = await groupMenuItem.getAttribute('style')

    //     if(expandedState == "display: none; overflow: hidden;"){
    //         await groupMenuItem.click()
    //     }
    // }
}