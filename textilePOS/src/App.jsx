import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppContextProvider } from './store/AppContext.jsx'
import Sidebar from './components/layout/Sidebar.jsx'
import Topbar from './components/layout/Topbar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Business from './pages/Business.jsx'
import Products from './pages/Products.jsx'
import Sales from './pages/Sales.jsx'
import Purchases from './pages/Purchases.jsx'
import Customers from './pages/Customers.jsx'
import Suppliers from './pages/Suppliers.jsx'
import Cart from './pages/Cart.jsx'
import Orders from './pages/Orders.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Sidebar />
          <div className="content">
            <Topbar />
            <main className="content-main">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/business" element={<Business />} />
                <Route path="/products" element={<Products />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/purchases" element={<Purchases />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<Dashboard />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </AppContextProvider>
  )
}

export default App
