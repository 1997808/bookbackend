Get("/user", verifyJWT, userDataController.getAllUser);

Get("/searchuser/:input", verifyJWT, userDataController.searchUser);

Get("/category", verifyJWT, categoryDataController.getAllCategory)

Post("/category", verifyJWT, categoryDataController.addCategory);

Get("/book", verifyJWT, bookDataController.getAllBook);

Get("/book/:id", verifyJWT, bookDataController.getBookData);

Put("/book/:id", verifyJWT, bookDataController.changeBookData);

Post("/book", verifyJWT, bookDataController.addBook);

Get("/searchbook/:input", bookDataController.searchBook);

Get("/order", verifyJWT, orderDataController.getAllOrder);

Get("/order/:id", verifyJWT, orderDataController.getOneOrder);

Get("/orderitem/:id", verifyJWT, orderDataController.getOneOrderItem);

Get("/orderitem", verifyJWT, orderDataController.getAllOrderItem);

Get("/searchorder/:input", verifyJWT, orderDataController.searchOrder);

Post("/import", verifyJWT, bookDataController.importBookStock);

Get("/stock", verifyJWT, bookDataController.getBookStock);

Get("/stock/:input", verifyJWT, bookDataController.searchBookStock);

Post("/signup", loginController.signUp);

Get("/login", loginController.checkLogin);

Post("/login", loginController.login);

Get("/logout", loginController.logout);

Get("/user/:userID", verifyJWT, userController.getUserData);

Put("/user/:userID", verifyJWT, userController.changeUserData);

Get("/book", bookController.getAllBook);

Get("/book/:bookID", bookController.getOneBook);

Get("/searchbook/:input", bookController.searchBook);

Get("/newbook/:limit", bookController.getNewBook);

Get("/category", categoryController.getAllCategory);

Get("/category/:categoryID", categoryController.getCategoryBook);

Post("/order", orderController.addOrder);
