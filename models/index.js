const User = require("./User");
const Post = require("./Post");
const Vote = require("./Vote");


//Now we can define our model associations. Add the following statement to the file after the const definitions
//As we referenced earlier, a user can make many posts. Thanks to Sequelize, we can now use JavaScript to explicitly create this 
//relation. This association creates the reference for the id column in the User model to link to the corresponding foreign key 
//pair, which is the user_id in the Post model.

// create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
  });

  //We also need to make the reverse association In this statement, we are defining the relationship of the Post model to the User. 
  //The constraint we impose here is that a post can belong to one user, but not many users. Again, we declare the link to the 
  //foreign key, which is designated at user_id in the Post model.
  Post.belongsTo(User, {
    foreignKey: 'user_id',
  });

  User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
  });
  
  Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
  });

  Vote.belongsTo(User, {
    foreignKey: 'user_id'
  });
  
  Vote.belongsTo(Post, {
    foreignKey: 'post_id'
  });
  
  User.hasMany(Vote, {
    foreignKey: 'user_id'
  });
  
  Post.hasMany(Vote, {
    foreignKey: 'post_id'
  });

module.exports = { User, Post, Vote };