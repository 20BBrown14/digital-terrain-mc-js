import React from 'react';
import ApplyView from '../../../../src/components/pages/apply/ApplyView';

describe('ApplyView', () => {
  it('Renders a default view', () => {
    const view = render(
      <ApplyView
        isLoading={false}
        handleFormSubmit={() => {}}
        failedSubmission={false}
        successfulSubmission={false}
        handleSourceOptionChange={() => {}}
        handleSourceTextChange={() => {}}
      />
    );
    expect(view).toMatchSnapshot();
  });

  describe('expected components', () => {
    let view;
    beforeEach(() => {
      view = shallow(
        <ApplyView
          isLoading={false}
          handleFormSubmit={() => {}}
          failedSubmission={false}
          successfulSubmission={false}
          handleSourceOptionChange={() => {}}
          handleSourceTextChange={() => {}}
        />
      );
    });

    it('has a title', () => {
      expect(view.find('.apply-page-title')).toHaveLength(1);
    });

    it('has form items', () => {
      expect(view.find('FormItem')).toHaveLength(9);
    });

    it('has inputs', () => {
      expect(view.find('Input')).toHaveLength(3);
    });

    it('has text areas', () => {
      expect(view.find('TextArea')).toHaveLength(4);
    });

    it('has a select', () => {
      expect(view.find('Select')).toHaveLength(1);
    });

    it('has a button', () => {
      expect(view.find('Button')).toHaveLength(1);
    });
  });
});
