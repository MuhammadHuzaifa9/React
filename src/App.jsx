

import { Route, Routes } from 'react-router'
import './App.css'
import Products from './component/pages/Products'
import ProductDetail from './component/pages/ProductDetail'

function App() {
  

  return (
    
    <Routes>
      <Route path='/' element={<Products />} />
      <Route path='/products' element={<Products />} />
      <Route path='products/:id' element={<ProductDetail />} />

    </Routes>
  )
}

export default App
