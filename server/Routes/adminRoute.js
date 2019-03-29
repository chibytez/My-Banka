import {
    activateDeactivateAccount
    } from '../Controllers/adminController';


const adminRoute = (app) => {
    app.patch('/api/v1/account/:id',activateDeactivateAccount)
}

export default adminRoute;