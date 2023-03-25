import { Component } from "solid-js";
import { Link } from "@solidjs/router";
import { ActionProps } from "./types";

const Action: Component<ActionProps> = (props) => {
  return (
    <>
      <Link href={props.href}>
        <div class="w-max mt-12 p-2 text-lg uppercase text-indigo-900 text-center rounded border border-indigo-900 bg-gradient-to-b from-indigo-200 to-blue-300 shadow-xl">
          <p>{props.text}</p>
        </div>
      </Link>
    </>
  )
}

export default Action;
