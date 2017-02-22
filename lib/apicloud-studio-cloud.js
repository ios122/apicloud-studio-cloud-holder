'use babel';

import ApicloudStudioCloudView from './apicloud-studio-cloud-view';
import { CompositeDisposable } from 'atom';

export default {

  apicloudStudioCloudView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.apicloudStudioCloudView = new ApicloudStudioCloudView(state.apicloudStudioCloudViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.apicloudStudioCloudView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'apicloud-studio-cloud:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.apicloudStudioCloudView.destroy();
  },

  serialize() {
    return {
      apicloudStudioCloudViewState: this.apicloudStudioCloudView.serialize()
    };
  },

  toggle() {
    console.log('ApicloudStudioCloud was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
