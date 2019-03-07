import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';
import Pager from './pager';
import notes from './notes.md';
import OptionsHelper from '../../utils/helpers/options-helper/options-helper';
import '../../style/storybook-info-details.scss';

const store = new Store({
  currentPage: '1'
});

const handlePagination = (ev) => {
  store.set({ currentPage: ev });
};

const TableComponent = ({ propDefinitions }) => {
  const props = propDefinitions.map(
    ({ property, propType, required, description, defaultValue }) => {

      const adjustedDefaultValue = (
        property === 'pageSizeSelectionOptions'
      ) ? '10, 25, 50' : defaultValue;

      return (
        <tr key={property}>
          <td>{property}</td>
          <td>{propType.name}</td>
          <td>{required ? 'yes' : '-'}</td>
          <td style={{color: 'rgb(34, 34, 170)'}}>
            {adjustedDefaultValue ? adjustedDefaultValue : '-'}
          </td>
          <td>{description}</td>
        </tr>
      );
    }
  );

  return (
    <table>
      <thead>
        <tr style={{textAlign: 'left'}}>
          <th>property</th>
          <th>propType</th>
          <th>required</th>
          <th>default</th>
          <th>description</th>
        </tr>
      </thead>
      <tbody>{props}</tbody>
    </table>
  );
};

storiesOf('Pager', module)
  .addParameters({
    info: {
      propTablesExclude: [State]
    }
  })
  .add('default', () => {
    const totalRecords = text('totalRecords', '100');
    const pageSize = select('pageSize', OptionsHelper.pageSizes, Pager.defaultProps.pageSize);
    const showPageSizeSelection = boolean('showPageSizeSelection', Pager.defaultProps.showPageSizeSelection);

    return (
      <State store={ store }>
        <Pager
          currentPage={ store.get('currentPage') }
          pageSize={ pageSize }
          showPageSizeSelection={ showPageSizeSelection }
          totalRecords={ totalRecords }
          onPagination={ handlePagination }
        />
      </State>
    );
  }, {
    info: {
      TableComponent,
      text:
        <div className='storybook-info'>
          <p>A Pager widget.</p>
          <h1>Implementation</h1>
          <p>In your file</p>
          <code className='storybook-code'>
            import Pager from 'carbon-react/lib/components/pager';
          </code>
          <p>To render a Pager:</p>
          <code className='storybook-code'>
            {`<Pager currentPage='1' totalRecords='100' onPagination={ function(){} } />`}
          </code>
        </div>
    },
    notes: { markdown: notes }
  });
