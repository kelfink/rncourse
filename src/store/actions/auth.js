import { TRY_AUTH } from './actionTypes'

export const tryAuth = (authData) => {
    console.log("do tryAuth action")
    return {
        type: TRY_AUTH,
        authData: authData
    }
}