import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

let posts = [];
let postId = 0;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    posts,
  });
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.get("/update/:id", (req, res) => {
  const temp = posts.filter((post) => post.id === +req.params.id)[0];
  console.log("________________");
  console.log(temp);
  console.log(posts);
  console.log(+req.params.id);
  res.render("create.ejs", {
    title: temp.title,
    description: temp.description,
  });
});

app.post("/create", (req, res) => {
  const { title, description } = req.body;
  postId += 1;
  posts.push({ title, description, id: postId });
  res.redirect("/");
});

app.post("/posts/:id", (req, res) => {
  posts = posts.filter((post) => post.id !== +req.params.id);
  res.redirect("/");
});

app.post("/posts/update/:id", (req, res) => {
  posts = posts.filter((post) => post.id !== +req.params.id);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
