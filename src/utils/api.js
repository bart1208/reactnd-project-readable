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
export const addPost = (postData) => (
  fetch(`${api}/posts`,{
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  }).then(res => res.json())
)
export const editPost = (postData) => (
  fetch(`${api}/posts/${postData.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  }).then(res => res.json())
)
export const deletePost = (postId) => (
  fetch(`${api}/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      ...headers
    }
  }).then(res => res)
)
export const getCommentById = (commentId) => (
  fetch(`${api}/comments/${commentId}`, { headers })
    .then(res => res.json())
    .then(data => data)
)
export const addComment = (commentData) => (
  fetch(`${api}/comments`,{
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commentData)
  }).then(res => res.json())
)
export const deleteComment = (commentId) => (
  fetch(`${api}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      ...headers
    }
  }).then(res => res)
)
export const editComment = (commentData) => (
  fetch(`${api}/comments/${commentData.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commentData)
  }).then(res => res.json())
)
