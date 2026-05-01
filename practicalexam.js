const express = require("express");
const app = express();
app.use(express.json());

let users = [];
let port = 3000;
app.use(function(req, res, next) {
    console.log("Request received");
    console.log(req.method + " " + req.url);
    next();
});
app.get("/", function(req, res) {
    res.json({
        message: "Server Running"
    });
});
app.get("/users", function(req, res) {
    res.json({
        message: "All Users",
        data: users
    });
});
app.post("/users", function(req, res) {

    let name = req.body.name;
    let email = req.body.email;

    if (!name || !email) {
        res.json({
            message: "Name and Email required"
        });
        return;
    }

    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email) {
            res.json({
                message: "Email already exists"
            });
            return;
        }
    }

    let user = {
        id: users.length + 1,
        name: name,
        email: email
    };

    users.push(user);

    res.json({
        message: "User Added",
        data: user
    });
});
app.get("/users/:id", function(req, res) {

    let id = req.params.id;

    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            res.json({
                message: "User Found",
                data: users[i]
            });
            return;
        }
    }

    res.json({
        message: "User not found"
    });
});
app.delete("/users/:id", function(req, res) {

    let id = req.params.id;

    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            users.splice(i, 1);

            res.json({
                message: "User Deleted"
            });
            return;
        }
    }

    res.json({
        message: "User not found"
    });
});
app.listen(port, function() {
    console.log("Server running on port 3000");
});