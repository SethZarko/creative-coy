import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'

// Layouts
import { Layout } from './layouts/Layout.jsx'

// Pages
import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx'
import { Packages } from './pages/Packages.jsx'
import { Services } from './pages/Services.jsx'
import { Events } from './pages/Events.jsx'
import { Contact } from './pages/Contact.jsx'
import { NotFound } from './pages/NotFound.jsx'


function App() {

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path="packages" element={<Packages />} />
      <Route path="services" element={<Services />} />
      <Route path="events" element={<Events />} />
      <Route path="contact" element={<Contact />} />

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App