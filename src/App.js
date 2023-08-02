import {BrowserRouter as Router, Routes, Route,} from 'react-router-dom'
import Home from './components/pages/Home'
import Company from './components/pages/Company'
import Contato from './components/pages/Contato'
import NovoProjeto from './components/pages/NovoProjeto'
import Project from './components/pages/Project'
import Projects from './components/pages/Projects'

import Container from './components/pages/layout/Container'
import NavBar from './components/pages/layout/NavBar'
import Footer from './components/pages/layout/Footer'

function App() {
  return (
    <Router>
      <NavBar />

      <Container customClass="min-height">
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/contato" element={<Contato />}/>
          <Route path="/company" element={<Company />}/>
          <Route path="/novoprojeto" element={<NovoProjeto />}/>
          <Route path="/projects" element={<Projects />}/>
          <Route path="/project/:id" element={<Project />}/>
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
