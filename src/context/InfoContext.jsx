import { createContext, useContext, useState, useEffect } from "react";

const InfoContext = createContext();

export const useInfoContext = () => useContext(InfoContext);

export default function ({ children }) {
    const [count, setCount] = useState(0);
    const [user, setUser] = useState(null);
    const [isPostChange, setIsPostChange] = useState(false);
    const [postLoading, setPostLoading] = useState(false);

    useEffect(() => {
        let currentUser = localStorage.getItem('user');
        if (currentUser) {
            currentUser = JSON.parse(currentUser);
            setUser(currentUser);
        }
    }, [])

    return <InfoContext.Provider value={{ count, user, isPostChange, setIsPostChange, postLoading, setPostLoading }}>
        <InfoContext.Consumer>{() => children}</InfoContext.Consumer>
    </InfoContext.Provider>
}