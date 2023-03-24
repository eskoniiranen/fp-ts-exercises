import { Component } from "solid-js";
import { Link, Route, Routes } from "@solidjs/router";
import Error from "./views/Error";
import NotFound from "./views/NotFound";
import Snowplows from "./views/Snowplows";
import SingleSnowplow from "./views/SingleSnowplow";

const App: Component = () => {
  return (
    <div class="h-full m-2">
      <header class="mx-2 my-4">
        <Link href="/">
          <h1 class="text-3xl font-bold">Aurataanko sinun kotikatusi taas viimeisenä?</h1>
        </Link>
      </header>
      <main class="m-2">
        <Routes>
          <Route component={Snowplows} path="/" />
          <Route component={SingleSnowplow} path="/:id" />
          <Route component={Error} path="/error" />
          <Route component={NotFound} path="/not-found" />
        </Routes>
      </main>
    </div>
  );
};

export default App;
