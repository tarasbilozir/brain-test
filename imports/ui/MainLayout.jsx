import React from 'react';

import App from '/imports/ui/pages/App.jsx';

export default class MainLayout extends React.Component {

  render() {
    return (<div>
      <App dim={100} netInputDim={20} />
    </div>);
  }
}
