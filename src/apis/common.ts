import { UPLOAD_TYPE_ENUM } from '@/constant/common'
import { request } from '@/request'
import { getOS } from '@/utils/common'
import { VarFile } from '@varlet/ui'

/**
 * 上传文件
 * @param data
 * @returns
 */
export const apiUploadFile = (data: { imgFile: VarFile['file']; uploadType: UPLOAD_TYPE_ENUM }) => {
  const formData = new FormData()

  formData.append('imgFile', data.imgFile!)
  formData.append('uploadType', String(data.uploadType))
  formData.append('os', String(getOS()))

  return request.post<Res<{ url: string }>>('/h5/v1/image/upload', formData)
}
