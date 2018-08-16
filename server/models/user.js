const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true
        },
        allowNull: false,
        unique: true,
        required: true
      },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 6
      },
      required: true
    },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }}, {
      hooks: {
        beforeCreate: user => {
          user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
        }
      }
    }
  );
  
  User.associate = models => {
      User.hasMany(models.Todo, {
        foreignKey: 'userId',
        as: 'todos',
        onDelete: 'CASCADE'
      });
    };
  
    return User;
  };