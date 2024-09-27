let posts = [
  {
    id: 1,
    title: "Post One",
  },
  {
    id: 2,
    title: "Post Two",
  },
  {
    id: 3,
    title: "Post Three",
  },
  {
    id: 4,
    title: "Post Four",
  },
];

// @desc Get all posts
// @route GET /api/posts
const getPosts = (req, res) => {
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  res.status(200).json(posts);
};

// @desc Get single posts
// @route GET /api/posts/:id

const getPost = (req, res, next) => {
  ////console.log(req.params.id);
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`A post With the id ${id} was not found`);
    error.status = 404;
    return next(error);
  }
  res.status(200).json(post);
};

// @desc Create a post
// @route POST /api/posts
const createPost = (req, res, next) => {
  console.log(req.body);
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };

  if (!newPost.title) {
    const error = new Error(`Please Include a title`);
    error.status = 404;
    return next(error);
  }

  posts.push(newPost);
  res.status(201).json(posts);
};

// @desc Update post
// @route PUT /api/posts/:id
const updatePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (!id) {
    return res.status(400).json({ msg: "Id is Required" });
  }
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`A post With the id ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  if (!req.body.title) {
    const error = new Error(`Please Include a title`);
    error.status = 404;
    return next(error);
  }

  post.title = req.body.title;
  res.status(200).json(posts);
};

// @desc Delete post
// @route DELETE /api/posts/:id

const deletePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`A post With the id ${id} was not found`);
    error.status = 404;
    return next(error);
  }
  posts = posts.filter((post) => post.id !== id);
  res.status(200).json(posts);
};

export { getPost, getPosts, createPost, updatePost, deletePost };
