//REST: API -> CRUD
// product schema
const Product = require("../model/productModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../utils/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
const { search } = require("../app");

//create Product -- admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  if (!product) {
    return next(new ErrorHandler("cannot create product", 500));
  }
  res.status(201).json({
    success: true,
    product,
  });
});

// get all products
exports.getAllProducts = catchAsyncError(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
  const products = await apiFeature.query;
  if (!products) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    products,
    productCount,
  });
});


exports.getFeaturedProducts = catchAsyncError(async (req, res) => {
  // const resultPerPage = 5;
  // const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(),req.query)
  // const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
  let products = await apiFeature.query;
  products = products.sort(() => 0.5 - Math.random()).slice(0, 3)
  
  if (!products) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    products,
  });
});

exports.getProductsCategory = catchAsyncError(async (req, res) => {
  // const resultPerPage = 5;
  // const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(),req.query)
  // const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
  let products = await apiFeature.query;
  
  
  if (!products) {
    return next(new ErrorHandler("Category not found", 404));
  }
  const allCategory = [];

  products.forEach((product) => {
    allCategory.push({ value: product.category, label: product.category });
  });
  let categories = Array.from(new Set(allCategory.map(JSON.stringify))).map(
    JSON.parse
  );
  res.status(200).json({
    success: true,
    categories,
    categoriesCount : categories.length
  });
});

// get product details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// get product details

// update product -- admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  await product.remove();
  return res.status(200).json({
    success: true,
    message: "product delete successfully",
  });
});

//create and update review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  let product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        (rev.rating = rating), (rev.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += Number(rev.rating);
  });
  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

//get all Reviews of a product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  return res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//delete Review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  //the review which we want not to delete
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );
  //change rating
  let avg = 0;
  reviews.forEach((rev) => {
    avg += Number(rev.rating);
  });
  const ratings = avg / reviews.length;
  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return res.status(200).json({
    success: true,
    reviews: reviews,
  });
});
