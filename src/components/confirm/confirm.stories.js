import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  text, boolean, select, button
} from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './notes.md';
import Confirm from './confirm.js';

const store = new Store({
  open: false
});
const handleCancel = () => {
  action('cancel')();
  store.set({ open: false });
};
const handleOpen = () => {
  action('open')();
  store.set({ open: true });
};

storiesOf('Confirm', module)
  .add('default', () => {
    button('open', handleOpen);
    const children = text('children', 'This is an example of a confirm.');
    const title = text('title', 'Are you sure?');
    const enableBackgroundUI = boolean('enableBackgroundUI', false);
    const disableEscKey = boolean('disableEscKey', false);
    const ariaRole = text('ariaRole', Confirm.defaultProps.ariaRole);
    const height = text('height', '');
    const subtitle = text('subtitle', '');
    const size = select('size', OptionsHelper.sizesFull, Confirm.defaultProps.size);
    const showCloseIcon = boolean('showCloseIcon', Confirm.defaultProps.showCloseIcon);
    const autoFocus = boolean('autoFocus', Confirm.defaultProps.autoFocus);
    const stickyFormFooter = boolean('stickyFormFooter', false);
    const confirmLabel = text('confirmLabel', '');
    const cancelLabel = text('cancelLabel', '');

    return (
      <State store={ store }>
        <Confirm
          title={ title }
          open={ store.get('open') }
          enableBackgroundUI={ enableBackgroundUI }
          disableEscKey={ disableEscKey }
          ariaRole={ ariaRole }
          height={ height }
          subtitle={ subtitle }
          size={ size }
          showCloseIcon={ showCloseIcon }
          autoFocus={ autoFocus }
          stickyFormFooter={ stickyFormFooter }
          confirmLabel={ confirmLabel }
          cancelLabel={ cancelLabel }
          onConfirm={ () => action('confirm')() }
          onCancel={ handleCancel }
        >
          { children }
        </Confirm>
      </State>
    );
  }, {
    notes: { markdown: notes }
  });
