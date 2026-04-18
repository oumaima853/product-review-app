'use client';


import SnackbarUi from "../Components/snackbarUI";

import React, { createContext, useContext, useState, useCallback } from 'react';



export const SnackbarContext = createContext();



export default function SnackbarProvider( {children}){

     const [snackbarState, setSnackbarState] = useState({
        open : false,
        message : "",
        snackbarType: "info", // error, success, warning , info
    } );

     const showSnackbar = useCallback((message, type = 'info') => {
    setSnackbarState({ open: true, message:message, snackbarType:type });
  }, []);

    function onClose(){
         setSnackbarState((prev) => ({ ...prev, open: false }));
    }


    return(

<SnackbarContext.Provider value={{showSnackbar }}>

            {children} 


 <SnackbarUi 
                open={snackbarState.open} 
                onClose={onClose} 
                message={snackbarState.message}
                type={snackbarState.snackbarType}
            />
            
           






        </SnackbarContext.Provider>
    );







}



// Custom Hook

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};


