import React, {lazy, Suspense} from 'react';
import './App.css';
import BacktoTop from './components/navigation/Navbar.js';
import Loader from './components/skeletons/Skeleton.js';
const Stats = lazy(()=>import('./components/stat/Stats.js')) 
// import Globalstats from './components/globalstats/Globalstats.js';

function App() {
  return (
    <div className="App">
      <BacktoTop/>
      <Suspense fallback={<Loader/>}>
        <Stats/>
      </Suspense>
    </div>
  );
}

export default App;
