'use strict'
const db = require('../db')
module.exports = (app) => {
  const { INTEGER, STRING } = app.Sequelize
  const User = db.defineModel(
    app,
    'User',
    {
      username: {
        type: STRING(18),
        unique: true,
        allowNull: false
      },
      email: {
        type: STRING(50),
        unique: true,
        validate: {
          isEmail: true
        },
        allowNull: false
      },
      password: {
        type: STRING(100),
        allowNull: false
      },
      phone: {
        type: STRING(30),
        allowNull: true
      }
    },
    {}
  )
  return User
}
// const uuidv1 = require("uuid/v1");
// module.exports = app => {
//   const { INTEGER, STRING, UUID, BIGINT } = app.Sequelize;
//   const User = app.model.define(
//     "User",
//     {
//       id: {
//         type: UUID,
//         primaryKey: true
//       },
//       createdAt: {
//         type: BIGINT,
//         allowNull: false
//       },
//       updatedAt: {
//         type: BIGINT,
//         allowNull: false
//       },
//       version: {
//         type: BIGINT,
//         allowNull: false
//       },
//       username: {
//         type: STRING(100),
//         unique: true,
//         allowNull: false
//       },
//       email: {
//         type: STRING(100),
//         primaryKey: true,
//         validate: {
//           isEmail: true
//         },
//         allowNull: false
//       },
//       password: {
//         type: STRING(100),
//         allowNull: false
//       },
//       phone: {
//         type: STRING(25),
//         allowNull: true
//       }
//     },
//     {
//       hooks: {
//         beforeValidate: function(obj) {
//           let now = Date.now();
//           if (obj.isNewRecord) {
//             console.log("will create entity..." + obj);
//             if (!obj.id) {
//               obj.id = uuidv1().replace(/-/g, "");
//             }
//             obj.createdAt = now;
//             obj.updatedAt = now;
//             obj.version = 0;
//           } else {
//             console.log("will update entity...");
//             obj.updatedAt = now;
//             obj.version++;
//           }
//         }
//       }
//     }
//   );
//   return User;
// };
