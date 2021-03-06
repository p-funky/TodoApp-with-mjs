module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define('Todo', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    });
  
    Todo.associate = models => {
      Todo.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
    };
  
    return Todo;
  };
