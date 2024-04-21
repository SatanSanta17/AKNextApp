import Image from 'next/image'
import React from 'react'
import Right from '../icons/Right'

function Hero() {
  return (
    <section className='flex grid sm:grid-cols-7 justify-between'>
      <div className='flex flex-col items-left justify-center py-24 px-8 col-span-3'>
        <h1 className='text-4xl font-semibold'>Food that reminds you of <span className='text-primary'>Home</span></h1>
        <p className='my-8 text-gray-500'>Our food is claimed to be the best food tasted by our customers so far, but we believe in trying yourself and then decide</p>
        <div className='flex gap-4 text-sm'>
            <button className='flex gap-2 bg-primary text-white items-center px-4 py-2 rounded-full uppercase'>Order Now <Right/></button>
            <button className='py-2 font-semibold text-gray-600'>Learn more</button>
        </div>
      </div>
      <div className='relative items-right col-span-4'>
        <Image src={"/pizza.png"} layout='fill' objectFit='contain' alt='food-img'/>
      </div>
    </section>
  )
}

export default Hero
