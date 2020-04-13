const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://admin:123456@localhost/lms_books", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("数据库连接成功"))
    .catch(() => console.log("数据库连接失败"));