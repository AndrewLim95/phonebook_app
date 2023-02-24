import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  try {
    const request = axios.get(baseUrl)

    return request.then(response => response.data)
  }
  catch (error) {
    console.log('Error fetching data:', error.message);
    throw error;
  }
}
  

const create = newObject => {
  try {
    const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
  }
  catch (error) {
  console.log('Error creating data:', error.message);
  throw error;
  }
}

const update = (id, newObject) => {
  try {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
  }
  catch (error) {
  console.log('Error updating data:', error.message);
  throw error;
  }
}

const deleteItem = (id) => {
  try {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
  }
  catch (error) {
  console.log('Error deleting data:', error.message);
  throw error;
  }
}
  
export default { getAll, create, update, deleteItem }