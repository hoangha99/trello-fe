
import { PostLogin, PostData, DeleteData, GetData, PostRegister } from '../helpers';
import url from '../url'

export const loginApi = async (body) =>
    PostLogin(url.urlLogin, body)
        .then(res => res)
        .catch(err => err)


export const testApi = async (body) =>
    GetData(url.urlTest, body)
        .then(res => res)
        .catch(err => err)

export const registerApi = async (body) =>
    PostRegister(url.urlRegiter, body)
        .then(res => res)
        .catch(err => err)

export const deleteBoardApi = async (body) =>
    DeleteData(url.urlBoardDelete, body)
        .then(res => res)
        .catch(err => err)




