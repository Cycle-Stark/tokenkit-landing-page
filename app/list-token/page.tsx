'use client'

import ListToken from '@/components/ListToken'
import Navbar from '@/components/Navbar'
import React from 'react'

const ListTokenContainer = () => {
  return (
    <section className='bg-[#030014] bg-cover bg-center h-screen'>
        <Navbar />
        <ListToken />
    </section>
  )
}

export default ListTokenContainer