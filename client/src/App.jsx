// React Imports
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
  } from "react-router-dom";
  
  // Layout
  import { Layout } from './layouts/Layout.jsx'
 
  // Pages
  import { Home } from "./pages/Home.jsx";
  import { NotFound } from "./pages/NotFound.jsx";
  import { About } from './pages/About.jsx'
  import { Services } from './pages/Services.jsx'
  import { Events } from './pages/Events.jsx'
  import { Contact } from "./pages/Contact.jsx";
  
  
  // Router
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home />}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/services' element={<Services/>}/>
          <Route path='/events' element={<Events/>}/>
          <Route path='/contact' element={<Contact/>}/>
  
          <Route path='*' element={<NotFound />} />
        </Route>
          
      </>
      
    )
  );
  
  function App() {
  
    return (
      <>
        <RouterProvider router={router}/>
      </>
    )
  }
  
  export default App