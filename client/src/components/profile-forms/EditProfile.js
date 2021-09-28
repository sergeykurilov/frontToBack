import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {createProfile, getCurrentUserProfile} from "../../actions/profile";
import PropTypes from "prop-types";
import {Link, withRouter} from "react-router-dom";

const EditProfile = ({createProfile, getCurrentUserProfile, profile: {profile, loading}, history}) => {
    const [formData, setFormData] = useState({
        "website": '',
        "company": '',
        "status": '',
        "skills": '',
        "location": '',
        "bio": '',
        "githubusername": '',
        "twitter": '',
        "facebook": '',
        "youtube": '',
        "instagram": '',
        "linkedin": ''
    })

    const onSubmit = (e) => {
        e.preventDefault();
        createProfile(formData, history, true)
    }

    useEffect(() => {
        getCurrentUserProfile()

        setFormData({
            company: loading || !profile.company ? '' : profile.company,
            website: loading || !profile.website ? '' : profile.website,
            location: loading || !profile.location ? '' : profile.location,
            status: loading || !profile.status ? '' : profile.status,
            skills: loading || !profile.skills ? '' : profile.skills,
            githubusername: loading || !profile.githubusername ? '' : profile.githubusername,
            bio: loading || !profile.bio ? '' : profile.bio,
            twitter: loading || !profile.twitter ? '' : profile.twitter,
            facebook: loading || !profile.facebook ? '' : profile.facebook,
            linkedin: loading || !profile.linkedin ? '' : profile.linkedin,
            youtube: loading || !profile.youtube ? '' : profile.youtube,
            instagram: loading || !profile.instagram ? '' : profile.instagram,
        })
    }, [loading])

    const {
        website,
        company,
        status,
        skills,
        location,
        githubusername,
        bio,
        twitter,
        facebook,
        youtube,
        instagram,
        linkedin
    } = formData

    const onChange = (e) => setFormData({...formData, [e.currentTarget.name]: e.currentTarget.value})

    const [displaySocialInputs, toggleSocialInputs] = useState(false)

    return (
        <>
            <h1 className="large text-primary">
                Edit Your Profile
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get some information to make your
                profile stand out
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <select name="status" value={status} onChange={e => onChange(e)}>
                        <option value="0">* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Student or Learning</option>
                        <option value="Instructor">Instructor or Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text"
                    >Give us an idea of where you are at in your career</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Company" name="company" value={company}
                           onChange={e => onChange(e)}/>
                    <small className="form-text"
                    >Could be your own company or one you work for</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Website" name="website" value={website}
                           onChange={e => onChange(e)}/>
                    <small className="form-text"
                    >Could be your own or a company website</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location}
                           onChange={e => onChange(e)}/>
                    <small className="form-text"
                    >City & state suggested (eg. Boston, MA)</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={e => onChange(e)}/>
                    <small className="form-text"
                    >Please use comma separated values (eg.
                        HTML,CSS,JavaScript,PHP)</small
                    >
                </div>
                <div className="form-group">
                    <input
                        value={githubusername} onChange={e => onChange(e)}
                        type="text"
                        placeholder="Github Username"
                        name="githubusername"
                    />
                    <small className="form-text"
                    >If you want your latest repos and a Github link, include your
                        username</small
                    >
                </div>
                <div className="form-group">
                    <textarea value={bio} onChange={e => onChange(e)} placeholder="A short bio of yourself"
                              name="bio"></textarea>
                    <small className="form-text">Tell us a little about yourself</small>
                </div>

                <div className="my-2">
                    <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button"
                            className="btn btn-light">
                        Add Social Network Links
                    </button>
                    <span>Optional</span>
                </div>
                {displaySocialInputs && <>
                    <div className="form-group social-input">
                        <i className="fab fa-twitter fa-2x"></i>
                        <input value={twitter} onChange={e => onChange(e)} type="text" placeholder="Twitter URL"
                               name="twitter"/>
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-facebook fa-2x"></i>
                        <input value={facebook} onChange={e => onChange(e)} type="text" placeholder="Facebook URL"
                               name="facebook"/>
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-youtube fa-2x"></i>
                        <input value={youtube} onChange={e => onChange(e)} type="text" placeholder="YouTube URL"
                               name="youtube"/>
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-linkedin fa-2x"></i>
                        <input value={linkedin} onChange={e => onChange(e)} type="text" placeholder="Linkedin URL"
                               name="linkedin"/>
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-instagram fa-2x"></i>
                        <input alue={instagram} onChange={e => onChange(e)} type="text" placeholder="Instagram URL"
                               name="instagram"/>
                    </div>
                </>}

                <input type="submit" className="btn btn-primary my-1"/>
                <Link className="btn btn-light my-1" to='/dashboard'>Go Back</Link>
            </form>
        </>
    );
};

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentUserProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,

})


export default connect(mapStateToProps, {createProfile, getCurrentUserProfile})
(withRouter((EditProfile)));