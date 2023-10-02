import { ref } from 'vue';
import { defineStore } from 'pinia';
import { AuthService } from '../services/auth';
import { killToken, killUser, saveToken, setUser } from '../common/headerAuth';
import { useToast } from "vue-toastification";
import type { AxiosError } from 'axios';
import type { ILoginRequest, IRegisterRequest } from '@/types';

type CatchError = AxiosError<any, any>;

export const useAuth = defineStore('auth', () => {
  const toast = useToast()
  const authService = new AuthService();
  const credentials = ref({ email: '', password: '' })
  const registerCredentials = ref({ username: '', email: '', password: '' })
  
  const token = ref(localStorage.getItem('authToken') || '')

  async function login(credentials: ILoginRequest) {
    try {
      const response = await authService.login(credentials.email, credentials.password)
      token.value = response.token
      
      saveToken(token.value)
      setUser(response.user)

      toast.success('User logged in successfully')
    } catch (error: unknown) {
      let errorMsg = error as CatchError
      toast.error(errorMsg.response?.data)
    }
  }

  async function register(creds: IRegisterRequest) {
    try {
      await authService.register(creds.username, creds.email, creds.password)
      toast.success('User registered successfully')
    } catch (error: unknown) {
      let errorMsg = error as CatchError
      toast.error(errorMsg.response?.data)
    }
  }

  async function logout() {
    token.value = ''
    killToken()
    killUser()
  }

  return {
    token,
    credentials,
    registerCredentials,
    login,
    register,
    logout
  }

})