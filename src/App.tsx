import { Component } from 'solid-js';
import { Link, Route, Routes } from '@solidjs/router';
import Error from './views/Error';
import NotFound from './views/NotFound';
import Snowplows from './views/Snowplows';
import SingleSnowplow from './views/SingleSnowplow';


const App: Component = () => {
  return (
    <>
      <header>
          <Link href="/">🚜</Link>
        <h1>
          Aurataanko sinun kotikatusi taas viimeisenä?
        </h1>
      </header>
      <Routes>
        <Route component={Snowplows} path="/" />
        <Route component={SingleSnowplow} path="/:id" />
        <Route component={Error} path="/error" />
        <Route component={NotFound} path="/not-found" />
      </Routes>
    </>
  );
};


export default App;
