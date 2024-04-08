
import { Outlet } from 'react-router-dom';

// Components
import { Header } from '../components/Header.jsx'
import { Footer } from '../components/Footer.jsx'

export const Layout = () => {


  return (
    <>
      <Header/>
      <main>
        <Outlet />
      </main>
     <Footer/>
    </>
  );
};