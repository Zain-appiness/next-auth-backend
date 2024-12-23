module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  User.associate = (models) => {
    // User has many Projects (as project manager)
    User.hasMany(models.Project, {
      foreignKey: 'projectManagerId',
      as: 'managedProjects',
    });

    // User has many DailyUpdates
    User.hasMany(models.DailyUpdate, {
      foreignKey: 'userId',
      as: 'dailyUpdates',
    });

    // User is part of many Projects as team member (many-to-many)
    User.belongsToMany(models.Project, {
      through: 'ProjectMembers',
      foreignKey: 'userId', 
      as: 'teamProjects',
    });
    

  };

  return User;
};
