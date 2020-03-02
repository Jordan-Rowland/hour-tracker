import { useState } from "react";

function useInput(state="") {
  const [ input, setInput ] = useState(state);

  function handleChange(e) {
    setInput(e.target.value);
  }

  return [ input, handleChange, setInput ];
}

export default useInput;
