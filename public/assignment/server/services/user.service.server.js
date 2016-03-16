module.exports = function(app, userModel) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user?username=:username", findUserByUsername);
    app.get("/api/assignment/user?username=:username&password=:password", findUserByCredentials);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    function createUser(req, res) {
        var newUser = req.body;
        var user = userModel.createUser(newUser);
        res.json(user);
    }

    function findAllUsers(req, res) {
        var users = userModel.findAllUsers();
        res.json(users);
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        var user = userModel.findUserById(userId);
        res.json(user);
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        var user = userModel.findUserByUsername(username);
        res.json(user);
    }

    function findUserByCredentials(req, res) {
        var credentials = {
            username: req.query.username,
            password: req.query.password
        }
        var user = userModel.findUserByCredentials(credentials);
        res.json(user);
    }

    function updateUser(req, res) {
        var userId = req.params.id;
        var user = req.body;
        var updatedUser = userModel.updateUser(userId,user);
        res.json(updatedUser);
    }

    function deleteUser(req, res) {
        var userId = req.params.id;
        var users = userModel.deleteUser(userId);
        res.json(users);
    }
}