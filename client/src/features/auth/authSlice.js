import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    // Si localStorage est user,affiche user sinon n'affiche rien
    user: user? user:null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}

// Register user
export const register= createAsyncThunk('auth/register',async(user, thunkAPI)=>{
    try {
        return await authService.register(user)
    } catch (error) {
        const message=(error.response && 
            error.response.data && 
            error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
    }
})

// Login user
export const login= createAsyncThunk('auth/login',async(user, thunkAPI)=>{
    try {
        return await authService.login(user)
    } catch (error) {
        const message=(error.response && 
            error.response.data && 
            error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
    }
})

// Logout user
export const logout=createAsyncThunk('auth/logout',async()=>{
    await authService.logout()
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        reset: (state) =>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=false
            state.message=''
        }
    },
    extraReducers: (builder) =>{
        builder
              .addCase(register.pending, (state)=>{
                state.isLoading=true
              })
              .addCase(register.fulfilled, (state, action)=>{
                state.isLoading=false
                state.isSuccess=true
                // action.payload vient de createAsyncThunk precisement authService
                state.user=action.payload
              })
              .addCase(register.rejected, (state, action)=>{
                state.isLoading=false
                state.isError=true
                // action.payload vient de message au createAsyncThunk precisement du catch thunkAPI.rejectWithValue
                state.message=action.payload
                // S'il y a un soucis
                state.user=null
              })
              .addCase(login.pending, (state)=>{
                state.isLoading=true
              })
              .addCase(login.fulfilled, (state, action)=>{
                state.isLoading=false
                state.isSuccess=true
                // action.payload vient de createAsyncThunk precisement authService
                state.user=action.payload
              })
              .addCase(login.rejected, (state, action)=>{
                state.isLoading=false
                state.isError=true
                // action.payload vient de message au createAsyncThunk precisement du catch thunkAPI.rejectWithValue
                state.message=action.payload
                // S'il y a un soucis
                state.user=null
              })
              .addCase(logout.fulfilled, (state)=>{
                state.user=null
              })
    }
})

export const { reset }=authSlice.actions
export default authSlice.reducer