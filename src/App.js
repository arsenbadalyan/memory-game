// Components
import Footer from './Components/Footer/Footer';
import Start from './Components/Start/Start';
// Other
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Game from './Components/Game/Game';

function App() {
  return (
    <div className="App">
      <div className="Game">
        <div className="main-container">
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
