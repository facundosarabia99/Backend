import Category from "../models/category.model.js";
const date = new Date();

export function createCategory(req, res) {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Must enter category",
    });
  }
  const category = new Category(body);
  if (!category) {
    return res.status(400).json({ success: false, error: "Missing fields" });
  }
  category
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: category._id,
        message: "Category created",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Error, category not created",
      });
    });
}
export async function listarCategories(req, res) {
  await Category.find({})
    .then((categories) => {
      if (!categories.length) {
        return res
          .status(404)
          .json({ success: false, error: "No categories found" });
      }
      return res.status(200).json(categories);
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
}
export async function listarCategoryById(req, res) {
  await Category.findOne({ _id: req.params.id })
    .then((category) => {
      if (!req.params.id) {
        return res.status(404).json({
          success: false,
          error: "Must enter category",
        });
      }
      return res.status(200).json(category);
    })
    .catch((err) => {
      return res.json({
        success: false,
        error: err,
        descripcion: `Couldn't find category ID ${req.params.id}`,
      });
    });
}
export async function updateCategory(req, res) {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Enter category to update",
    });
  }
  if (!body.role) {
    return res.json({
      success: false,
      error: "-1",
      descripcion: "Route /upload, method PUT not authorised",
    });
  }
  Category.findOne({ _id: req.params.id }).then((category) => {
    (category.timestamp = body.timestamp),
      (category.title = body.title),
      (category.description = body.description),
      category
        .save()
        .then(() => {
          return res.status(200).json({
            success: true,
            id: category._id,
            message: "Category updated",
          });
        })
        .catch((error) => {
          return res.status(404).json({
            error,
            message: "Error found in category updated",
          });
        });
  });
}
export async function deleteCategory(req, res) {
  const body = req.body;
  await Category.findOneAndDelete({ _id: req.params.id })
    .then((category) => {
      if (!body) {
        return res.status(400).json({
          success: false,
          error: "Must enter category to create",
        });
      }
      if (!body.role) {
        return res.json({
          success: false,
          error: "-1",
          descripcion: "Route /delete, method DELETE not authorised",
        });
      }
      return res.json({
        success: true,
        message: `Category ID ${req.params.id} deleted`,
      });
    })
    .catch((err) => {
      return res.json({
        success: false,
        error: "-2",
        descripcion: `Category ID ${req.params.id} not found`,
      });
    });
}
