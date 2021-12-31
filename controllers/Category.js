let Category = require("../models/Category");

exports.getCategories = async (req, res, next) => {
  try {
    const Categories = await Category.find();

    res.status(200).json({ success: true, data: Categories });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getCategory = async (req, res, next) => {
  try {
    // ban than req.params.id da la mot object nen khong can {id: req.params.id}
    //^^^^ tranh dat trung ten bien Category
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res
        .status(400)
        .json({ success: true, error: `no category with ${req.params.id}` });
    }
    res.status(200).json({ success: true, data: category });
  } catch (err) {
    next(err);
    // res.status(400).json({ success: false, error: err.message });
  }
};

exports.createCategories = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    res.status(200).json({ success: true, data: category });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // tra ve data sau khi update (tuc la bien category thay doi ngay sau khi update chu databases da thay doi roi)
      runValidators: true,
      context: "query",
    });
    if (!category) {
      res.status(400).json({
        success: false,
        error: `No category with that id of ${req.params.id}`,
      });
    }
    res.status(200).json({ success: true, data: category }); // tra ve data sau khi update
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      res.status(400).json({
        success: false,
        error: `No category with that id of ${req.params.id}`,
      });
    }

    await category.remove();

    res.status(200).json({ success: true, data: category });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
