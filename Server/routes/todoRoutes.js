const router = require('express').Router();
const authMiddleware = require('../middlewares/jwtToken');
const todoModel = require('../models/totdo')

router.post('/api/item', authMiddleware, async (req, res) => {
  try {
      const newItem = new todoModel({
          item: req.body.item,
          user: req.user._id,
      });
      const saveItem = await newItem.save();
      res.status(200).json(saveItem);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

router.get('/api/item', authMiddleware, async (req, res) => {
  try {
      const user = req.user._id; 
      const allTodos = await todoModel.find({ user: req.user._id }); 
      res.status(200).json(allTodos);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

router.put('/api/item/:id', authMiddleware, async (req, res) => {
  try {
      const user = req.user._id; 
      const todoId = req.params.id;

      const todo = await todoModel.findOne({ _id: todoId, user: user });

      if (!todo) {
          return res.status(403).json({ error: 'Unauthorized' });
      }

      todo.item = req.body.item;
      await todo.save();
      
      res.status(200).json('Item Updated');
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

router.delete('/api/item/:id', async (req, res) => {
  try {
      const deleteItem = await todoModel.findByIdAndDelete(req.params.id);
      res.status(200),json('Item Deleted');
  } catch(err) {
      res.json(err);
  }
})




module.exports = router;