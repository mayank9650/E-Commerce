export const BASE_URL = 'https://fakestoreapi.com/products'

// Reusable API function
const apiRequest = async (endpoint, method = 'GET', body = null, headers = {}) => {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error.message);
    throw error; 
  }
};

export const getRequest = (endpoint, headers = {}) => apiRequest(endpoint, 'GET', null, headers);
export const postRequest = (endpoint, body, headers = {}) => apiRequest(endpoint, 'POST', body, headers);
