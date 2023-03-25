import { Component } from "solid-js";
import { Link, Route, Routes } from "@solidjs/router";
import Error from "./views/Error";
import Snowplows from "./views/Snowplows";
import SingleSnowplow from "./views/SingleSnowplow";

const App: Component = () => {
  return (
    <div class="min-h-screen flex bg-gradient-to-b from-indigo-200 to-blue-300">
      <div class="m-auto my-5 p-3 max-w-screen-md rounded border border-indigo-900 bg-white shadow-2xl">
        <header class="mx-2 my-5">
          <Link href="/">
            <h1 class="text-5xl font-bold text-indigo-900 uppercase">Aurataanko sinun kotikatusi taas viimeisenä?</h1>
          </Link>
        </header>
        <main class="m-2">
          <Routes>
            <Route component={Snowplows} path="/" />
            <Route component={SingleSnowplow} path="/:id" />
            <Route component={Error} path="/error" />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
