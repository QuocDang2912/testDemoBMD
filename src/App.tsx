import { useState } from 'react'
import './App.css'
import './styles/main.scss'
import AppRoute from './router';
import LayoutAdmin from './Layouts/LayOutAdmin';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import LayOutSite from './Layouts/LayOutSite';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LayOutSite />}>
          {
            AppRoute.RouteSite.map((route, index) => {
              const Page = route.component;
              return <Route path={route.path} key={index} element={<Page />} />;
            })

          }
        </Route>
        <Route path='/admin' element={ <LayoutAdmin />}>
          {
             AppRoute.RouteAdmin.map((route, index) => {
              const Page = route.component;
              return <Route path={route.path} key={index} element={<Page />} />;
            })
          }
        </Route>
      </Routes>
    </BrowserRouter >
    // <>
    //     <h1 className="text-3xl bg-amber-400 font-bold underline">
    //       Hello world!
    //     </h1>
        
    //       <h1 className="title">
    //       Hello world!
    //     </h1>
    //     <DatePicker/>
    // </>
  )
}

export default App
