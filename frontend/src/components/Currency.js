import CurrencyFormat from 'react-currency-format';

export default function Currency(props) {
  return (
  <CurrencyFormat 
    value={props.value}
    prefix="฿"
    displayType="text"
    thousandSeparator={true}
    decimalScale={2} />
  );
}