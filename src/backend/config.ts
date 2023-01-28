import axios, { AxiosHeaders, AxiosResponseHeaders } from "axios";
import { CheerioAPI, load } from "cheerio";


import journalSelector from "./journal";


function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const getLink = async ($: CheerioAPI) => {

    const selector = $('#gs_res_ccl_mid > div');
    const links: string[] = [];

    selector.each((idx, el) => {

        const result = $(el).find('.gs_ri > h3 > a').attr('href') as string

        if (result)
            links.push(result)

    });
    return links


}


export const synthesis = async (link: string[]) => {
    const holder: any[] = [];
    // let start = 1;

    for (const url of link) {

        //     console.log((start / link.length) * 100);
        await sleep(10000);
        
        try {


            const { data, headers } = await axios.get(url)
            const $ = load(data)

            const extract = exaction($, headers, url)
            holder.push(extract)
        } catch (error) {
            continue;

        }


        //     start = start + 1;

    }

    return holder;

}

const exaction = ($: CheerioAPI, headers: any, url: string) => {

    const contentType = headers['content-type'];
    const boundary = contentType?.split(';')[0];

    if (boundary === 'application/pdf') {
        //console.log('I cannot process pdf files. All pdf files will be automatically downloaded');
        return { url }
    } else {
        const newUrl = new URL(url);
        const output = processPage(newUrl, $);
        return output;

    }


}


const processPage = (url: URL, $: CheerioAPI) => {

    const journal = journalSelector[url.origin];



    try {

        const title = $(journal.title).text();
        const abstracts = $(journal.abstract);

        const abstract = abstracts.map((v, el) => $(el).text())


        const output = {
            abstract: abstract.toArray().join(' '),
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

