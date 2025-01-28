import React from 'react'
import "../../Config/global"

const NoPageFound = () => {
  return (
    <main>
      <div>
      <img src="https://admiral.digital/wp-content/uploads/2023/08/404_page-not-found-1024x576.png" alt={`Page not Found ${window.appName}`} className='img-fluid my-5' />
      </div>
    </main>
  ) 
}

export default NoPageFound