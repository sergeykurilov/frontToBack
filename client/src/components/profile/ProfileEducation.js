import React from 'react';
import PropTypes from 'prop-types';
import Moment from "react-moment";

const ProfileEdication = ({
                              education: {
                                  school,
                                  degree,
                                  fieldofstudy,
                                  location,
                                  current,
                                  to,
                                  from,
                                  description
                              }
                          }) => {
    return (
        <div>
            <h3 className='text-dark'>{school}</h3>
            <p>
                <Moment format='YYY/MM/DD'>{from}</Moment> - {!to ? ' Now' : <Moment format='YYY/MM/DD'>{to}</Moment>}
            </p>
            <p>
                <strong>Degree:</strong> {degree}
            </p>
            <p>
                <strong>Field of study:</strong> {fieldofstudy}
            </p>
            <p>
                <strong>Description:</strong> {description}
            </p>
        </div>
    );
};

ProfileEdication.propTypes = {
    education: PropTypes.array.isRequired,
};

export default ProfileEdication;