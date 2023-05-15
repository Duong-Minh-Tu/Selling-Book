// Base url API
const BASE_URL = "http://192.168.1.176:45455/api/";

const BACKEND_API = {
  LOGIN: BASE_URL + "User/login",
  REGISTER: BASE_URL + "User/create",
  GET_ALL_PRODUCT: BASE_URL + "Book/find-book?",
  FIND_PRODUCT:  BASE_URL + "Book/find-book?",
  GET_INFO_USER: BASE_URL + "User/get-info-user",
  ADD_TO_CART: BASE_URL + "Cart/update-cart",
  GET_ALL_CART: BASE_URL + "Cart/find-cart-by-user",
  GET_PRODUCT_BY_ID: BASE_URL + "Book/find-book/{id}",
  DELETE_BOOK_FROM_CART: BASE_URL + "Cart/delete-item-cart?listIdBook={idBook}",
  CREATE_BILL: BASE_URL + "Bill/create-bill?",
  REVIEWS: BASE_URL + "Book/find-review-by-id-book?idBook={idBook}",
  UPDATE_USER: BASE_URL + "User/update-user",
  ADD_ADDRESS: BASE_URL + "User/create-address",
  GET_ALL_ADDRESS: BASE_URL + "User/get-address",
  UPDATE_ADDRESS: BASE_URL + "User/update-address",
  CHANGE_DEFAULT_ADDRESS: BASE_URL + "User/change-default-address?",
  FIND_ALL_DISCOUNT: BASE_URL + "Book/find-all-discount",
  LIKE_BOOK: BASE_URL + "Book/like",
  FIND_ALL_BILL: BASE_URL + "Bill/find-bill?Status={Status}",
  FIND_BOOK: BASE_URL + "Book/find-book",
  DELETE_USER: BASE_URL + "User/delete-user/{id}",
  CHANGE_PASSWORD: BASE_URL + "User/change-password-user/{id}?",
};

export default {
  BASE_URL,
  BACKEND_API,
};
