import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  host: "localhost",
  user: "postgres",
  password: "123456",
  database: "permalist",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];

const getAllItems = async () => {
  const result = await db.query("SELECT * from items ORDER BY id ASC");
  return result.rows;
};

const addItem = async (item) => {
  const result = await db.query("INSERT INTO items (title) VALUES ($1)", [
    item,
  ]);
  return !!result.rows.length;
};

const deleteItem = async (itemID) =>
  await db.query("DELETE FROM items where id = $1", [itemID]);

const updateItem = async (itemID, title) =>
  await db.query("UPDATE items SET title = $2 WHERE id = $1", [itemID, title]);

app.get("/", async (req, res) => {
  try {
    items = await getAllItems();
    res.render("index.ejs", {
      listTitle: "Today",
      listItems: items,
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/add", async (req, res) => {
  try {
    const item = req.body.newItem;
    await addItem(item);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  try {
    const { updatedItemId, updatedItemTitle } = req.body;
    await updateItem(updatedItemId, updatedItemTitle);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  try {
    const { deleteItemId } = req.body;
    await deleteItem(deleteItemId);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
