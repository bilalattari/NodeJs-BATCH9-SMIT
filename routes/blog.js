const app = require("express");
const router = app.Router();
const BlogModal = require("../Model/blog");
const authenticateJwt = require('../helpers/authenticateJwt')
// Get All Blogs
router.get("/", authenticateJwt , async (req, res) => {
  const blogs = await BlogModal.find().populate('user').exec();
  res.status(200).send({
    status: 200,
    blogs,
  });
});

// Get Single Blog
router.get("/:id", async (req, res) => {
  const blog = await BlogModal.findById(req.params.id).populate('user').exec();
  if (!blog) {
    res.status(500).send({ status: 500, error: true, msg: "blog not found" });
  }
  if (blog) {
    res.status(200).send({ status: 200, blog });
  }
});

router.get("/findByUser", async (req, res) => {
  const user = await BlogModal.find({ userId: req.query.userId }).populate('user').exec();
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
    const blog = await BlogModal.create({ ...req.body });
    res.status(200).send({ status: 200, blog });
  } catch (err) {
    res
      .status(500)
      .send({ status: 500, error: err, msg: "internal sever error" });
  }
  // users.push({ name: req.body.name, id: users.length + 1 })
});

router.delete("/:id", async (req, res) => {
  try {
    await BlogModal.findByIdAndDelete(req.params.id);
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
    const blog = await BlogModal.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      { new: true }
    );
    if (!blog) {
      res.status(401).send({ status: 401, msg: "blog Not Found" });
    } else {
      res.status(200).send({ status: 200, blog, msg: "blog Updated" });
    }
  } catch (err) {
    res
      .status(500)
      .send({ status: 500, error: err, msg: "internal sever error" });
  }
});

module.exports = router; 