const router = require('express').Router();
let Task = require('../models/task.model');

router.route('/').get((req, res) => {
    Task.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const desc = req.body.desc;
  const date = req.body.date;
  const dueDate = req.body.dueDate;
  const priority = req.body.priority;
  const condition  = req.body.condition;

  const newExercise = new Task({
    desc,
    date,
    dueDate,
    priority,
    condition
  });
  newExercise.save()
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Task.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Task.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Task.findById(req.params.id)
    .then(exercise => {
      exercise.desc = req.body.desc;
      exercise.dueDate = req.body.dueDate;
      exercise.date = req.body.date;
      exercise.priority = req.body.priority;
      exercise.condition = req.body.condition;

      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;