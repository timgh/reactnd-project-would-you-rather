const logger = (store) => (next) => (action) => {
  if (action.type.includes('loading-bar')) {
    return next(action)
  }
  console.group('action.type: ' + action.type)
  console.log('The action:', action)
  const returnValue = next(action)
  console.log('The new state:', store.getState())
  console.groupEnd()
  return returnValue
}

export default logger