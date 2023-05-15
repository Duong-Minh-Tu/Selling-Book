const colors = {
  main: "#E7E25B",
  mainText: "#000000",
  text: "#000000",
};
const currencyFormat = (num) => {
  return (
    Number(num)
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "1,") + " đ"
  );
};

const discountFormat = (num) => {
  return Number(num).toFixed(0).replace(/(\d)/g, "-1") + " %";
};
export default { colors, currencyFormat, discountFormat };
