import React from "react";

export enum CartActionType {
    Add = "add",
    Remove = "remove"
}

interface CartAction {
    type: CartActionType;
    id: string;
}

export const CART_STORAGE_LABEL = "cart";
export const initialCartValue = JSON.parse(localStorage.getItem(CART_STORAGE_LABEL) || "[]");

export const reducer = (state: string[], { type, id }: CartAction) => {
    switch (type) {
        case CartActionType.Add:
            return Array.from(new Set([...state, id]));
        case CartActionType.Remove:
            return state.filter((item) => item !== id);
        default:
            throw new Error();
    }
};

export const CartContext = React.createContext<{ state: string[]; dispatch: (action: CartAction) => void }>({
    state: initialCartValue,
    dispatch: () => {}
});
