export function listAllRequest(token) {
  return {
    type: '@schoolClass/LIST_ALL_REQUEST',
    payload: { token }
  };
}

export function listAllSuccess(data) {
  return {
    type: '@schoolClass/LIST_ALL_SUCCESS',
    payload: { data }
  };
}