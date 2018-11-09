'use strict'
module.exports = (app) => {
  const { INTEGER, STRING, BIGINT, UUID1, UUID } = app.Sequelize
  const DataHeader = app.model.define(
    'DataHeader',
    {
      // https://segmentfault.com/a/1190000014952764
      //   userid: {
      //     type: UUID,
      //     primaryKey: true,
      //     defaultValue: UUID1
      //     // defaultValue: function() {
      //     //     return uuidv1().replace(/-/g, "");
      //     // }
      //   },
      //   createdAt: {
      //     type: BIGINT,
      //     allowNull: false
      //   },
      //   updatedAt: {
      //     type: BIGINT,
      //     allowNull: false
      //   },
      //   version: {
      //     type: BIGINT,
      //     allowNull: false
      //   },
      email: {
        type: STRING(100),
        primaryKey: true,
        validate: {
          isEmail: true
        },
        allowNull: false
      },
      password: {
        type: STRING(100),
        allowNull: false
      },
      username: {
        type: STRING(100),
        unique: true,
        allowNull: false
      },
      phone: {
        type: INTEGER,
        allowNull: true
      }
    },
    {
      // 如果为 true 则表的名称和 model 相同，即 user
      // 为 false MySQL创建的表名称会是复数 users
      // 如果指定的表名称本就是复数形式则不变
      // 即false为不同名
      // 即true为同名
      //   freezeTableName: true,
      //   timestamps: false,
      //   hooks: {
      //     beforeValidate: function(obj) {
      //       let now = Date.now();
      //       if (obj.isNewRecord) {
      //         console.log("will create entity..." + obj);
      //         if (!obj.id) {
      //           obj.id = generateId();
      //         }
      //         obj.createdAt = now;
      //         obj.updatedAt = now;
      //         obj.version = 0;
      //       } else {
      //         console.log("will update entity...");
      //         obj.updatedAt = now;
      //         obj.version++;
      //       }
      //     }
      //   }
    }
  )
  return DataHeader
}
