import { createContext, useContext, useState } from "react";

const NavbarSlotContext = createContext(null);

export function useNavbarSlot() {
    return useContext(NavbarSlotContext);
}

export function NavbarSlotProvider({ children }) {
    const [slot, setSlot] = useState(null);

    return (
        <NavbarSlotContext.Provider value={{ slot, setSlot }}>
            {children}
        </NavbarSlotContext.Provider>
    );
}
