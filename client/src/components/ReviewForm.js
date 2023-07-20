import * as React from "react";
import { Rating, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";

const labels: { [index: string]: string } = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function ReviewForm({ currentUser, userRole }) {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);

  return (
    <div>
      <Box
        sx={{
          width: 200,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Rating
          name="hover-feedback"
          value={value}
          precision={0.5}
          getLabelText={getLabelText}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        {value !== null && (
          <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
        )}
      </Box>
      <TextField
        fullWidth
        id="outlined-multiline-flexible"
        label="Please leave a review..."
        multiline
        maxRows={4}
      />
      <Button
        variant="contained"
        // onClick={submit}
        size="small"
      >
        submit
      </Button>
    </div>
  );
}

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';

// export default function MultilineTextFields() {
//   return (
//     <Box
//       component="form"
//       sx={{
//         '& .MuiTextField-root': { m: 1, width: '25ch' },
//       }}
//       noValidate
//       autoComplete="off"
//     >
//       <div>
//         <TextField
//           id="outlined-multiline-flexible"
//           label="Multiline"
//           multiline
//           maxRows={4}
//         />
//         <TextField
//           id="outlined-textarea"
//           label="Multiline Placeholder"
//           placeholder="Placeholder"
//           multiline
//         />
//         <TextField
//           id="outlined-multiline-static"
//           label="Multiline"
//           multiline
//           rows={4}
//           defaultValue="Default Value"
//         />
//       </div>
//       <div>
//         <TextField
//           id="filled-multiline-flexible"
//           label="Multiline"
//           multiline
//           maxRows={4}
//           variant="filled"
//         />
//         <TextField
//           id="filled-textarea"
//           label="Multiline Placeholder"
//           placeholder="Placeholder"
//           multiline
//           variant="filled"
//         />
//         <TextField
//           id="filled-multiline-static"
//           label="Multiline"
//           multiline
//           rows={4}
//           defaultValue="Default Value"
//           variant="filled"
//         />
//       </div>
//       <div>
//         <TextField
//           id="standard-multiline-flexible"
//           label="Multiline"
//           multiline
//           maxRows={4}
//           variant="standard"
//         />
//         <TextField
//           id="standard-textarea"
//           label="Multiline Placeholder"
//           placeholder="Placeholder"
//           multiline
//           variant="standard"
//         />
//         <TextField
//           id="standard-multiline-static"
//           label="Multiline"
//           multiline
//           rows={4}
//           defaultValue="Default Value"
//           variant="standard"
//         />
//       </div>
//     </Box>
//   );
// }
