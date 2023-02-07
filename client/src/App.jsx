import React, {useContext} from 'react'
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import {logo} from './assets'
import {Home, CreatePost} from './pages'
import { UserContext } from "./context/userContext";
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import SignInModal from './components/SignInModal';
import SignUpModal from './components/SignUpModal';
import Footer from './components/Footer';


const App = () => {

  const {currentUser} = useContext(UserContext)

  return (
      <BrowserRouter>
        <SignInModal />
        <SignUpModal />
        <header className='w-full flex justify-between items-center bg-white sm:px-8 px-3 py-2 border-b border-b-[#e6ebf4]'>
          <Link to={"/"}>
            <img src={logo} alt="logo" className='sm:w-28 w-20 pic object-contain' />
          </Link>
          { currentUser &&
          <Link to={"/create-post"} className="font-inter sm:text-[20px] main-btn text-sm font-medium bg-[#6469ff] hover:bg-[#474ce7] mx-auto text-white px-4 py-2.5 rounded-md">
              Génerer Image
          </Link>
          }
          { 
          !currentUser  ?
          <LoginButton /> :
          <LogoutButton />
          }
        </header>
        <main className='sm:p-8 pb-2 px-2 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
          <Routes>
              <Route path='/' element={<Home/>} />
              { currentUser &&
                <Route path='/create-post' element={<CreatePost/>} />
              }
          </Routes>
          <Footer />
        </main>
      </BrowserRouter>
  )
}

export default App