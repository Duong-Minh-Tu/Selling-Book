import { Alert } from "react-native";
import Api from "../Api";
import axios from "axios";
import { convertParamUrl } from "../utils/constants";

const AuthRequest = axios.create({
  baseURL: Api.BASE_URL,
});

export const getInfoUser = async () => {
    const { data } = await axios.get(Api.BACKEND_API.GET_INFO_USER,
      {
        headers: {
          Authorization: window.token
        },
      })
    return data
}

export const updateUser = async (user) => {
  console.log('!!! ', user);
  let url_ = Api.BACKEND_API.UPDATE_USER;
  try {
    let response = AuthRequest.put(
        url_, 
        user,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: window.token
        },
      },			  
    );
    Alert.alert("Thông báo", "Cập nhật thông tin thành công");
    return response;
    } catch (error) {
      console.log("!!! Error updateUser: ", error);
      return error;
    }
}

export const addAddress = async (userId, address) => {
  console.log('!!! userId: ', userId);
  console.log('!!! address: ', address);
  try {
    let requestBody = {
      name: address?.name,
      phone: address?.phone,
      detailAddress: address?.detailAddress,
    }
    let registerResponse = await AuthRequest.post(
      Api.BACKEND_API.ADD_ADDRESS,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: window.token
        },
      },
    );
    return registerResponse;
  } catch (error) {
    console.log("!!! Error: ", error);
    return error;
  }
}

export const getAllAddress = async () => {
  console.log('test address');
  const { data } = await axios.get(Api.BACKEND_API.GET_ALL_ADDRESS,
    {
      headers: {
        Authorization: window.token
      },
    })
  return data
}

export const updateAddress = async (dataUpdate) => {
  console.log('!!! ', dataUpdate);
  try {
    let response = AuthRequest.put(
      Api.BACKEND_API.UPDATE_ADDRESS, 
      dataUpdate,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: window.token
        },
      },			  
    );
    Alert.alert("Thông báo", "Cập nhật thông tin thành công");
    return response;
    } catch (error) {
      console.log("!!! Error updateUser: ", error);
      return error;
    }
}

export const changeDefaultAddress = (res) => {
  let url_ = Api.BACKEND_API.CHANGE_DEFAULT_ADDRESS
  url_ += convertParamUrl('idAddressNew', res.idNew);
  url_ += convertParamUrl('idAddressOld', res.idOld);
  console.log("!!! url: ", url_);
  try {
    let response = AuthRequest.put(
      url_, 
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: window.token
        },
      },			  
    );
    Alert.alert("Thông báo", "Thay đổi địa chỉ thành công");
    return response;
    } catch (error) {
      console.log("!!! Error updateUser: ", error);
      return error;
    }
}

export const deleteUser = async (id) => {
  try {
    let response = AuthRequest.delete(
      Api.BACKEND_API.DELETE_USER.replace("{id}", id), 
      {
        headers: {
            "Content-Type": "application/json",
            Authorization: window.token
        },
      }
    );
    return response;
  } catch (error) {
    console.log("!!! error deleteUser: ", error);
    return error;
  }
}

export const changePasswordUser = async (dataUpdate) => {
  try {
    let url_ = Api.BACKEND_API.CHANGE_PASSWORD.replace("{id}", window.id);
    url_ += convertParamUrl('password', dataUpdate.oldPassword);
    url_ += convertParamUrl('newPassword', dataUpdate.newPassword);
    console.log("!!! url: ", url_);

    let response = AuthRequest.put(
      url_, 
      dataUpdate,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: window.token
        },
      },			  
    );
    return response;
    } catch (error) {
      console.log("!!! Error updateUser: ", error);
      return error;
    }
}