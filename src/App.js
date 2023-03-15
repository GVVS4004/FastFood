import './App.css';
import Home from './pages/Home'
import Login from './pages/Login'
import Contact from './pages/Contact';
import Footer from './components/footer'
import Cart from './components/Cart';
import {
  BrowserRouter as Router,Routes,Route, Link
} from 'react-router-dom';
import Nav from './components/Navbar';
import SignUp from './pages/SignUp';
import CartProvider from './components/ContextReducer';
export default function App(){
  return (
    <CartProvider>
       <Router>
        <div>
        <Nav />
          <Routes>
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path='/cart' element={<Cart />} /> 
          </Routes>
          <Footer />
        </div>
        {/* <Cart /> */}
      </Router> 
    </CartProvider>
  );
}

