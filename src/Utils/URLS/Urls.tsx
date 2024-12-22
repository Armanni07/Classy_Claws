const admin = {
  post: "/admin/login",
  logout: "/admin/logout",
  get_user: "/admin/get/users",
  get_employee: "/admin/get/employee",
  //   put: "/admin/update:id",
  //   delete: "/admin/delete:id",
};

const cart = {
  post: "/cart/post",
  get: "/cart/get",
  put: "/cart/update:id",
  delete: "/cart/delete:id",
};

const mail = {
  send: "/mail/post",
  get: "/mail/get",
  delete: "/mail/delete:id",
};

const sales = {
  post: "/sales/post",
  get: "/sales/get",
  delivery: "/sales/get/delivery",
  active: "/sales/get/active",
  active_user: "/sales/get/active/user",
  top: "/sales/get/top",
  put: "/sales/put",
  admin: "/sales/admin/put",
  delete: "/sales/delete:id",
};

const users = {
  get: "/users/get",
  login: "/users/login",
  put: "/users/update:id",
  logout: "/users/logout",
  token: "/users/get/token",
  delete: "/users/delete:id",
  register: "/users/register",
};

const products = {
  post: "/products/post",
  get: "/products/get",
  put: "/products/put",
  search: "/products/search",
  delete: "/products/delete:id",
};

const employees = {
  login: "/employees/login",
  logout: "/employees/logout",
  put: "/employees/update:id",
  delete: "/employees/delete:id",
  register: "/employees/register",
};

const categories = {
  post: "/categories/post",
  get: "/categories/get",
  put: "/categories/update:id",
  delete: "/categories/delete:id",
};

const damagedItems = {
  post: "/damaged-items/post",
  get: "/damaged-items/get",
  put: "/damaged-items/update:id",
  delete: "/damaged-items/delete:id",
};

export const www = {
  cart,
  mail,
  admin,
  sales,
  users,
  products,
  employees,
  categories,
  damagedItems,
};
