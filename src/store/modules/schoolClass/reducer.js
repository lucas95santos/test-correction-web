import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: false
};

export default function schoolClass(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@schoolClass/LIST_ALL_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@schoolClass/LIST_ALL_SUCCESS': {
        draft.data = action.payload.data;
        draft.loading = false;
        break;
      }
      default:
    }
  });
}