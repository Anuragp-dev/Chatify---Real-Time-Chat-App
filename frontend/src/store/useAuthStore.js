import { create } from 'zustand'
import axiosInstance from '../lib/axios'
import toast from 'react-hot-toast'




export const useAuthStore = create((set) => ({

    authUser: null,
    isSigningUp: false,
    isLoggingIng: false,
    isUpdatingProfile: false,
    isLoggingOut: false,


    isCheckingAuth: true,


    checkAuth: async () => {

        try {

            const res = await axiosInstance.get('/auth/check')
            set({ authUser: res.data })

        } catch (error) {
            console.log("error in checking auth", error)
            set({ authUser: null })

        } finally {
            set({ isCheckingAuth: false })
        }
    },


    signup: async (data) => {

        set({ isSigningUp: true })

        try {

            const res = await axiosInstance.post('/auth/signup', data)
            set({ authUser: res.data })
            toast.success("Account created successfully")

        } catch (error) {
            toast.error(error.response.data.message)
            console.log("error in signup", error)

        } finally {
            set({ isSigningUp: false })
        }
    },

    logout: async () => {

        set({ isLoggingOut: true })

        try {

            await axiosInstance.post('/auth/logout')
            set({ authUser: null })
            toast.success("Logged out successfully")

        } catch (error) {
            toast.error(error.response.data.message)
            console.log("error in logout", error)

        } finally {
            set({ isLoggingOut: false })
        }

    },

    login: async (data) => {

        set({ isLoggingIng: true })

        try {
            const res = await axiosInstance.post('/auth/login', data)
            set({ authUser: res.data })
            toast.success("login successfully")

        } catch (error) {
            toast.error(error.response.data.message)
            console.log("error in logout", error)

        } finally {
            set({ isLoggingIng: true })
        }
    },

    updateProfile: async (data) => {

        set({ isUpdatingProfile: true })

        try {
            const res = await axiosInstance.put('/auth/update-profile', data)
            set({ authUser: res.data })
            toast.success("Profile updated successfully")

        } catch (error) {
            toast.error(error.response.data.message)
            console.log("error in update profile", error)

        } finally {
            set({ isUpdatingProfile: false })
        }
    },


}))