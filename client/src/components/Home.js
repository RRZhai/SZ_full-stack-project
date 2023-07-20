import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

const Home = ({ handleSetRole, currentUser }) => {
  return (
    <div className="home">
      <Box>
        {currentUser ? (
          <Link
            to={"/jobs"}
            onClick={(e) => handleSetRole(e.target.name)}
            name="jobseeker"
          >
            Looking for job ...
          </Link>
        ) : (
          <Link
            to={"/login"}
            onClick={(e) => handleSetRole(e.target.name)}
            name="jobseeker"
          >
            Looking for job ...
          </Link>
        )}
      </Box>
      <Box>
        {currentUser ? (
          <Link
            to={"/newjob"}
            onClick={(e) => handleSetRole(e.target.name)}
            name="employee"
          >
            Looking for helper ...
          </Link>
        ) : (
          <Link
            to={"/login"}
            onClick={(e) => handleSetRole(e.target.name)}
            name="employee"
          >
            Looking for helper ...
          </Link>
        )}
      </Box>
    </div>
  );
};

export default Home;
