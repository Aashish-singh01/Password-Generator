import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllow, setnumberAllow] = useState(false);
  const [charAllow, setcharAllow] = useState(false);
  const [password, setPassword] = useState("");

  // ref Hooks
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllow) str += "0123456789";
    if (charAllow) str += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
    setPassword(pass);
  }, [length, numberAllow, charAllow, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current.value = "Password Copied!";
    setTimeout(() => {
      passwordRef.current.value = password;
    }, 1000);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllow, charAllow, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto sm:block shadow-md rounded-lg px-4 py-3  my-8 bg-gray-800 text-orange-500">
        <h1 className=" text-white text-2xl  text-center  my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="w-full px-3 py-1 outline-none bg-gray-700 text-white"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none text-white px-3 py-0.5 shrink-0 bg-blue-700 cursor-pointer     "
          >
            Copy
          </button>
        </div>
        <div id="options"
          className="flex  text-sm  gap-x-2  justify-between mb-4 "
        >
          <div className="flex  items-center  gap-x-1 ">
            <input
              type="range"
              min={5}
              max={50}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="accent-blue-500 cursor-pointer"
            />
            <label className="text-sm text-white">Length: {length}</label>
          </div>
          <div className="flex  items-center gap-x-1   ">
            <input
              type="checkbox"
              id="numberInput"
              defaultChecked={numberAllow}
              onChange={() => setnumberAllow((prev) => !prev)}
              className="accent-blue-500 cursor-pointer"
            />
            <label className="text-sm text-white">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1  ">
            <input
              type="checkbox"
              id="charInput"
              defaultChecked={charAllow}
              onChange={() => setcharAllow((prev) => !prev)}
              className="accent-blue-500 cursor-pointer"
            />
            <label className="text-sm text-white">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
