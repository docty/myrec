import { Page, Browser } from "puppeteer";
import journalSelector from "./journal";


function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const getLink = async (page: Page) => {

    const resultSelector = '#gs_res_ccl_mid > div';


    const link = await page.evaluate(selector => {
        const holder: string[] = [];

        document.querySelectorAll(selector).forEach(anchor => {
            const value = anchor.querySelector('.gs_ri > h3 > a') as HTMLLinkElement;
            if (value) {
                holder.push(value.href)
            }
        })

        return holder;
    }, resultSelector);

    return link


}


export const synthesis = async (link: string[], browser: Browser) => {
    const holder: any[] = [];
    let start = 1;

    for (const item of link) {
        const page = await browser.newPage();
        console.log((start / link.length) * 100);
        await sleep(5000);
        let response = null;
        try {
            response = await page.goto(item, { timeout: 90000, waitUntil: 'load' });
        } catch (error) {
            console.log('Error from Synthesis function');

        }

        if (response?.ok) {
            const contentType = response?.headers()['content-type'];
            const boundary = contentType?.split(';')[0];

            if (boundary === 'application/pdf') {
                console.log('I cannot process pdf files. All pdf files will be automatically downloaded');
            } else {
                const newUrl = new URL(response?.url()!);
                const output = await processPage(newUrl, page);
                holder.push(output)
            }
        }
        start = start + 1;
        await page.close()
    }


    return holder;

}


const processPage = async (url: URL, page: Page) => {

    const journal = journalSelector[url.origin];


    try {

        const title = await page.$eval(journal.title, (item) => (
            item.textContent
        ))


        const abstract = await page.$$eval(journal.abstract, (item) => (
            item.map(v => v.textContent)
        ))

        const output = {
            abstract: abstract.join(' '),
            title: title,
            url: url.href
        }

        return output;
    } catch (error) {
        return {
            url: url.href
        }

    }


}

