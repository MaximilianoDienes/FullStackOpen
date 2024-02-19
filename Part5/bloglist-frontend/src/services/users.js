import axios from 'axios'
const baseUrl = '/api/users'

import { token } from './blogs'

const getAllUsers = async () => {
  const result = await axios.get(baseUrl)
  return result.data
}

export { getAllUsers }
