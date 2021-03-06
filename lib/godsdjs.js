'use babel';

import GodsDjsView from './godsdjs-view';
import { CompositeDisposable } from 'atom';

export default {

  godsdjsView: null,
  subscriptions: null,

  activate(state) {
    this.godsdjsView = new GodsDjsView(state.godsdjsViewState);

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'godsdjs:toggle': () => this.toggle()
    }));
  },

  consumeStatusBar(statusBar) {
	this.icon = statusBar.addRightTile({
		item: this.godsdjsView.getElement(),
		priority: -1
	});
  },

  deactivate() {
	this.icon.destroy();
	this.icon = null;
	this.subscriptions.dispose();
    this.godsdjsView.destroy();
  },

  serialize() {
    return {
      godsdjsViewState: this.godsdjsView.serialize()
    };
  },

  toggle() {
	this.godsdjsView.toggle();
  }

};
