import { launch, Page } from "puppeteer";
import { getLink, synthesis } from "./config";

export const main = async (option: IOption) => {

  const browser = await launch({ headless: false, timeout: 0 })
  const page = await browser.newPage();

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
    await page.goto(url.href)



    const link = await getLink(page);

    const container = await synthesis(link, browser)

    await browser.close();
    option.onComplete(container)
  } catch (error) {
    console.log('Error has occurred', error);
    await browser.close();
  }
};


 

interface IOption {
  query: string;
  start: string;
  onComplete: (data: any) => void
}