import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

//create action
export const createUser = createAsyncThunk('create-user',async(data,{rejectWithValue})=>{
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
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})

//read action
export const showUser = createAsyncThunk('read-user',async(_,{rejectWithValue})=>{
    const response = await fetch('https://68d2aa2acc7017eec544cb72.mockapi.io/users')
    try {
        const result = await response.json()
        return result
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const userReducer = createSlice({
    name: "userReducer",
    initialState:{
        users:[],
        loading:false,
        error: null
    },
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(createUser.pending,(state)=> {state.loading = true})
        .addCase(createUser.fulfilled,(state, action)=>{
            state.loading = false
            state.users.push(action.payload)
        })
        .addCase(createUser.rejected,(state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        .addCase(showUser.pending,(state)=> {state.loading = true})
        .addCase(showUser.fulfilled,(state, action)=>{
            state.loading = false
            state.users = action.payload
        })
        .addCase(showUser.rejected,(state, action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export default userReducer.reducer
