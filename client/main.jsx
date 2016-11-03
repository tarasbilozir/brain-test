import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';

import MainLayout from '/imports/ui/MainLayout.jsx';

Meteor.startup(() => {
  render(<MainLayout />, document.getElementById('react-root'));
});
