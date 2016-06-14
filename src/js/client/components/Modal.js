import React from 'react';

const getClasses = hidden => hidden ? 'modal modal--hidden' : 'modal';

export default ({ content, close, hidden, children }) => <div className={getClasses(hidden)}>
  <button className="modal__close" onClick={close}>fermer</button>
  {children}
</div>;
