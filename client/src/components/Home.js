import { Link } from "react-router-dom";
import Box from '@mui/material/Box';

const Home = ({handleSetRole}) => {

    return(
        <div className='home'>
            <Box>
                <Link to={'/jobs'} onClick={(e) => handleSetRole(e.target.name)} name='jobseeker'>
                    Looking for job ...
                </Link>
            </Box>
            <Box>
                <Link to={'/jobs'} onClick={(e) => handleSetRole(e.target.name)} name='employee'>
                    Looking for helper ...
                </Link>
            </Box>
        </div>
    )
}

export default Home;