Lấy thông tin toàn bộ người dùng
Get("/admin/user", verifyJWT);

Tìm người dùng
Get("/admin/searchuser/:input", verifyJWT);
input: id / phone: number

Lấy danh mục
Get("/admin/category", verifyJWT)

Tạo danh mục mới
Post("/admin/category", verifyJWT);

Lấy toàn bộ sách
Get("/admin/book", verifyJWT);

Lấy chi tiết 1 quyển sách
Get("/admin/book/:id", verifyJWT);
id: number

Đổi dữ liệu 1 quyển sách
Put("/admin/book/:id", verifyJWT);
id: number

Thêm sách
Post("/admin/book", verifyJWT);

Tìm sách
Get("/admin/searchbook/:input");
input: id / name

Lấy toàn bộ hóa đơn
Get("/admin/order", verifyJWT);

Lấy chi tiết 1 hóa đơn
Get("/admin/order/:id", verifyJWT);

Lấy sản phẩm của 1 hóa đơn
Get("/admin/orderitem/:id", verifyJWT);

Lấy toàn bộ sản phẩm bán được
Get("/admin/orderitem", verifyJWT);

Tìm hóa đơn
Get("/admin/searchorder/:input", verifyJWT);
input: id / phone

Nhập kho
Post("/admin/import", verifyJWT);

Lấy thay đổi trong kho
Get("/admin/stock", verifyJWT);

Lấy thay đổi trong kho của sản phẩm cần tìm
Get("/admin/stock/:input", verifyJWT);
input: bookID

USER
CONTROLLER

Đăng kí
Post("/signup", loginController.signUp);

Check đăng nhập
Get("/login", loginController.checkLogin);

Đăng nhập
Post("/login", loginController.login);

Đăng xuất
Get("/logout", loginController.logout);

Lấy dữ liệu người dùng
Get("/user/:userID", verifyJWT, userController.getUserData);

Sửa dữ liệu người dùng
Put("/user/:userID", verifyJWT, userController.changeUserData);

Lấy sách
Get("/book", bookController.getAllBook);

Lấy chi tiết sách
Get("/book/:bookID", bookController.getOneBook);

Tìm sách
Get("/searchbook/:input", bookController.searchBook);

Lấy sách mới
Get("/newbook/:limit", bookController.getNewBook);

Lấy danh mục có sách
Get("/category", categoryController.getAllCategory);

Lấy sách trong danh mục
Get("/category/:categoryID", categoryController.getCategoryBook);

Thêm hóa đơn
Post("/order", orderController.addOrder);
