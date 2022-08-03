import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
//! imp Components
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { motion } from 'framer-motion';

const AnimationLayoutComponent = function (props) {
  const { pathname } = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0.01,
      // width: 0,
    },
    in: {
      opacity: 1,
      // width: '100%',
    },
    out: {
      opacity: 0,
      // x: window.innerWidth,
    },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'linear',
    duration: 0.5,
  };

  return (
    <React.Fragment>
      <Header />
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Outlet />
      </motion.div>
      <Footer />
    </React.Fragment>
  );
};

export default AnimationLayoutComponent;
