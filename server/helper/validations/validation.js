export const signUpValidation = {
    firstName: 'required|min:4',
    lastName: 'required|min:4',
    email: 'email|required',
    password: 'required|min:6|max:20',
  };
  
  export const loginValidation = {
    email: 'email|required',
    password: 'required|min:6|max:20',
  };