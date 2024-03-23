import { Route, Routes } from "react-router"
import './styles/main.scss'
import {routes} from './routes'

const App = () => {
  return (
    <section className="app">
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={<route.element />}  />
          ))}
        </Routes>
    </section>
  )
}

export default App
