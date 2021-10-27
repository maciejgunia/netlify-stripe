import React from "react";

export enum CartActionType {
    Add = "add",
    Remove = "remove",
    Clear = "clear"
}

export interface CartAction {
    type: CartActionType;
    id?: string;
}

export const CART_STORAGE_LABEL = "cart";
export const initialCartValue = JSON.parse(localStorage.getItem(CART_STORAGE_LABEL) || "[]");

export const reducer = (state: string[], { type, id }: CartAction): string[] => {
    if (type === CartActionType.Add && typeof id === "undefined") {
        throw new Error("You need to provide an id");
    }

    switch (type) {
        case CartActionType.Add:
            return Array.from(new Set([...state, id])) as string[];
        case CartActionType.Remove:
            return state.filter((item) => item !== id);
        case CartActionType.Clear:
            return [];
        default:
            throw new Error(`Unsupported Action type ${type}`);
    }
};

export const CartContext = React.createContext<{ state: string[]; dispatch: (action: CartAction) => void }>({
    state: initialCartValue,
    dispatch: () => {}
});
