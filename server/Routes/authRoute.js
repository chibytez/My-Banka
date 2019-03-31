import { signUp } from '../Controllers/userController';

const auth = (app) => {

    app.post('/auth/signUp', signUp);

}

export default auth;