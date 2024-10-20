// src/App.jsx
import React, { useCallback, useEffect, useRef, useState } from 'react';

const App = () => {
  const [lenght,setlenght]=useState(8)
  const[numerical_alllowed,set_numerical_allowed]=useState(false)
  const[char_allowed,set_char_allowed]=useState(false)
  const[password,set_password]=useState("")
  const password_genrator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(char_allowed)str+="!@#$%^&*()_{}[]`~"
    if(numerical_alllowed)str+="0123456789"
    for(let i=0;i<lenght;i++){
      let Char=(Math.floor(Math.random()*str.length))
      pass+=str.charAt(Char)

    }
    set_password(pass)

  },[lenght,numerical_alllowed,char_allowed,set_password])
  useEffect(()=>{password_genrator()},[lenght,char_allowed,numerical_alllowed,password_genrator])

  const copypass=useCallback(()=>{
    passref.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])

  const passref=useRef(null)
  return (
  <>
  <div className='w-full max-w-md mx-auto shadow-md rounded-lg  px-4 py-3 my-3 bg-gray-500 text-orange-500'>
     <h1 className='text-white text-center text-3xl my-3'>password genretor</h1>
    <div className='flex shadow rounded-lg
  overflow-hidden mb-4'>
    <input type="text"
    value={password}
    className='outline-none w-full py-1 px-3'
    placeholder='password'
    ref={passref}
    readOnly /> 
    <button className='outline-none mx-3 bg-blue-800 rounded-lg px-4 text-white shrink-0' onClick={copypass}
    >copy</button>
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input type="range"
        name='lenght'
        id='lenght'
        min={6}
        max={100}
        value={lenght}
        className='cursor-pointer'
        
        onChange={(e)=>{
          setlenght(e.target.value)
        }} />
        <label className='py-5' htmlFor="lenght"> lenght: {lenght}</label>
        <input  type="checkbox"
        defaultChecked={numerical_alllowed}
        id='number_check'
        onChange={()=>{
          set_numerical_allowed((prev)=>!prev);
        }}
         />
         <label htmlFor="numerical_alllowed"> numbers</label>
         <input  type="checkbox"
        defaultChecked={char_allowed}
        id='char_check'
        onChange={()=>{
         set_char_allowed((prev)=>!prev);
        }}
         />
         <label htmlFor="char_allowed :">  chars: {char_allowed}</label>


        </div></div> 
    </div>
    
  </>
  
  );
};

export default App;
