import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    INCREMENT_QTY,
    DECREMENT_QTY,
    EMPTY_CART
} from "../constants/ActionTypes";


export default function cartReducer(state = {
    cart: []
}, action) {
    switch (action.type) {
        case ADD_TO_CART:
            const productId = action.product.id
            if (state.cart.findIndex(product => product.id === productId) !== -1) {
                const cart = state.cart.reduce((cartAcc, product) => {
                    if (product.id === productId) {
                        // cartAcc.push({ ...product, qty: product.qty+1, sum: (product.price*product.discount/100)*(product.qty+1) }) // Increment qty
                        cartAcc.push({ ...product, qty: product.qty + 1, sum: (parseInt(product.price)) * (product.qty + 1) }) // Edited
                    } else {
                        cartAcc.push(product)
                    }

                    return cartAcc
                }, [])

                return { ...state, cart }
            }

            // return { ...state, cart: [...state.cart, { ...action.product, qty: action.qty, sum: (action.product.price*action.product.discount/100)*action.qty }] }
            return { ...state, cart: [...state.cart, { ...action.product, qty: action.qty, sum: (parseInt(action.product.price)) * action.qty }] } // Edited

        case DECREMENT_QTY:

            if (state.cart.findIndex(product => product.id === action.productId) !== -1) {
                const cart = state.cart.reduce((cartAcc, product) => {
                    if (product.id === action.productId && product.qty > 1) {
                        //console.log('price: '+product.price+'Qty: '+product.qty)
                        // cartAcc.push({ ...product, qty: product.qty-1, sum: (product.price*product.discount/100)*(product.qty-1) }) // Decrement qty
                        cartAcc.push({ ...product, qty: product.qty - 1, sum: (parseInt(product.price)) * (product.qty - 1) }) // Edited
                    } else {
                        cartAcc.push(product)
                    }

                    return cartAcc
                }, [])

                return { ...state, cart }
            }

            // return { ...state, cart: [...state.cart, { ...action.product, qty: action.qty, sum: action.product.price * action.qty }] }
            return { ...state, cart: [...state.cart, { ...action.product, qty: action.qty, sum: (parseInt(action.product.price)) * action.qty }] } // Edited

        case REMOVE_FROM_CART:
            return {
                cart: state.cart.filter(item => item.id !== action.product_id.id)
            }
        case EMPTY_CART:
            return {
                cart: []
            }

        default:
    }
    return state;
}
