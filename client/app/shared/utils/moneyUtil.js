/** func format thêm dấu . phân cách các đơn vị */
export function formatNumberWithDot(num) {
  if (num) {
    // const money = Math.round(Number(num))
    return `${num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} VND`
  }
  return '0 VND'
}

export function formatNumberDot(num) {
  if (num) {
    // const money = Math.round(Number(num))
    return `${num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} VND`
  }
  return '0 VND'
}
