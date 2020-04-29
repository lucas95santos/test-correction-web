import React, { useState } from 'react';
// redux
import { connect } from 'react-redux';
// components
import { DashboardTop } from '../../components';
// styles
import './Dashboard.css';

// images


function Dashboard(props) {
  const { profile } = props;
  const [profileDropdown, setProfileDropDown] = useState(false);
  const [notificationDropdown, setNotificationDropDown] = useState(false);

  function handleClickOut() {
    if (profileDropdown) {
      setProfileDropDown(false);
    }

    if (notificationDropdown) {
      setNotificationDropDown(false);
    }
  }

  return (
    <div className="dashboard" onClick={() => handleClickOut()}>
      <DashboardTop
        profileName={profile.name}
        profileDropdownOpen={profileDropdown}
        profileDropdownOnclose={setProfileDropDown}
        notificationDropdownOpen={notificationDropdown}
        notificationDropdownOnClose={setNotificationDropDown}
        notificationAmount={0}
      />

      <div className="dashboard__content"></div>
    </div>
  );
}

const mapStateToProps = state => ({
  profile: state.user.profile
});

export default connect(mapStateToProps, null)(Dashboard);
