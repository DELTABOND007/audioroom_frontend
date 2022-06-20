import { useState,useCallback, useRef,useEffect } from "react"

export const useStateCallback=(initialState)=>{
    const [state,setState]=useState(initialState)
    const cbRef=useRef ///basically used so that things stored inside it is stored in rendered so that no need to re render
    const updateState=useCallback(
      (newState,cb) => {
        cbRef.current=cb;
        setState((prev)=>{
            return typeof newState==='function'? newState(prev):newState;
        })
    },[])
    useEffect(() => {
        if(cbRef.current){
            cbRef.current(state);
            cbRef.current=null;
        }
     
    }, [state])
    
    return [state,updateState]
    
}