const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//处理post 请求参数
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//开放静态资源
app.use(express.static("public"));
// 导入数据库
require("./model/connect");
const { Books, validateBook } = require("./model/books")
app.get("/", (req, res) => {
    res.send("1223");
});
app.get("/books", async(req, res) => {
    let books = await Books.find();
    res.send(books);
});
app.post("/books", async(req, res) => {
    let { error } = validateBook(req.body);
    if (error) return res.status(400).send({ "message": error.message });
    let name = await Books.findOne({ name: req.body.name });
    if (name) return res.status(400).send({ "message": "添加失败，该图书已经存在，请重新输入" });
    let num = await Books.findOne({ num: req.body.num });
    if (num) return res.status(400).send({ "message": "添加失败，该编号也已经存在，请重新输入" });
    let book = new Books(req.body);
    await book.save();
    res.send(book)

});
app.put("/books/:num", async(req, res) => {
    let num = req.params.num;
    // let { error } = validateBook(req.body);
    // if (error) return res.status(400).send({ "message": error.message });
    let name = await Books.findOne({ name: req.body.name });
    if (name) return res.status(400).send({ "message": "修改失败该图书已存在" });
    // let num = await Books.findOne({ num: req.body.num });
    // if (num) return res.status(400).send({ "message": "该编号也已经存在，请重新输入" });
    let book = await Books.findOneAndUpdate({ num: num }, req.body, { new: true });
    res.send(book);

});
app.delete("/books/:num", async(req, res) => {
    let num = +req.params.num;
    let book = await Books.findOneAndDelete({ num: num });
    res.send(book);
})
app.listen("3000", () => console.log("running...."));