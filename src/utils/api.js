const api = "http://localhost:5001";

// Generate a unique token
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getCategories = () => (
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)
)
export const getPosts = () => (
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)
)
export const getPostsByCategory = (category) => (
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)
)
export const getPostById = (postId) => (
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(data => data)
)
export const getCommentsByPostId = (postId) => (
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)
)
