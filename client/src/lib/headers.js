import Cookies from 'js-cookie'
import { getToken } from '../auth.js'
const csrftoken = Cookies.get('csrftoken')

// when you send a request that does not need to be authenticated with the jwt token,
// only send the headers.common object, otherwise send the full headers object

export const headers = {
  common: {
    'X-CSRF-TOKEN': csrftoken
  },
  headers: { Authorization: `Bearer ${getToken()}` }
}
