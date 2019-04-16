import {
    signUp,
    login,
    getUser
} from "../Controllers/UserController";

const auth = (app) => {

    app.post('/api/v1/auth/signUp', signUp);
    app.post('/api/v1/auth/login', login);
    app.get('/api/v1/auth/getUsers', getUser)

}

export default auth;