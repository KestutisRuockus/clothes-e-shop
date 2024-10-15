import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import ClothesEshopIndex from '../ClothesEshopIndex'
import MainLayout from './layouts/MainLayout'
import ProductModal, {productDetailsLoader} from './components/Product/ProductModal'
import CurrentProductsLayout from './layouts/CurrentProductsLayout'
import CurrentSelectedCollection from './pages/CurrentCollection/CurrentSelectedCollection'
import ShoppingCartLayout from './layouts/ShoppingCartLayout'
import ShoppingCart from './pages/ShoppingCart/ShoppingCart'
import Checkout from './pages/Checkout/Checkout'
import NotFound from './pages/NotFound/NotFound'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<ClothesEshopIndex />}>
        <Route index element={<MainLayout />} />
        <Route
          path=":id"
          element={<ProductModal />}
          loader={productDetailsLoader}
        />
        <Route path="collection" element={<CurrentProductsLayout />}>
          <Route index element={<CurrentSelectedCollection />} />
          <Route
            path=":id"
            element={<ProductModal />}
            loader={productDetailsLoader}
          />
        </Route>
        <Route path="shoppingcart" element={<ShoppingCartLayout />}>
          <Route index element={<ShoppingCart />} />
          <Route
            path=":id"
            element={<ProductModal />}
            loader={productDetailsLoader}
          />
          <Route path="checkout" element={<Checkout />} />
        </Route>
        <Route path='*' element={<NotFound /> }/>
      </Route>
    )
  )


  return (
    <RouterProvider router={router} />
  )
}

export default App
