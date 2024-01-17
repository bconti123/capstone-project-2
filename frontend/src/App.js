import './App.css';
import { BrowserRouter } from 'react-router-dom';
import NavigationApp from './routes/Navigation';
import RouterApp from './routes/Routes';

function App() {
  return (
    <BrowserRouter>
      <NavigationApp />
      <RouterApp />
    </BrowserRouter>
  );
}

export default App;
