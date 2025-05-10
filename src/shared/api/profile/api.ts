'use server'
import { sendRequestWithToken } from '@/shared/api/api'
import {
  GeneralProfileEditDto,
  PhotoProfileEditDto,
  ProfileDto,
  UsernameProfileEditDto,
} from '@/shared/common/types/profile'

export const getProfile = async (username: string) => {
  return await sendRequestWithToken<ProfileDto>(`users/${username}/profile`, { method: 'GET' })
}

export const editProfile = async (data: GeneralProfileEditDto) => {
  return await sendRequestWithToken<GeneralProfileEditDto>('users/profile', { method: 'PUT', body: data })
}

export const editUsername = async (data: UsernameProfileEditDto) => {
  return await sendRequestWithToken<UsernameProfileEditDto>('users/profile/change-username', {
    method: 'PUT',
    body: data,
  })
}

export const editPhoto = async (data: PhotoProfileEditDto) => {
  const bytes = await data.image.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const serverFormData = new FormData()
  serverFormData.append('image', new File([buffer], data.image.name, { type: data.image.type }))
  serverFormData.append('_method', 'PUT')

  return await sendRequestWithToken<PhotoProfileEditDto>('users/profile/change-image', {
    method: 'POST',
    body: serverFormData,
  })
}
