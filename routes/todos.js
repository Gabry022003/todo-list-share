const router = require('express').Router();
const Todo = require('../models/Todo');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.get('/', auth, async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json(todos);
});

router.post('/', auth, async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    createdBy: req.user.username
  });
  await todo.save();
  res.status(201).json(todo);
});

router.delete('/:id', auth, role('admin'), async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Cancellato' });
});

module.exports = router;
