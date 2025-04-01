export const handleApiError = (error: any) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    console.error('API Error Response:', error.response.data);
    return error.response.data.message || 'An error occurred';
  } else if (error.request) {
    // The request was made but no response was received
    console.error('API Error Request:', error.request);
    return 'Network error - please check your connection';
  } else {
    // Something happened in setting up the request
    console.error('API Error:', error.message);
    return 'An unexpected error occurred';
  }
};
