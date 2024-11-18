import * as mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/auth').then(()=>console.log("Mongo db connected"))

const authModelSchema = new mongoose.Schema({
    name : {type : String , required : true},
    email : {type : String , required : true , unique : true},
    authentication : {
        password : { type : String , required : true },
        sessionToken : {type : String , select : false},
    },
    role : {type : String , required : true},
},{timestamps : true})

export const authModel = mongoose.model('auth' , authModelSchema);



/* 
//action methods 

//GET 
export const getUsers = () =>  authModel.find();
export const getUserByEmail = (email : string) => authModel.findOne({ email });
export const getUserBySessionToken = (session : string) => authModel.findOne({ 'authenticaton.sessionToken' : session });
export const getUserById = (id : string) => authModel.findById({ id });

//POST

export const Register = (values : Record<string , any>) => new authModel(values).save().then((newUser) => newUser.toObject()); 

*/


