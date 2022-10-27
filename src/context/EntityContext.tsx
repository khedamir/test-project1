import React, { useEffect, useState } from "react";
import BackApi, { Entity } from "../API/BackApi";

interface StateType {
    eID: number 
}

const IdContext = React.createContext<StateType>({
    eID: 1
})

const IdContextProvider = (props: any) => {
    const [eID, setEID] = useState<Entity>()

    useEffect(() => {
        const fetchData = async () => {
            const response = await BackApi.CreateEntity()
            setEID(response)
        }
        fetchData()
    }, [])

    return (
        <IdContext.Provider value={{
            eID: eID?.id,
        }}
            {...props}
        />
    );
};

const useIdContext = () => React.useContext(IdContext)
export {IdContextProvider, useIdContext}
  