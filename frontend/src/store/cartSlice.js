import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    data : [],
    price : 0,
}


const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        add(state,action) {
            return action.payload
        },
        remove(state,action){
            return action.payload
        },
        removeAll(state,action){
            return {data : [], price : 0}
        }
    }
})

export const {add,remove,removeAll} = cartSlice.actions
export default cartSlice.reducer


export const newItem = (currentProduct,quantity) => {

    const {productId,category,images,name,price,userId} = currentProduct
    const url = images[0].url
    let myCart = {productId,category,url,name,price,userId,quantity}
    return myCart
}