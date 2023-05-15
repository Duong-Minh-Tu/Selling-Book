import { Alert } from "react-native";
import Api from "../Api";
import axios from "axios";
import { convertParamUrl } from "../utils/constants";
import { async } from "q";

const AuthRequest = axios.create({
  baseURL: Api.BASE_URL,
});

export const getAllBook = async () => {
  const { data } = await axios.get(Api.BACKEND_API.GET_ALL_PRODUCT, {
    headers: {
      Authorization: window.token,
    },
    params: {
      pageSize: 10,
      pageIndex: 1,
      keyword: "",
    },
  });
  return data;
};

export const getAllSearchBook = async (text) => {
  console.log('!!! api find book: ', Api.BACKEND_API.GET_ALL_PRODUCT.replace("{FiterPrice}", text));
  let url_ = Api.BACKEND_API.GET_ALL_PRODUCT;
  if (isNumeric(text)) {
    url_ += convertParamUrl("FiterPrice", text);
    url_ += convertParamUrl("TotalSell", text);
    url_ += convertParamUrl("NewBook", text);
  }
  url_ += convertParamUrl("keyword", text);
  const { data } = await axios.get(url_, {
    headers: {
      Authorization: window.token,
    },
    params: {
      pageSize: 10,
      pageIndex: 1,
      keyword: "",
    },
  });
  return data;
};

export const getCart = async () => {
  const { data } = await axios.get(Api.BACKEND_API.GET_ALL_CART,
    {
      headers: {
        Authorization: window.token
      },
    })
  return data
}

export const getBookById = async (id) => {
  const { data } = await axios.get(
    Api.BACKEND_API.GET_PRODUCT_BY_ID.replace("{id}", id),
    {
      headers: {
        Authorization: window.token,
      },
    }
  );
  return data;
};

export const getListReviewById = async (id) => {
  const { data } = await axios.get(
    Api.BACKEND_API.REVIEWS.replace("{idBook}", id),
    {
      headers: {
        Authorization: window.token,
      },
    }
  );
  return data;
};

export const getAllDiscount = async () => {
  const { data } = await axios.get(Api.BACKEND_API.FIND_ALL_DISCOUNT, {
    headers: {
      Authorization: window.token,
    },
  });
  return data;
};

export const addToCart = async (bookData) => {
  try {
    let response = AuthRequest.put(Api.BACKEND_API.ADD_TO_CART, bookData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: window.token,
      },
    });
    Alert.alert("Thông báo", "Đã thêm vào giỏ hàng");
    return response;
  } catch (error) {
    console.log("!!! Error Cart: ", error);
    return error;
  }
};

export const deleteBookFromCart = async (idBook) => {
  try {
    let response = AuthRequest.delete(
      Api.BACKEND_API.DELETE_BOOK_FROM_CART.replace("{idBook}", idBook),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: window.token,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("!!! error deleteBookFromCart: ", error);
    return error;
  }
};

export const CreateBill = async (billData) => {
  console.log("!!! billdata: ", billData);
  let url_ = Api.BACKEND_API.CREATE_BILL;
  url_ += convertParamUrl("payment", billData.payment);
  url_ += convertParamUrl("delivery", billData.delivery);
  console.log("!!! url: ", url_);
  try {
    let response = AuthRequest.post(url_, billData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: window.token,
      },
    });
    return response;
  } catch (error) {
    console.log("!!! error CreateBill: ", error);
    return error;
  }
};

export const FindDiscount = async (code) => {
  try {
    let response = AuthRequest.get(Api.BACKEND_API.FIND_DISCOUNT, {
      headers: {
        Authorization: window.token,
      },
    });
    return response;
  } catch {
    console.log("!!! error: ", error);
    return error;
  }
};

export const FindAllBill = async (status) => {
  console.log('!!! api find all bill: ', Api.BACKEND_API.FIND_ALL_BILL.replace("{Status}", status));
  try {
    let response = AuthRequest.get(
      Api.BACKEND_API.FIND_ALL_BILL.replace("{Status}", status),
      {
        headers: {
          Authorization: window.token,
        },
      }
    );
    console.log('!!! result: ', response);
    return response;
  } catch {
    console.log("!!! error: ", error);
    return error;
  }
};
