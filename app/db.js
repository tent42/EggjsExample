'use strict'
const uuidv1 = require('uuid/v1')

function generateUUID() {
  return uuidv1().replace(/-/g, '')
}

function defineModel(app, name, attributes) {
  const { UUID, BIGINT } = app.Sequelize
  var attrs = {}
  for (let key in attributes) {
    let value = attributes[key]
    if (typeof value === 'object' && value['type']) {
      value.allowNull = value.allowNull || false
      attrs[key] = value
    } else {
      attrs[key] = {
        type: value,
        allowNull: false
      }
    }
  }
  attrs.id = {
    type: UUID,
    primaryKey: true
  }
  // attrs.createdAt = {
  //   type: BIGINT,
  //   allowNull: false
  // };
  // attrs.updatedAt = {
  //   type: BIGINT,
  //   allowNull: false
  // };
  attrs.version = {
    type: BIGINT,
    allowNull: false
  }
  return app.model.define(name, attrs, {
    hooks: {
      beforeValidate: function(obj) {
        let now = Date.now()
        if (obj.isNewRecord) {
          console.log('will create entity...')
          if (!obj.id) {
            obj.id = generateUUID()
          }
          // obj.createdAt = now;
          // obj.updatedAt = now;
          obj.version = 0
        } else {
          console.log('will update entity...')
          // obj.updatedAt = now;
          // obj.version++;   //这个version变化,没用,我真是.....
        }
      }
    }
  })
}

module.exports = { defineModel }
