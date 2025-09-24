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

//edit action
export const editUser = createAsyncThunk('edit-user',async(data,{rejectWithValue})=>{
    const response = await fetch (`https://68d2aa2acc7017eec544cb72.mockapi.io/users/${data.id}`, 
        {
            method: 'PUT',
            headers: {
                'content-type':'application/json'
            },
            body:JSON.stringify(data)
        }
    )
    try {
        const result = await response.json()
        console.log('updated user',response);
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

//delete action
export const deleteUser = createAsyncThunk('delete-user',async(id,{rejectWithValue})=>{
    const response = await fetch(`https://68d2aa2acc7017eec544cb72.mockapi.io/users/${id}`,{method:'DELETE'})
    try {
        const result = await response.json()
        return result
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

//create slice
const userReducer = createSlice({
    name: "userReducer",
    initialState:{
        users:[],
        loading:false,
        error: null,
        searchTerm: ''
    },
    reducers:{
        setSearchTerm: (state, action)=>{
            state.searchTerm = action.payload
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(createUser.pending,(state)=> {state.loading = true})
        .addCase(createUser.fulfilled,(state, action)=>{
            state.loading = false
            state.users.push(action.payload)
        })
        .addCase(createUser.rejected,(state, action)=>{
            state.loading = false
            state.error = action.payload.message
        })
        .addCase(editUser.pending,(state)=> {state.loading = true})
        .addCase(editUser.fulfilled,(state, action)=>{
            state.loading = false
            state.users = state.users.map(user=>(
                user.id===action.payload.id ? action.payload : user
            ))
        })
        .addCase(editUser.rejected,(state, action)=>{
            state.loading = false
            state.error = action.payload.message
        })
        .addCase(showUser.pending,(state)=> {state.loading = true})
        .addCase(showUser.fulfilled,(state, action)=>{
            state.loading = false
            if(state.searchTerm) {
                
            }
            state.users = action.payload
        })
        .addCase(showUser.rejected,(state, action)=>{
            state.loading = false
            state.error = action.payload.message
        })
        .addCase(deleteUser.pending,(state)=> {state.loading = true})
        .addCase(deleteUser.fulfilled,(state, action)=>{
            const {id} = action.payload
            state.loading = false
            if (id) {
                state.users = state.users.filter(user=>id!==user.id)
            }
        })
        .addCase(deleteUser.rejected,(state, action)=>{
            state.loading = false
            state.error = action.payload.message
        })
    }
})

export const { setSearchTerm } = userReducer.actions
export default userReducer.reducer
