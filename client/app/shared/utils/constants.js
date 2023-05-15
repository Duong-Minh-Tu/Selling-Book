export function convertParamUrl(name, value) {
    return name + "=" + encodeURIComponent("" + value) + "&";
}

export const CHO_XAC_NHAN = 1;
export const CHO_LAY_HANG = 2;
export const DANG_GIAO = 3;
export const DANH_GIA = 4;

const listStatus = [
    {
        name: 'Chờ xác nhận',
        code: 1
    },
    {
        name: 'Chờ lấy hàng',
        code: 2
    },
    {
        name: 'Đang giao',
        code: 3
    },
    {
        name: 'Đánh giá',
        code: 4
    }
]

export function getNameStatus(code){
    let type = listStatus.find(type => type.code == code);
    if (type) return type.name;
    return '';
}

export function isNumeric(num){
    return !isNaN(num)
  }