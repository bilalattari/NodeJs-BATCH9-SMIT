const app = require("express");
const router = app.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModal = require("../Model/user");

// Get All Users
router.get("/", async (req, res) => {
  const users = await UserModal.find();
  res.status(200).send({
    status: 200,
    users,
  });
});

// Get Single User
router.get("/:id", async (req, res) => {
  const user = await UserModal.findById(req.params.id);
  if (!user) {
    res.status(500).send({ status: 500, error: true, msg: "user not found" });
  }
  if (user) {
    res.status(200).send({ status: 200, user });
  }
});

router.get("/findByEmail", async (req, res) => {
  const user = await UserModal.find({ email: req.query.email });
  if (!user) {
    res.status(500).send({ status: 500, error: true, msg: "user not found" });
  }
  if (user) {
    res.status(200).send({ status: 200, user });
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  try {

    const saltRounds = 10
    const salt = await bcrypt.genSaltSync(saltRounds);
    const hash = await bcrypt.hashSync(req.body.password, salt);

    req.body.password = hash

    const user = await UserModal.create({ ...req.body });
    user.password = undefined
    res.status(200).send({ status: 200, user });
  } catch (err) {
    res
      .status(500)
      .send({ status: 500, error: err, msg: "internal sever error" });
  }
  // users.push({ name: req.body.name, id: users.length + 1 })
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await UserModal.findOne({ email: email });
    if (user) {
      const isPasswordValid = bcrypt.compareSync(password, user.password)
      if (isPasswordValid) {
        user.password = undefined
        
        // generate token
        const token = jwt.sign({
          data: user,
        }, 'stiuqtdsauitdsauytvduastvyuasityduiastdiuastduiq')
        console.log(token)


        res.status(200).send({
          status: 200,
          token,
          error: false, msg: "User is login", user
        });
      } else {
        res
          .status(401)
          .send({ status: 401, error: true, msg: "Password is not valid" });
      }
    } else {
      return res
        .status(401)
        .send({ status: 401, error: true, msg: "This email doesn't Exist" });
    }
  } catch (err) {
    res
      .status(500)
      .send({ status: 500, error: err, msg: "internal sever error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await UserModal.findByIdAndDelete(req.params.id);
    res.status(200).send({ status: 200, msg: "User deleted" });
  } catch (err) {
    res
      .status(500)
      .send({ status: 500, error: err, msg: "internal sever error" });
  }
  // users.splice(req.params.id - 1, 1)
  // res.status(200).send({ status: 200, users })
});

router.put("/:id", async (req, res) => {
  try {
    const user = await UserModal.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      { new: true }
    );
    if (!user) {
      res.status(401).send({ status: 401, msg: "User Not Found" });
    } else {
      res.status(200).send({ status: 200, user, msg: "User Updated" });
    }
  } catch (err) {
    res
      .status(500)
      .send({ status: 500, error: err, msg: "internal sever error" });
  }
});

module.exports = router;