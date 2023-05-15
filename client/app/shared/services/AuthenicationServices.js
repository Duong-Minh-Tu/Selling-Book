import Api from "../Api";
import axios from "axios";

const AuthRequest = axios.create({
  baseURL: Api.BASE_URL,
});

const register = async user => {
    if (!user.username || !user.email || !user.password || !user.cfpassword) {
        return {status: false, message: "Thông tin đăng kí phải nhập đầy đủ"};
    }
    else if (user.password !== user.cfpassword) {
        return {status: false, message: "Mật khẩu nhập lại không trùng khớp!"};
    }
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const isValid = reg.test(user.email);
    if(!isValid){
      return {status: false, message: "Email không hợp lệ!"};
    }
    if(user.username.length < 6){
      return {status: false, message: "Tên tài khoản phải tối thiểu 6 kí tự!"};
    }
    if(user.password.length < 6){
      return {status: false, message: "Mật khẩu phải tối thiểu 6 kí tự!"};
    }
    try {
      let requestBody = {
      username: user.username,
      email: user.email,
      password: user.password
      }
      let registerResponse = await AuthRequest.post(
        Api.BACKEND_API.REGISTER,
        requestBody,
      );
      return registerResponse;
    } catch (error) {
      console.log(error.message);
      return {status: false, message: 'Oops! Something went wrong'};
    }
}

const login = async user => {
  if (!user?.username || !user?.password) {
    return {status: false, message: 'Vui lòng nhập đủ thông tin'};
  }
  try {
    console.log('vao day');
    let requestBody = {
      username: user?.username,
      password: user?.password,
    };
    let loginResponse = await AuthRequest.post(
      Api.BACKEND_API.LOGIN,
      requestBody,
    );
    return loginResponse;
  } catch (error) {
    console.log('error: ', error);
    return {status: false, message: 'Oops! Something went wrong'};
  }
};

export default {register, login};
