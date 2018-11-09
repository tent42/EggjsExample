'use strict'
const db = require('./../db')
module.exports = (app) => {
  const { INTEGER, STRING, TEXT, BOOLEAN } = app.Sequelize
  const Test = db.defineModel(
    app,
    'Test',
    {
      ownerId: STRING,
      // 文章ID
      id: {
        type: INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true
      },
      // 文章标题
      title: {
        type: STRING,
        allowNull: false,
        field: 'title'
      },
      // 文章简介
      introduction: {
        type: TEXT,
        allowNull: false,
        field: 'introduction'
      },
      // 文章作者
      author: {
        type: STRING,
        allowNull: false,
        field: 'author'
      },
      // 文章标签
      tag: {
        type: STRING,
        allowNull: false,
        field: 'tag'
      },
      // 文章内容
      content: {
        type: TEXT,
        allowNull: false,
        field: 'content'
      },
      // 文章分类
      category: {
        type: STRING,
        allowNull: false,
        field: 'category'
      },
      // 是否为推荐
      recommend: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      // 浏览次数
      browser: {
        type: INTEGER,
        allowNull: true,
        field: 'browser',
        defaultValue: 0
      }
    },
    {}
  )
  return Test
}
