import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  SortAlphabetically = 'Sort alphabetically',
  SortByLength = 'Sort by length',
}

interface SortedParams {
  sortField: SortType | undefined;
  isReversed: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortField, isReversed }: SortedParams,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.SortAlphabetically:
          return good1.localeCompare(good2);

        case SortType.SortByLength:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType | undefined>(undefined);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const resetSorting = () => {
    setSortField(undefined);
    setIsReversed(false);
  };

  const hasResetButton = !!sortField || !!isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortType.SortAlphabetically)}
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.SortAlphabetically,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SortType.SortByLength)}
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.SortByLength,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(!isReversed)}
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {hasResetButton && (
          <button
            type="button"
            onClick={resetSorting}
            className="button is-danger"
          >
            Reset
          </button>
        )}
      </div>

      <ul className="GoodList">
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
