import express from 'express';
import dotenv from 'dotenv'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import { verifyToken } from "./auth"
import axios from "axios"
import cors from "cors"


dotenv.config();
const StaticUsers = [
    {
        user_id: 1,
        email: "pravesh@gmail.com",
        password: "qwerty"
    },
    {
        user_id: 2,
        email: "david@gmail.com",
        password: "qwerty123"
    },
    {
        user_id: 3,
        email: "ethan@gmail.com",
        password: "qwerty12345"
    }
]

const app = express();
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());


const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '';
const SALT_ROUNDS = process.env.SALT_ROUNDS || '0';


app.get('/', (req, res) => {
    res.send('started');
})

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        for (var i = 0; i < StaticUsers.length; i++) {

            if (StaticUsers[i].email == email) {
                const current_email = StaticUsers[i].email;
                const current_userid = StaticUsers[i].user_id;
                const user_password = StaticUsers[i].password;
                //hashing static user password to compare
                bcrypt.hash(user_password, parseInt(SALT_ROUNDS)).then((hash) => {
                    //checking password hash to authenticate user
                    bcrypt.compare(password, hash).then((result) => {
                        if (result) {
                            //signing jwt token with user details
                            const token = jwt.sign(
                                {
                                    user_id: current_userid,
                                    email: current_email,
                                },
                                JWT_SECRET_KEY || "",
                                {
                                    expiresIn: "2h"
                                }
                            )
                            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

                            res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

                            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

                            res.setHeader('Access-Control-Allow-Credentials', 'true');

                            return res.cookie("jwt_access_token", token, {
                                httpOnly: true,
                                secure: true
                            }).status(200).json(token)
                        }
                        return res.status(400).send("Invalid Credentials");
                    });
                });
            }
        }

    } catch (err) {
        console.log(err)
    }
})

const omdb_api = process.env.OMDB_API
const omdb_api_key = process.env.OMDB_API_KEY
const omdb_poster_api = process.env.OMDB_Poster_API

app.get('/api/search', verifyToken, async (req, res) => {
    const access_token = req.headers.authorization as string || '';
    const title: string = req.query.title as string || '';
    if (!access_token) {
        return res.status(403).send("A must login to preform search");
    }
    const search_url = `${omdb_api}?apikey=${omdb_api_key}&s=${title}`
    console.log(search_url)
    // const search_url = `${omdb_api}?s=${title}&apikey=${omdb_api_key}&`
    const response = await axios.get(search_url)
    if (response.data) {
        return res.json(response.data).status(200)
    }
    res.send("movie not found").status(404)

})

app.listen(process.env.PORT || 3000, () => {
    console.log(`The application is listening on port ${process.env.PORT}`);
})

