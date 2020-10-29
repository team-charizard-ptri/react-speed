const authReducer = (prevState, action) => {
  console.log('In reducer');
  console.log('action', action);
  switch (action.type) {
    case 'IS_USER_SIGNED_IN':
      return {
        ...prevState,
        user: action.userFirebase,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignout: false,
        user: action.userFirebase,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignout: true,
        user: null,
      };
  }
};

export default authReducer;
