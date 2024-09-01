import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import axios from 'axios';
import OpenAI from 'openai';

const salt = 10;
const app = express();

app.use(cors({
    origin: 'https://news-ai-front.onrender.com',
    methods: ["POST", "GET"],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: false }));

const port = 8080;

const openai = new OpenAI({
    apiKey: `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`,
});

// MongoDB connection
mongoose.connect("mongodb+srv://lakshya9929:lakshya%401234@cluster0.z7zflsa.mongodb.net/?appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Define Mongoose schemas and models
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const UploadDetailSchema = new mongoose.Schema({
    filename: String,
    uid: mongoose.Schema.Types.ObjectId,
    fileurl: String,
});

const User = mongoose.model('User', UserSchema);
const UploadDetail = mongoose.model('UploadDetail', UploadDetailSchema);

// Middleware to verify user
const verifyuser = (req, res, next) => {
    const token = JSON.parse(req.query.token);
    if (!token) {
        return res.json({ Error: "You are not authenticated" });
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.json({ Error: "Token is not correct" });
            } else {
                req.name = decoded.name;
                next();
            }
        });
    }
};

app.get("/", verifyuser, (req, res) => {
    return res.json({ Status: "Success", name: req.name });
});

app.post('/register', (req, res) => {
    bcrypt.hash(req.body.password.toString(), salt, async (err, hash) => {
        if (err) return res.json({ Error: "Error hashing password" });
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash
        });
        try {
            await newUser.save();
            return res.json({ Status: "Success" });
        } catch (error) {
            return res.json({ Error: "Inserting data error in server" });
        }
    });
});

app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.json({ Error: "No email exists" });

        bcrypt.compare(req.body.password.toString(), user.password, (err, response) => {
            if (err) return res.json({ Error: "Password compare error" });
            if (response) {
                const name = user.name;
                const token = jwt.sign({ name }, "jwt-secret-key", { expiresIn: '1d' });
                res.cookie('token', token);
                const { password, ...other } = user.toObject();
                return res.json({ Status: "Success", Data: other, token });
            } else {
                return res.json({ Error: "Password not matched" });
            }
        });
    } catch (error) {
        return res.json({ Error: "Login error in server" });
    }
});

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" });
});

app.get('/description', async (req, res) => {
    const word = req.query.word;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    try {
        const response = await axios.get(url);
        const data = response.data;
        return res.json(data);
    } catch (error) {
        res.json(error);
    }
});

app.post('/filedetails', async (req, res) => {
    const { filename, fileurl, uid } = req.body;
    
    const newUpload = new UploadDetail({
        filename,
        uid:new mongoose.Types.ObjectId(uid),
        fileurl
    });

    try {
        await newUpload.save();
        return res.json({ Status: "Success" });
    } catch (error) {
        return res.json({ Status: "Error", Error: "Data inserting error" });
    }
});

app.get('/history', async (req, res) => {
    const id = req.query.id;
    try {
        const uploads = await UploadDetail.find({ uid: mongoose.Types.ObjectId(id) }).select('filename fileurl');
        return res.json({ Status: "Success", data: uploads });
    } catch (error) {
        return res.json({ Status: "Error", Error: "Unable to fetch history, please try again" });
    }
});

app.get('/summary', async (req, res) => {
    const text = req.body.params;
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: `${text} give the summary of the above paragraph` }],
            model: "gpt-3.5-turbo",
        });
        res.send({ summary: completion.choices[0].message });
    } catch (error) {
        res.json({ Error: "Error generating summary" });
    }
});

app.get('/search', async (req, res) => {
    const search = req.query.q;
    const url = `https://newsapi.org/v2/everything?q=${search}&apiKey=af96cd3905e346f08e7c37d50e88adfa`;
    try {
        const response = await axios.get(url);
        const data = response.data;
        return res.json(data);
    } catch (error) {
        res.json(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running at https://localhost:${port}`);
});
