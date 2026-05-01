const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let dataList = [];

app.use((req, res, next) => {
    const currentTime = new Date().toString();
    console.log(`Request at ${currentTime}`);
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get("/", (req, res) => {
    res.json({ message: "Server Running" });
});

app.get("/users", (req, res) => {
    res.json({ message: "Users retrieved", data: dataList });
});

app.get("/users/:id", (req, res) => {
    const userId = req.params.id;

    const foundUser = dataList.find(item => item.id === userId);

    if (!foundUser) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User exists", data: foundUser });
});

app.post("/users", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: "Name and Email required" });
    }

    const emailCheck = dataList.find(item => item.email === email);

    if (emailCheck) {
        return res.status(400).json({ message: "Email already exists" });
    }

    const newEntry = {
        id: Date.now().toString(),
        name,
        email
    };

    dataList.push(newEntry);

    res.status(201).json({ message: "User Added", data: newEntry });
});

app.delete("/users/:id", (req, res) => {
    const userId = req.params.id;

    const foundIndex = dataList.findIndex(item => item.id === userId);

    if (foundIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    dataList.splice(foundIndex, 1);

    res.json({ message: "User Deleted" });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields required" });
    }

    const adminEmail = "admin@gmail.com";
    const adminPassword = "1234";

    if (email === adminEmail && password === adminPassword) {
        return res.json({ message: "Login Success" });
    }

    res.status(401).json({ message: "Invalid Credentials" });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});