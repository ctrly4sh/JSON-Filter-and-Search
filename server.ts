import express , {Request, Response} from "express";
import router from "./src/routes/authRoute"

const app = express();

const PORT : number = 3000;

app.use(express.json());

app.get('/' , (req : Request , res : Response) => {
    res.send("Typescript + node")
});

app.get('/all' , router)
app.post('/register' , router)
app.post("/login" , router)

app.listen(PORT , () => {
    console.log(`Server started at localhost:${PORT}`)
})