import { useState, useCallback, useEffect, useRef} from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordGenerator = useCallback(() => {
    // now generate password here:
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let num = '0123456789';
    let char = '~@#$%^&*'
    if(numberAllowed) str += num;
    if(charAllowed) str += char;

    
    for(let i = 0; i < length; i++) {
      let idx = Math.floor(Math.random() * str.length + 1);
      pass += str[idx];
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword])

// useRef hook :
  const passwordRef = useRef(null);

  const copyToClip = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 3)
    window.navigator.clipboard.writeText(password)
  }, [password])

  // useEffect hook:
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (

    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
      <h1 className='text-center text-white my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text"
        value={password}
        className='outline-none w-full py-1 px-3' 
        placeholder='Password'
        readOnly
        ref={passwordRef} />
        <button
        onClick={copyToClip}  className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >Copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex item-center gap-x-1">
          <input 
          type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}} />
          
          <label>Length: ({length})</label>
        </div>
        <div className="flex item-center gap-x-1">
          <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id='numberInput'
          onChange={() => {
            setAllowed((prev) => !prev)
          }} />
          <label>Number</label>
        </div>
        <div className="flex item-center gap-x-1">
          <input
          type="checkbox"
          defaultChecked={charAllowed}
          id='charInput'
          onChange={() => {
            setcharAllowed((prev) => !prev)
          }} />
          <label>Character</label>
        </div>
      </div>
    </div>
  )
}

export default App
