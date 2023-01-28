'use client'
import Image from "next/image";
import Link from "next/link";
export default function Home() {


  return (
    <div>
      <nav className=' p-5 px-48 flex justify-between items-center'>
        <Link href={'/'} className={'text-3xl font-bold'}>My<span className='text-pink-600'>Rec</span></Link>
        <Link href={'/research'} className='bg-pink-600 text-white rounded-lg p-3'>Get Started</Link>
      </nav>
      <Banner />
    </div>
  )
}


const Banner = () => (
  <div className="h-56s bg-banner flex items-center p-12 px-48 gap-x-8">
    <div className="flex flex-col gap-y-12 flex-1">
      <h3 className="text-5xl font-bold text-white">Simplify all your research query</h3>
      <p className="text-white">My Research Extraction Center  is the best researching unit that makes all your research queries very easy and faster</p>
      <Link href={'/research'} className="bg-pink-600 p-4 w-1/3 text-white rounded-lg font-semibold">Start Researching Now</Link>
    </div>
    <div className="flex-1">
      <Image src={'/study_girl.png'} alt={'banner'} width={500} height={100} />
    </div>
  </div>
)

