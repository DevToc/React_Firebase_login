/* eslint-disable */

import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { globalUtils, globalConstants } from '../../utils';
import _includes from 'lodash/includes';

function ScrollToTop({ history, clearNotification, getNotifications }) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
      try {
        document.getElementsByTagName("html")[0].style.overflow = "unset";
      } catch (err) {
        console.error(err);
      }
      if (globalUtils.getCurrentPage() === 'chat'){ // || globalUtils.getCurrentPage().includes("product")) {
        window.location.reload()
      }
      if (!_includes(globalConstants.notificationExclusion, globalUtils.getCurrentPage())) {
        clearNotification();
        if (globalUtils.isTokenAvailable()) {
          getNotifications();
        }
      }
    });
    return () => {
      unlisten();
    }
  }, [history]);

  return null;
}

export const ScrollToTopComponent = withRouter(ScrollToTop);