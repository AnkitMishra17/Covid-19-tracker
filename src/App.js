import React, {lazy, Suspense} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import BacktoTop from './components/navigation/Navbar.js';
import Loader from './components/skeletons/Skeleton.js';
import Gloader from './components/skeletons/globalskeleton.js';
const Banner =  lazy(()=>import('./components/banner/Banner.js'));
const Stats = lazy(()=>import('./components/stat/Stats.js')) 
const Globalstats = lazy(()=>import('./components/globalstats/Globalstats.js')) 
const Countrystat = lazy(()=>import('./components/individualstats/Individual.js')) 
// import Globalstats from './components/globalstats/Globalstats.js';

function App() {
  return (
    <Router>
    <div className="App">
      <BacktoTop/>
        <Route exact path="/">
          <Suspense fallback={<Loader/>}>
                <Banner/>
                <Stats/>
          </Suspense>
          <Suspense fallback={<Gloader/>}>
            <Globalstats/>
          </Suspense>
        </Route>
        <Suspense fallback={<Loader/>}>
          <Route path="/country/:id" component={Countrystat}>
          </Route>
        </Suspense>
    </div>
    </Router>
  );
}

export default App;
