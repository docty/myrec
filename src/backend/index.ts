//import { launch, Page } from "puppeteer";
import { getLink, synthesis } from "./config";
import axios from 'axios'
import { load } from "cheerio";
export const main = async (option: IOption) => {



  console.log('Browser opened successfully!!!');

  const url = new URL('https://scholar.google.com/scholar')
  url.searchParams.set('start', option.start)
  url.searchParams.set('hl', 'en')
  url.searchParams.set('as_sdt', '0,5')
  url.searchParams.set('q', option.query)
  url.searchParams.set('btnG', '')
  url.searchParams.set('oq', 'r')



  try {

    const { data } = await axios.get(url.href)


    const $ = load(data)

    const link = await getLink($);

    const container = await synthesis(link)

    option.onComplete(container)
  } catch (error) {
    console.log('Error has occurred from main function \n', error);
    option.onError(error)


  }
};




interface IOption {
  query: string;
  start: string;
  onComplete: (data: any) => void
  onError: (error: any) => void
}