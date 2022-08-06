import React from 'react'
import Search from '../../components/search/Search'
import Navbar from '../../components/navbar/Navbar'
import "./home.css"

export default function Home() {
  return (
    <>
      <Navbar />
      <div className='search-container'>
        <Search />
      </div>
    </>
  )
}
