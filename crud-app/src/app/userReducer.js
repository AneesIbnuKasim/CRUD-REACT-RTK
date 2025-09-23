import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


export const createUser = createAsyncThunk('create-user',async(data)=>{
    console.log('in create data:',data);
    
    const response = await fetch ('https://68d2aa2acc7017eec544cb72.mockapi.io/users', 
        {
            method: 'POST',
            headers: {
                'content-type':'application/json'
            },
            body:JSON.stringify(data)
        }
    )
    try {
        const result = await response.json()
        console.log('result',result);
        
        return result
    } catch (error) {
        console.log(error);
        
    }
})

const userReducer = createSlice({
    name: "userDetails",
    initialState:{
        users:[],
        loading:false,
        error: null
    },
    reducers: {
        [createUser.pending] : (state)=> state.loading = true,
        [createUser.fulfilled] : (state, action)=>{
            state.loading = false
            state.users.push(action.payload)
        },
        [createUser.rejected] : (state, action)=>{
            state.loading = false
            state.users = action.payload
        },
    }
})

export default userReducer.reducer
