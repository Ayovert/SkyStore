import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CURRENCIES } from '../../api/queries';
import { Currency } from '../../model/Product';
import { ReactComponent as ArrowIcon } from '../../../images/arrowR.svg';
import './header.scss';
import './currencyDropdown.scss';
import { getCurrency } from '../../util/util';
import { CurrencyProps } from './headerState';



const CurrencyDropdown = ({ setCurrency } : CurrencyProps) => {
  const [currencyNum, setCurrencyNum] = useState(getCurrency());
  const { loading, error, data } = useQuery(GET_CURRENCIES, {
    variables: {},
  });

  const setCurrencyCookie = (index: number) => {
    document.cookie = `currency=${index}`;
  };

  if (error) {
    console.error('Error:', error);
    return <h1>Error...</h1>;
  }
  

  if (loading || !data) return <h1>Loading...</h1>;

  const currencyData = data.currencies as Currency[];

  return (
    <div className="currencyDiv">
      <button type="button" className="currencyButton">
        <span>{currencyData[getCurrency()].symbol}</span>
        <span className="currencyArrow">
          <ArrowIcon height={12} width={12} />
        </span>
      </button>

      <div className="currencyList">
        <ul>
          {currencyData.map(({ symbol, label }, index) => {
            return (
              <li
                key={label}
                className="currencyListItem"
                style={{
                  backgroundColor: `${
                    getCurrency() === index ? '#cfcfcf' : ''
                  }`,
                }}
                onClick={() => {
                  setCurrencyNum(index);
                  setCurrencyCookie(index);
                  setCurrency();
                }}
              >
                <span>{symbol} </span>
                <span> {label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CurrencyDropdown;
