export const signUpValidation = {
    firstName: 'required|min:4|alpha',
    lastName: 'required|min:4|alpha',
    email: 'email|required',
    password: 'required|min:6|max:20',
  };
  
  export const loginValidation = {
    email: 'email|required',
    password: 'required|min:6|max:20',
  };