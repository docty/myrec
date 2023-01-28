import Link from 'next/link'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className='min-h-screen'>
        {children}
        <footer className='bg-black text-white p-8 px-48 mt-4'>
          <p >Copyright Decimalvalues</p>
        </footer>
      </body>
    </html>
  )
}
