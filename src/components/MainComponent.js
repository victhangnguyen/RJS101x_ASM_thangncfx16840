import React from 'react';
import { Outlet } from 'react-router-dom';
//! imp Components
import Header from '../components/HeaderComponent';
import Footer from '../components/FooterComponent';

export class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Outlet />
        <Footer />
      </React.Fragment>
    );
  }
}

export default Main;
