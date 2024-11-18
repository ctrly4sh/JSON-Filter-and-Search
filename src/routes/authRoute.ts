import * as express  from "express";
import * as controllers from "../controllers/authControllers";

const 
router = express.Router();

router.post("/register" , controllers.register)
router.post('/login' , controllers.login)

export default router;
