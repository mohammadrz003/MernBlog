import React from 'react'
import Header from './Header'
import Footer from './Footer'

function MainLayout({children}) {
  return (
      <div>
          <Header />
          {children}
          <Footer />

    </div>
  )
}

export default MainLayout