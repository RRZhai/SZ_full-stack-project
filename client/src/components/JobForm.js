import { useForm } from "react-hook-form";
import * as React from "react";
import { useState } from "react";
import { Box, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Button from "@mui/material/Button";
import { FormControl, FormLabel } from "@mui/material";

const JobForm = ({ handleSubmitJob, currentUser }) => {
  const jobTypes = [
    {
      value: "Babysitting",
      label: "Babysitting",
    },
    {
      value: "House Cleaning",
      label: "House Cleaning",
    },
    {
      value: "Tutoring",
      label: "Tutoring",
    },
    {
      value: "Dog Walking",
      label: "Dog Walking",
    },
    {
      value: "Delivery Service",
      label: "Delivery Service",
    },
    {
      value: "Event Staffing",
      label: "Event Staffing",
    },
    {
      value: "Handyman Service",
      label: "Handyman Service",
    },
    {
      value: "Modeling",
      label: "Modeling",
    },
    {
      value: "Other",
      label: "Other",
    },
  ];

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl onSubmit={handleSubmitJob}>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            id="outlined-read-only-input"
            label="Username"
            defaultValue={currentUser.name}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            id="outlined-read-only-input"
            label="Email"
            defaultValue={currentUser.email}
            InputProps={{
              readOnly: true,
            }}
          />
        </Stack>
        <TextField
          id="outlined-select-jobtypes"
          select
          label="Required"
          defaultValue="Job Type"
          helperText="Please select your job type"
        >
          {jobTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          required
          id="outlined-required"
          label="Description"
          placeholder="Please describe the job"
        />
        <TextField
          fullWidth
          required
          id="outlined-required"
          label="Payrate"
          placeholder="Please enter the payrate. Ex: $15/hr"
        />
        <TextField
          fullWidth
          required
          id="outlined-required"
          label="Address"
          placeholder="Please enter the address"
        />
        <TextField
          fullWidth
          required
          id="outlined-required"
          label="City"
          placeholder="Please enter the city"
        />
        <TextField
          fullWidth
          required
          id="outlined-required"
          label="State"
          placeholder="Please enter the state"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
            <DateTimePicker
              label="Start Time"
              defaultValue={dayjs("2022-04-17T15:30")}
            />
            <DateTimePicker
              label="End Time"
              defaultValue={dayjs("2022-04-17T15:31")}
            />
          </DemoContainer>
        </LocalizationProvider>{" "}
        <Button>Submit</Button>
      </FormControl>
    </Box>
  );
};

export default JobForm;
