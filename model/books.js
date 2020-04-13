const mongoose = require("mongoose");
const Joi = require("joi");
const bookSchema = new mongoose.Schema({
    //唯一
    num: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    // 修改时间
    updateAt: {
        type: Date,
        default: Date.now
    },
});
// 时间更新
bookSchema.pre('findOneAndUpdate', function(next) {
    this.findOneAndUpdate({}, { updateAt: Date.now() })
    next();
});
const Books = mongoose.model("Books", bookSchema);
// const book = new Books({
//     name: "三国演义",
// });
// book.save();
const validateBook = (book) => {
    let schema = {
        num: Joi.number().required().error(new Error("请传入序号")),
        name: Joi.string().required().error(new Error("请传入图书名称")),
    };
    // 验证
    return Joi.validate(book, schema, {
        // 检测到所有错误
        abortEarly: false,
        // 允许对象包含被忽略的未知键
        allowUnknown: true
    });
}
module.exports = {
    Books,
    validateBook
}