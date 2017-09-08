const postsSortFunctions = (sortMode) => {
  switch (sortMode) {
    case 'voteScore' :
      return (a, b) => (
        b.value - a.value
      )
    case 'timestamp' :
      return (a, b) => (
        b.value - a.value
      )
    default :
      return (a, b) => (
        b.value - a.value
      )
  }
}

export {
  postsSortFunctions
}
