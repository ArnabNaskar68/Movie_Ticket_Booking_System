import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [inputVal,setInputVal] = useState(''); // user input value
  const [key,setKey]= useState(0);//user input key
  const [submitVal, setSubmitVal] =useState('');// to store the complete value after submit is clicked
  const [submitKey, setSubmitKey] =useState(0); // to store the complete key after submit is clicked
  const [list,setList] =useState([]); //to append new objects into the array
  const [searchKey,setSearchKey]= useState(0);// for the searched key value by user
  const [resultObj,setResultObj] = useState({}); // to store the user searched value
  
   
  function handleClick(){
    setSubmitVal(inputVal);
    setSubmitKey(key);
  }
  useEffect(()=>{
    try{
    if(!submitKey){
      console.log('Enter a key');
    }
    if(!submitVal){
      console.log('Enter a Value');
    }
    const createObj={
      id:submitKey,
      name:submitVal
    }
    localStorage.setItem(submitKey,JSON.stringify(createObj));
    const retriveValue= localStorage.getItem(submitKey);
    const conValue=JSON.parse(retriveValue);

    if(conValue && conValue.id && conValue.name){
      setList(iterator=> [...iterator,conValue]);
    }}
    catch{
      console.log('Value could not be locally Saved');
    }
  },[submitVal, submitKey]);


  function deleteValue(argid){
    setList(list.filter(i=>i.id!=argid));
    localStorage.removeItem(argid);
  }

  function searchValuefunc(){
    if(searchKey){
      const returnedValue=JSON.parse(localStorage.getItem(searchKey));
      if(!returnedValue){
        console.log('This key has no Value');
      }else{
      setResultObj(returnedValue);
      }
    }
  }

  return (
    <>
    {/* user input value element */}
    <input
    type='text'
    value={inputVal}
    placeholder='enter some value...'
    onChange={(e)=>setInputVal(e.target.value)}/>


    {/* user input key element */}
    <input
    type='number'
    placeholder='Enter a number...'
    value={key}
    onChange={(e)=>setKey(e.target.value)}/>

    
    {/* submit button */}
    <button
    onClick={handleClick}
    >Submit</button>


    {/* user search option through input key */}
    <h1>{resultObj.name}</h1>

    <input
    type='number'
    placeholder='search value through key'
    onChange={(e)=>setSearchKey(e.target.value)}
    />
    <button 
    onClick={searchValuefunc}>Search</button>


    {/* print the array list */}
    <ol>
    {list.map(i=>(
      <li key={i.id}>{i.id} && {i.name}
      <button
      onClick={()=>deleteValue(i.id)}
      >Remove</button></li>))}
    </ol>
    </>
  );
}

export default App;