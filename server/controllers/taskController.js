import Task from "../models/TaskModel.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, due_date } = req.body;
    const newTask = new Task({
      userId: req.user._id,
      title,
      description,
      due_date,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.per_page) || 10;

    const totalTasks = await Task.countDocuments({ userId: req.user._id });
    const tasks = await Task.find({ userId: req.user._id })
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.json({
      tasks,
      page,
      per_page: perPage,
      total_pages: Math.ceil(totalTasks / perPage),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["completed", "pending"].includes(status))
      return res.status(400).json({ message: "Invalid status" });

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTaskList = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.per_page) || 4;

  try {
    const tasks = await Task.find({ userId: req.user.userId })
      .skip((page - 1) * perPage)
      .limit(perPage);

    const totalTasks = await Task.countDocuments({ userId: req.user.userId });

    res.status(200).json({
      tasks,
      total: totalTasks,
      currentPage: page,
      perPage,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

export const getTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    // Check if task exists
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error fetching task details" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Find the task by ID and update it
    const task = await Task.findByIdAndUpdate(id, updatedData, { new: true });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    return res.status(500).json({ message: "Error updating task", error });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the task by ID and delete it
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting task", error });
  }
};
