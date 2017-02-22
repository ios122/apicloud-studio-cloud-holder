'use babel';

import ApicloudStudioCloud from '../lib/apicloud-studio-cloud';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('ApicloudStudioCloud', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('apicloud-studio-cloud');
  });

  describe('when the apicloud-studio-cloud:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.apicloud-studio-cloud')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'apicloud-studio-cloud:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.apicloud-studio-cloud')).toExist();

        let apicloudStudioCloudElement = workspaceElement.querySelector('.apicloud-studio-cloud');
        expect(apicloudStudioCloudElement).toExist();

        let apicloudStudioCloudPanel = atom.workspace.panelForItem(apicloudStudioCloudElement);
        expect(apicloudStudioCloudPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'apicloud-studio-cloud:toggle');
        expect(apicloudStudioCloudPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.apicloud-studio-cloud')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'apicloud-studio-cloud:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let apicloudStudioCloudElement = workspaceElement.querySelector('.apicloud-studio-cloud');
        expect(apicloudStudioCloudElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'apicloud-studio-cloud:toggle');
        expect(apicloudStudioCloudElement).not.toBeVisible();
      });
    });
  });
});
