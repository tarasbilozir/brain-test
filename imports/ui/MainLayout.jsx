import React from 'react';
import brain from 'brain';

import App from '/imports/ui/pages/App.jsx';

export default class MainLayout extends React.Component {

  render() {
    return (<div>
      <App dim={20} />
    </div>);
  }
}
