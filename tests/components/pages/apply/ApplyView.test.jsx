import React from 'react';
import ApplyView from '../../../../src/components/pages/apply/ApplyView';

describe('ApplyView', () => {
  it('Renders a default view', () => {
    const view = render(<ApplyView />);
    expect(view).toMatchSnapshot();
  });
});
