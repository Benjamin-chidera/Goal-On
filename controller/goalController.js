const GOAL = require("../model/goal");

const Create = async (req, res) => {
  const { title, description } = req.body;
  try {
    if (!title || !description) {
      res.status(400).json({ msg: "Please fill all fields" });
    }

    const goal = await GOAL.create(req.body);
    res.status(201).json({ msg: "success", goal });
  } catch (error) {
    res.status(400).json({ ErrMsg: error.message });
  }
};

const GetAll = async (req, res) => {
  const { title, type } = req.query;

  const queryObject = {};

  if (title) {
    queryObject.title = { $regex: title, $options: "i" };
  }

  if (type) {
    queryObject.type = { $regex: type, $options: "i" };
  }

  try {
    const goal = await GOAL.find(queryObject).sort("-createdAt");
    res.status(200).json({ msg: "success", NumOfGoals: goal.length, goal });
  } catch (error) {
    res.status(400).json({ ErrMsg: error.message });
  }
};
const GetASingle = async (req, res) => {
  const { goalId } = req.params;

  try {
    const goal = await GOAL.findById({ _id: goalId });
    res.status(200).json({ msg: "success", goal });
  } catch (error) {
    res.status(400).json({ ErrMsg: error.message });
  }
};

const Update = async (req, res) => {
  const { goalId } = req.params;
  const { body } = req;

  try {
    const goal = await GOAL.findByIdAndUpdate({ _id: goalId }, body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ msg: "Updated Successfully", goal });
  } catch (error) {
    res.status(400).json({ ErrMsg: error.message });
  }
};

const Delete = async (req, res) => {
  const { goalId } = req.params;

  try {
    const goal = await GOAL.findByIdAndDelete({ _id: goalId });
    res.status(200).json({ msg: "Deleted Successfully", goal });
  } catch (error) {
    res.status(400).json({ ErrMsg: error.message });
  }
};

module.exports = { Create, GetAll, GetASingle, Update, Delete };
