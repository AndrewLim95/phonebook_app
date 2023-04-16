import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  try {
    const request = axios.get(baseUrl)

    return request.then(response => response.data)
  }
  catch (error) {
    console.log('Error fetching data:', error.message);
    throw error;
  }
};
  

const createPerson = (newObject) => {
  try {
    const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
  }
  catch (error) {
  console.log('Error creating data:', error.message);
  throw error;
  }
};

const updatePerson = (id, newObject) => {
  try {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
  }
  catch (error) {
  console.log('Error updating data:', error.message);
  throw error;
  }
};

const deletePerson = (id) => {
  try {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
  }
  catch (error) {
  console.log('Error deleting data:', error.message);
  throw error;
  }
};
const phoneBookService = {
  getAll, createPerson, updatePerson, deletePerson
}
export default phoneBookService