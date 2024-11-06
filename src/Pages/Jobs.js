// // import React from 'react'

// // const Jobs = () => {
// //   return (
// //     <div>
// //       jobs
// //     </div>
// //   )
// // }

// // export default Jobs

// import React, { useState, useEffect, useMemo } from 'react';
// import axios from 'axios';
// import {
//   MaterialReactTable,
//   useMaterialReactTable,
// } from 'material-react-table';
// import { format, formatDistanceToNow } from 'date-fns';

// import { Stack} from "@mui/material";
// import { useMediaQuery, } from "@mui/material";

// const Example = () => {

// const JOBS_API = process.env.REACT_APP_ADD_JOBS_URL;

//   const isMobile = useMediaQuery("(max-width: 1000px)");
//   const [jobData, setJobData] = useState([]);
//   useEffect(() => {
//     fetchData();

//   }, []);

//   const fetchData = async () => {
//     try {
//       const jobListResponse = await axios.get(`${JOBS_API}/workflow/jobs/job/joblist/list`);
//       const formattedData = jobListResponse.data.jobList.map(job => ({
//         ...job,
//         StartDate: format(new Date(job.StartDate), 'MMMM dd, yyyy'),
//         DueDate: format(new Date(job.DueDate), 'MMMM dd, yyyy'),
//         updatedAt: formatDistanceToNow(new Date(job.updatedAt), { addSuffix: true }),
//         JobAssignee: Array.isArray(job.JobAssignee) ? job.JobAssignee.join(', ') : job.JobAssignee,
//       }));
//       setJobData(formattedData);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: 'Name',
//         header: 'Name',
//         size: 150,
//       },
//       {
//         accessorKey: 'JobAssignee',
//         header: 'Job Assignee',
//         size: 150,

//       },
//       {
//         accessorKey: 'Pipeline',
//         header: 'Pipeline',
//         size: 200,

//       },
//       {
//         accessorKey: 'Stage',
//         header: 'Stage',
//         size: 150,
//       },
//       {
//         accessorKey: 'Account',
//         header: 'Account',
//         size: 150,

//       },
//       {
//         accessorKey: 'StartDate',
//         header: 'Start Date',
//         size: 150,
//       },
//       {
//         accessorKey: 'DueDate',
//         header: 'Due Date',
//         size: 150,
//       },
//       {
//         accessorKey: 'updatedAt',
//         header: 'Time in current stage',
//         size: 150,
//       },

//     ],
//     [],
//   );

//   const table = useMaterialReactTable({
//     columns,
//     data: jobData,
//     enableBottomToolbar: true,
//     enableStickyHeader: true,
//     columnFilterDisplayMode: "custom",
//     enableRowSelection: true,
//     enablePagination: true,
//     muiTableContainerProps: { sx: { maxHeight: "400px" } },
//     initialState: {
//       columnPinning: { left: ["mrt-row-select", "Name"] },
//     },
//     muiTableBodyCellProps: {
//       sx: (theme) => ({
//         backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
//       }),
//     },
//   });

//   return (
//     <div>
//       <Stack direction={isMobile ? "column-reverse" : "column"} gap="8px">

//         <MaterialReactTable columns={columns} table={table} />

//       </Stack>
//     </div>
//   );
// };

// export default Example

// import React from 'react'

// const Jobs = () => {
//   return (
//     <div>
//       jobs
//     </div>
//   )
// }

// export default Jobs

import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { format, formatDistanceToNow } from "date-fns";
import { Button, Box, Typography, Drawer, Chip, Divider, Stack, Select, MenuItem, Paper, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMediaQuery } from "@mui/material";
import { Autocomplete, TextField } from "@mui/material";
import { MRT_TableHeadCellFilterContainer } from "material-react-table";
import { useTheme } from "@mui/material/styles";
import Priority from "../Templates/Priority/Priority";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Editor from "../Templates/Texteditor/Editor";
import UpdateJob from "./UpdateJob";
import { toast } from "react-toastify";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
const Example = () => {
  const JOBS_API = process.env.REACT_APP_ADD_JOBS_URL;
  const USER_API = process.env.REACT_APP_USER_URL;
  const TAGS_API = process.env.REACT_APP_TAGS_TEMP_URL;
  // const PIPELINE_API = process.env.REACT_APP_PIPELINE_TEMP_URL;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobile = useMediaQuery("(max-width: 1000px)");
  const [jobData, setJobData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const jobListResponse = await axios.get(`${JOBS_API}/workflow/jobs/job/joblist/list`);
      const formattedData = jobListResponse.data.jobList.map((job) => ({
        ...job,
        StartDate: format(new Date(job.StartDate), "MMMM dd, yyyy"),
        DueDate: format(new Date(job.DueDate), "MMMM dd, yyyy"),
        updatedAt: formatDistanceToNow(new Date(job.updatedAt), { addSuffix: true }),
        JobAssignee: Array.isArray(job.JobAssignee) ? job.JobAssignee.join(", ") : job.JobAssignee,
      }));
      setJobData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Define the filter function

  // account
  const ACCOUNT_API = process.env.REACT_APP_ACCOUNTS_URL;
  const [accountData, setAccountData] = useState([]);

  useEffect(() => {
    fetchAccountData();
  }, []);

  const fetchAccountData = async () => {
    try {
      const response = await fetch(`${ACCOUNT_API}/accounts/accountdetails`);
      const data = await response.json();
      setAccountData(data.accounts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Create account options
  const accountOptions = accountData.map((account) => ({
    value: account._id,
    label: account.accountName,
  }));

  // pipeline
  const PIPELINE_API = process.env.REACT_APP_PIPELINE_TEMP_URL;
  const [pipelineData, setPipelineData] = useState([]);
  const [selectedPipeline, setSelectedPipeline] = useState(null);
  const [piplineid, setPipelineId] = useState();
  const [pipelineIdData, setPipelineIdData] = useState();
  const [stages, setstages] = useState();

  useEffect(() => {
    fetchPipelineDataid();
  }, []);

  const fetchPipelineDataid = async (piplineid) => {
    try {
      const response = await fetch(`${PIPELINE_API}/workflow/pipeline/pipeline/${piplineid}`);
      const data = await response.json();

      setPipelineIdData(data.pipeline);

      if (data.pipeline && data.pipeline.stages) {
        const stagesdata = data.pipeline.stages.map((stage) => ({
          value: stage._id,
          label: stage.name,
        }));
        setstages(stagesdata);
        console.log(stagesdata);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchPipelineData();
  }, []);

  const fetchPipelineData = async () => {
    try {
      const url = `${PIPELINE_API}/workflow/pipeline/pipelines`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch pipeline data");
      }
      const data = await response.json();
      setPipelineData(data.pipeline || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const optionpipeline = pipelineData.map((pipeline) => ({
    value: pipeline._id,
    label: pipeline.pipelineName,
  }));

  const handlePipelineChange = (selectedOptions) => {
    setSelectedPipeline(selectedOptions);
  };

  const [selectedstage, setSelectedstage] = useState("");
  const handleStageChange = (selectedOptions) => {
    setSelectedstage(selectedOptions);
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const handlePriorityChange = (priority) => {
    setPriority(priority);
  };
  const handleEditorChange = (content) => {
    setDescription(content);
  };

  //Tag FetchData ================
  const [tags, setTags] = useState([]);
  const [combinedTagsValues, setCombinedTagsValues] = useState([]);
  useEffect(() => {
    fetchTagData();
  }, []);

  const fetchTagData = async () => {
    try {
      const response = await fetch(`${TAGS_API}/tags/`);
      const data = await response.json();
      setTags(data.tags);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  //  for tags
  const calculateWidth = (label) => {
    const textWidth = label.length * 8;
    return Math.min(textWidth, 200);
  };
  const calculateWidthOptions = (label) => `${Math.max(label.length * 8, 90)}px`;
  const tagoptions = tags.map((tag) => ({
    value: tag._id,
    label: tag.tagName,
    colour: tag.tagColour,

    customTagStyle: {
      backgroundColor: tag.tagColour,
      color: "#fff",
      borderRadius: "8px",
      alignItems: "center",
      textAlign: "center",
      marginBottom: "5px",
      padding: "2px,8px",

      fontSize: "10px",
      width: `${calculateWidth(tag.tagName)}px`,
      margin: "7px",
    },
  }));

  const [selectedTags, setSelectedTags] = useState([]);
  const [dataAccountjob, setDataAccountjob] = useState();

  const handleTagChange = (event, newValue) => {
    setSelectedTags(newValue); // Keep the full tag objects

    // Send only the values to your backend
    const tagValues = newValue.map((option) => option.value);
    console.log("Selected Values:", tagValues);

    // Assuming setCombinedTagsValues is a function to send the values to your backend
    setCombinedTagsValues(tagValues);
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  const [userData, setUserData] = useState([]);
  const [selecteduser, setSelectedUser] = useState();
  const [combinedValues, setCombinedValues] = useState([]);
  const fetchUserData = async () => {
    try {
      const url = `${USER_API}/api/auth/users`;
      const response = await fetch(url);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const useroptions = userData.map((user) => ({
    value: user._id,
    label: user.username,
  }));
  const handleUserChange = (event, selectedOptions) => {
    setSelectedUser(selectedOptions);
    const selectedValues = selectedOptions.map((option) => option.value);
    setCombinedValues(selectedValues);
  };
  const [startDate, setStartDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };
  const handleDueDateChange = (date) => {
    setDueDate(date);
  };
  const [jobid, setjobid] = useState();
  const handleClick = async (id) => {
    console.log(id);
    setjobid(id);
    try {
      const url = `http://127.0.0.1:7550/workflow/jobs/job/joblist/listbyid/${id}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setSelectedJob(data.jobList);
      console.log(data.jobList);

      if (data.jobList && data.jobList.Pipeline) {
        const pipelineData = {
          value: data.jobList.Pipeline._id,
          label: data.jobList.Pipeline.Name,
        };
        setSelectedPipeline(pipelineData);
        console.log(pipelineData);
        setPipelineId(data.jobList.Pipeline._id);
        console.log(data.jobList.Pipeline._id);
        fetchPipelineDataid(data.jobList.Pipeline._id);
      }
      setDueDate(dayjs(data.jobList.DueDate) || null);
      // (dayjs(tempvalues.startdate) || null)
      setStartDate(dayjs(data.jobList.StartDate) || null);
      if (data.jobList && data.jobList.Stage) {
        const stageData = {
          value: data.jobList.Stage[0]._id,
          label: data.jobList.Stage[0].name,
        };
        setSelectedstage(stageData);
      }
      setPriority(data.jobList.Priority);
      setDescription(data.jobList.Description);
      if (data.jobList && data.jobList.Account) {
        setDataAccountjob(data.jobList.Account[0].accountName);
      }

      if (data.jobList && data.jobList.Account) {
        const tags = data.jobList.Account[0].tags.map((tag) => ({
          value: tag._id,
          label: tag.tagName,
          colour: tag.tagColour,

          customStyle: {
            backgroundColor: tag.tagColour,
            color: "#fff",
            borderRadius: "8px",
            alignItems: "center",
            textAlign: "center",
            marginBottom: "5px",
            padding: "2px,8px",

            fontSize: "10px",
            width: `${calculateWidth(tag.tagName)}px`,
            margin: "7px",
          },
        }));

        setSelectedTags(tags);
      }
      if (data.jobList && data.jobList.JobAssignee) {
        const assigneesData = data.jobList.JobAssignee.map((assignee) => ({
          value: assignee._id,
          label: assignee.username,
        }));

        setSelectedUser(assigneesData);
        const selectedValues = assigneesData.map((option) => option.value);
        setCombinedValues(selectedValues);
      }
      setIsDrawerOpen(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // console.log(selectedTags);
  const columns = useMemo(
    () => [
      {
        accessorKey: "Name",
        header: "Name",

        Cell: ({ row }) => (
          <span style={{ cursor: "pointer", color: "blue" }} onClick={() => handleClick(row.original.id)}>
            {row.original.Name}
          </span>
        ),
      },

      { accessorKey: "JobAssignee", header: "Job Assignee", size: 150 },
      {
        accessorKey: "Pipeline",
        header: "Pipeline",
        size: 200,
      },
      {
        accessorKey: "Stage",
        header: "Stage",
        size: 150,
      },
      {
        accessorKey: "Account",
        header: "Account",
        size: 150,
      },
      {
        accessorKey: "StartDate",
        header: "Start Date",
        size: 150,
      },
      {
        accessorKey: "DueDate",
        header: "Due Date",
        size: 150,
      },
      {
        accessorKey: "updatedAt",
        header: "Time in current stage",
        size: 150,
      },
    ],
    [optionpipeline, accountOptions]
  );

  const table = useMaterialReactTable({
    columns,
    data: jobData,
    enableBottomToolbar: true,
    enableStickyHeader: true,
    columnFilterDisplayMode: "custom",
    enableRowSelection: true,
    enablePagination: true,
    muiTableContainerProps: { sx: { maxHeight: "400px" } },
    initialState: {
      columnPinning: { left: ["mrt-row-select", "Name"] },
    },
    muiTableBodyCellProps: {
      sx: (theme) => ({
        backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
      }),
    },
  });
  const handleSaveExitClick = () => {
    updatejobdata();
  };
  const updatejobdata = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      pipeline: selectedPipeline.value,
      stageid: selectedstage.value,
      jobassignees: combinedValues,
      priority: priority,
      description: description,
      startdate: startDate,
      enddate: dueDate,
    });

    console.log(raw);
    // /job
    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log(jobid);
    fetch("http://127.0.0.1:7550/workflow/jobs/job/" + jobid, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((result) => {
        // Handle success
        toast.success("Job Template created successfully");
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
        toast.error("Failed to create Job Template");
      });
  };
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          PaperProps={{
            sx: {
              borderRadius: isSmallScreen ? "0" : "10px 0 0 10px",
              width: isSmallScreen ? "100%" : 600,
              maxWidth: "100%",
              [theme.breakpoints.down("sm")]: {
                width: "100%",
              },
              id: "tag-drawer",
            },
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", ml: 1 }}>
            <Typography sx={{ fontWeight: "bold" }} variant="h6">
              Edit Job
            </Typography>
            <IconButton onClick={() => setIsDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box padding={2}>
            <Box mt={2}>
              <label>Pipeline</label>

              <Autocomplete
                options={optionpipeline}
                getOptionLabel={(option) => option.label}
                value={selectedPipeline}
                onChange={(event, newValue) => handlePipelineChange(newValue)}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    {...props}
                    sx={{ cursor: "pointer", margin: "5px 10px" }} // Add cursor pointer style
                  >
                    {option.label}
                  </Box>
                )}
                renderInput={(params) => <TextField {...params} sx={{ backgroundColor: "#fff" }} placeholder="Pipeline" variant="outlined" size="small" />}
                sx={{ width: "100%", marginTop: "8px" }}
                clearOnEscape // Enable clearable functionality
              />
            </Box>
            <Box mt={2}>
              <label>Account Tags</label>
              <Autocomplete
                multiple // Enable multi-select
                size="small"
                sx={{ marginTop: "8px", marginBottom: "8px" }}
                options={tagoptions} // The array of options
                value={selectedTags} // Selected tags
                onChange={handleTagChange}
                getOptionLabel={(option) => option.label} // Assuming your tags have a 'label' property
                isOptionEqualToValue={(option, value) => option.value === value.value} // Customize equality check
                renderInput={(params) => <TextField {...params} variant="outlined" placeholder="Select tags..." />}
                filterSelectedOptions // Prevents duplicates in selection
                renderOption={(props, option) => (
                  <MenuItem
                    {...props}
                    key={option.value}
                    style={{
                      backgroundColor: option.colour,
                      color: "#fff",
                      borderRadius: "15px",
                      margin: "2px 0",
                      width: calculateWidthOptions(option.label),
                    }}
                  >
                    {option.label}
                  </MenuItem>
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      key={option.value}
                      label={option.label}
                      style={{
                        backgroundColor: option.colour,
                        color: "#fff",
                        borderRadius: "15px",
                        fontSize: "10px",
                        margin: "7px",
                        alignItems: "center",
                        textAlign: "center",
                        marginBottom: "5px",
                        padding: "2px,8px",
                      }}
                    />
                  ))
                }
              />
            </Box>
            <Box>
              <label className="task-input-label">Task Assignee</label>
              <Autocomplete
                multiple
                sx={{ background: "#fff", mt: 1 }}
                options={useroptions}
                size="small"
                getOptionLabel={(option) => option.label}
                value={selecteduser}
                onChange={handleUserChange}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    {...props}
                    sx={{ cursor: "pointer", margin: "5px 10px" }} // Add cursor pointer style
                  >
                    {option.label}
                  </Box>
                )}
                renderInput={(params) => <TextField {...params} variant="outlined" placeholder="Assignees" />}
                isOptionEqualToValue={(option, value) => option.value === value.value}
              />
            </Box>
            <Box>
              <label>Stage</label>
              <Autocomplete
                options={stages || []}
                getOptionLabel={(option) => option.label}
                value={selectedstage}
                onChange={(event, newValue) => handleStageChange(newValue)}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    {...props}
                    sx={{ cursor: "pointer", margin: "5px 10px" }} // Add cursor pointer style
                  >
                    {option.label}
                  </Box>
                )}
                renderInput={(params) => <TextField {...params} sx={{ backgroundColor: "#fff" }} placeholder="Select stages" variant="outlined" size="small" />}
                clearOnEscape // Enable clearable functionality
                sx={{ width: "100%", marginTop: "8px" }}
              />
            </Box>
            <Box mt={2}>
              <Priority onPriorityChange={handlePriorityChange} selectedPriority={priority} />
            </Box>

            <Typography>Start Date</Typography>
            <DatePicker
              format="DD/MM/YYYY"
              sx={{ width: "100%", backgroundColor: "#fff" }}
              // value={startDate}
              // onChange={handleStartDateChange}
              value={startDate}
              onChange={handleStartDateChange}
              renderInput={(params) => <TextField {...params} size="small" />}
            />

            <Typography>Due Date</Typography>
            <DatePicker
              format="DD/MM/YYYY"
              sx={{ width: "100%", backgroundColor: "#fff" }}
              // value={dueDate}
              // onChange={handleDueDateChange}
              value={dueDate}
              onChange={handleDueDateChange}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
            <Box mt={2}>
              <Editor initialContent={description} onChange={handleEditorChange} />
            </Box>

            <Box>
              <Button variant="contained" onClick={handleSaveExitClick}>
                Save & Exit
              </Button>
            </Box>
          </Box>
        </Drawer>

        <Stack direction={isMobile ? "column-reverse" : "column"} gap="8px">
          <MaterialReactTable columns={columns} table={table} />
        </Stack>
      </LocalizationProvider>
    </>
  );
};

export default Example;
// {selectedJob && <UpdateJob selectedJob={selectedJob} handleClose={() => setIsDrawerOpen(false)} />}
