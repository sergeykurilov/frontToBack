import spinner from './spinner.gif'
import React, {Fragment} from "react";

const Spinner = () => {
    return <Fragment>
        <img
            src={spinner}
            style={{width: '50px', margin: 'auto', display: 'block'}}
            alt="Loading..."
        />
    </Fragment>
}

export default Spinner