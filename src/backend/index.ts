//import { launch, Page } from "puppeteer";
import { getLink, synthesis } from "./config";
import axios from 'axios'
import {load} from "cheerio";
export const main = async (option: IOption) => {

  //const browser = await launch({ headless: false, timeout: 0 })
  //const page = await browser.newPage();

  console.log('Browser opened successfully!!!');

  const url = new URL('https://scholar.google.com/scholar')
  url.searchParams.set('start', option.start)
  url.searchParams.set('hl', 'en')
  url.searchParams.set('as_sdt', '0,5')
  url.searchParams.set('q', option.query)
  url.searchParams.set('btnG', '')
  url.searchParams.set('oq', 'r')

  console.log(url.href);

  try {
    //await page.goto(url.href)
    const {data} = await axios.get('https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3')

    const $ =  load(data)
    const listItems = $(".plainlist ul li");
    // const link = await getLink(page);

    // const container = await synthesis(link, browser)
    const countries:any[] = [];
    // Use .each method to loop through the li we selected
    listItems.each((idx, el) => {
      // Object holding data for each country/jurisdiction
      const country = { name: "", iso3: "" };
      // Select the text content of a and span elements
      // Store the textcontent in the above object
      country.name = $(el).children("a").text();
      country.iso3 = $(el).children("span").text();
      // Populate countries array with country data
      countries.push(country);
    });
    // Logs countries array to the console
    console.dir(countries);
    
    // await browser.close();
    option.onComplete(countries)
  } catch (error) {
    console.log('Error has occurred', error);
    //await browser.close();
  }
};


 

interface IOption {
  query: string;
  start: string;
  onComplete: (data: any) => void
}