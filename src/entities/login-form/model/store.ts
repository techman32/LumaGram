import { create } from 'zustand'

type LoginForm = {
  username: string
  password: string
  remember: boolean
}

type LoginFormStore = {
  loginForm: LoginForm
  updateField: (field: keyof LoginForm, value: LoginForm[keyof LoginForm]) => void
  resetForm: () => void
}

export const useLoginFormStore = create<LoginFormStore>((set) => ({
  loginForm: {
    username: '',
    password: '',
    remember: false,
  },
  updateField: (field, value) =>
    set((state) => ({
      loginForm: {
        ...state.loginForm,
        [field]: value,
      },
    })),
  resetForm: () => set({ loginForm: { username: '', password: '', remember: false } }),
}))
