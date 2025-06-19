import {useState,useEffect} from 'react';

export default function useLocalStorage(defKey,defData){
    const [exportObj,setExportObj] = useState(defData);

    useEffect(()=>{
        try{
            const checkPreKey=localStorage.getItem(defKey);
            if(checkPreKey){
                const parsedData=JSON.parse(checkPreKey);
                setExportObj(parsedData);
            }
        }
        catch{
            console.log('Saved data not found');
        }
    },[defKey])
    function setSavedValue(key,value){
        try{
            if(!key){
                throw new Error('Key is empty');
            }
            if(!value){
                throw new Error('Value is empty');
            }
        const dataObj={
            id:key,
            name:value
        }
        localStorage.setItem(key,JSON.stringify(dataObj))
        const retrivedData=JSON.parse(localStorage.getItem(key));
        setExportObj(retrivedData);
    }
    catch{
        console.log('Error saving data in local storage');
    }
    }
         return [exportObj,setSavedValue]
    
}