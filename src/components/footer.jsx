import React from 'react'

export default function Footer() {
  if (window.location.pathname==='/')
  return ''
  else
  return (
    <div>
    <footer class="bg-dark text-center text-white" style={{width:"100%",position:"absolute",bottom:"0"}}>
  <div class="text-center p-3" style={{backgroundColor: (0, 0, 0, 0.2)}}>
    © 2023 Copyright:    FastFood
  </div>

</footer>
</div>
  )
  
}
