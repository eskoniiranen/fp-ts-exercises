import { Component } from "solid-js";
import { InputProps } from "./types";

const Input: Component<InputProps> = (props) => {

  return (
    <div class="mt-1 flex flex-column w-1/2">
      <label>
        <div class="mb-1 text-indigo-900">
          {props.label}:
        </div>
        <input
          class={`p-1 rounded border border-black ${props.class}`}
          type="number"
          id={props.id}
          onChange={(e) => props.onChange(e)}
          placeholder={props.placeholder}
        />
      </label>
    </div>
  )
}

export default Input;
