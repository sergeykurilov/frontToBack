import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {deleteAccount, getCurrentUserProfile} from "../../actions/profile";
import Spinner from "../layout/Spinner";
import {Link} from "react-router-dom";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = ({getCurrentUserProfile, auth: {user}, profile: {profile, loading}, deleteAccount}) => {
    useEffect(() => {
        getCurrentUserProfile()
    }, [getCurrentUserProfile])
    console.log(profile, loading)
    return loading && profile === null
        ? <Spinner/>
        : <>
            <h1 className='large text-primary'>Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user"> {' '}
                    Welcome {user && user.name}
                </i>
            </p>
            {profile !== null ? <>
                <DashboardActions/>
                <Experience experience={profile.experience}/>
                <Education education={profile.education}/>

                <div className="my-2">
                    <button onClick={() => deleteAccount()} className='btn btn-danger'>
                        <i className="fas fa-user-minus"></i>{' '}
                        Delete My Account
                    </button>
                </div>
            </> : <>
                <p>You have not yet setup a profile, please add some info</p>
                <Link to='/create-profile' className='btn btn-primary my-1'>
                    Create Profile
                </Link>
            </>}
        </>
}

Dashboard.propTypes = {
    getCurrentUserProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
    deleteAccount: PropTypes.func.isRequired,
})


export default connect(mapStateToProps, {getCurrentUserProfile, deleteAccount})(Dashboard);