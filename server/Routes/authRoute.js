import UserController from "../Controllers/UserController.1";

const auth = (app) => {

    app.post('/auth/signUp', UserController.signUp);
    app.post('/auth/login', UserController.login);
    app.get('/auth/getUsers',UserController.getUser)

}

export default auth;