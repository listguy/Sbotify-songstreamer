"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [6, 20],
            msg: "username must be 6-20 characters long!",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            msg: "Invalid email adress",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [8, 1024],
            msg: "password too short, should have at least 8 characters",
          },
        },
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        field: "is_admin",
      },
      rememberMe: {
        type: DataTypes.BOOLEAN,
        field: "remember_me",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
