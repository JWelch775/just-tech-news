const router = require('express').Router();
const { Post, User } = require('../../models');

// get all users
router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
      // Query configuration
      //First, let's account for the other columns that we'll retrieve in this query and then account for the JOIN. 
      //These will be the id, post_url, title, and created_at columns. In the next step, we will configure the findAll 
      //method by customizing the attributes property
      attributes: ['id', 'post_url', 'title', 'created_at'],

      //sets the order in which posts are displayed
      order: [['created_at', 'DESC']],  
      
      //we'll include the JOIN to the User table. We do this by adding the property include, as shown in the following code Notice 
      //that the include property is expressed as an array of objects. To define this object, we need a reference to the model and 
      //attributes.
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
    //Now that the query is done, we need to create a Promise that captures the response from the database call.
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
        id: req.params.id
        },
        attributes: ['id', 'post_url', 'title', 'created_at'],
        include: [
        {
            model: User,
            attributes: ['username']
        }
        ]
    })
      .then(dbPostData => {
      if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
      }
      res.json(dbPostData);
      })
      .catch(err => {
      console.log(err);
      res.status(500).json(err);
      });
});

router.post('/', (req, res) => {
    // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
    Post.create({
      title: req.body.title,
      post_url: req.body.post_url,
      user_id: req.body.user_id
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.put('/:id', (req, res) => {
    Post.update(
      {
        title: req.body.title
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.delete('/:id', (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;