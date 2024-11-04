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


import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { format, formatDistanceToNow } from 'date-fns';
import { Stack, Select, MenuItem ,Paper,IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useMediaQuery, } from "@mui/material";
import { Autocomplete, TextField } from '@mui/material';
import { MRT_TableHeadCellFilterContainer} from "material-react-table";
const Example = () => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const handleFilterChange = (event) => {
    const selectedIndex = event.target.value; // Assuming event.target.value is an index
    setSelectedFilterIndex(event.target.value);
    if (selectedIndex === null) {
      setSelectedFilterIndex(null); // Resetting selected filter index
      setSelectedFilters([]); // Resetting all selected filters
    } else {
      setSelectedFilters((prevFilters) => {
        const index = prevFilters.indexOf(selectedIndex);
        if (index === -1) {
          return [...prevFilters, selectedIndex]; // Append the selected index if not already present
        } else {
          return prevFilters.filter((item) => item !== selectedIndex); // Remove the index if already present
        }
      });
    }
    console.log(selectedFilters);
  };
  const renderFilterContainers = () => {

    return selectedFilters.map((selectedFilterIndex) => {
      const header = table.getLeafHeaders()[selectedFilterIndex + 1];
      return (
        <div className="MRT_TableHeadCellFilterContainer">
          <MRT_TableHeadCellFilterContainer key={header.id} header={header} table={table} in />
          <IconButton
          aria-label="delete"
          size="small"
          onClick={() => {
            setSelectedFilters(prevFilters => prevFilters.filter(item => item !== selectedFilterIndex));
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
        </div>
      )


    });
  };
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(null);

const JOBS_API = process.env.REACT_APP_ADD_JOBS_URL;
const USER_API = process.env.REACT_APP_USER_URL;
  const isMobile = useMediaQuery("(max-width: 1000px)");
  const [jobData, setJobData] = useState([]);
  useEffect(() => {
    fetchData();

  }, []);

  const fetchData = async () => {
    try {
      const jobListResponse = await axios.get(`${JOBS_API}/workflow/jobs/job/joblist/list`);
      const formattedData = jobListResponse.data.jobList.map(job => ({
        ...job,
        StartDate: format(new Date(job.StartDate), 'MMMM dd, yyyy'),
        DueDate: format(new Date(job.DueDate), 'MMMM dd, yyyy'),
        updatedAt: formatDistanceToNow(new Date(job.updatedAt), { addSuffix: true }),
        JobAssignee: Array.isArray(job.JobAssignee) ? job.JobAssignee.join(', ') : job.JobAssignee,
      }));
      setJobData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  
  

    // Define the filter function

const typeFilterFn = (row, columnId, filterValue) => {
  const assignee = filterValue || '';
  const jobAssignees = row.original.JobAssignee || '';
  return jobAssignees.includes(assignee);
};




const TypeFilter = ({ column, table }) => {
  const [selectedAssignee, setSelectedAssignee] = useState(null);
  const [userData, setUserData] = useState([]);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const url = `${USER_API}/api/auth/users`;
        const response = await axios.get(url);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUserData();
  }, []);

  // Handle selection change
  const handleAssigneeChange = (event, newValue) => {
    setSelectedAssignee(newValue);

    // Update table filter value
    table.setColumnFilters(prevFilters => [
      ...prevFilters.filter(filter => filter.id !== column.id), // Remove existing filter for the column
      { id: column.id, value: newValue ? newValue.label : null } // Add new filter value or null
    ]);
  };

  // Prepare options for Autocomplete
  const options = useMemo(() => userData.map(user => ({
    value: user._id,
    label: user.username,
  })), [userData]);

  return (
    <Autocomplete
      value={selectedAssignee}
      options={options}
      getOptionLabel={(option) => option.label}
      onChange={handleAssigneeChange}
      renderInput={(params) => <TextField {...params} label="Filter by Assignee" variant="outlined" />}
      isOptionEqualToValue={(option, value) => option.label === value?.label} // Ensure correct comparison
    />
  );
};



// pipeline
const PIPELINE_API = process.env.REACT_APP_PIPELINE_TEMP_URL;
const [pipelineData, setPipelineData] = useState([]);
const [selectedPipeline, setSelectedPipeline] = useState(null);

useEffect(() => {
  fetchPipelineData();
}, []);

const fetchPipelineData = async () => {
  try {
    const url = `${PIPELINE_API}/workflow/pipeline/pipelines`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch pipeline data');
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

const PipelineFilter = ({ column, table }) => {
  const handlePipelineChange = (event, newValue) => {
    setSelectedPipeline(newValue);
    
    table.setColumnFilters(prevFilters => [
      ...prevFilters.filter(filter => filter.id !== column.id), // Remove existing filter for the column
      { id: column.id, value: newValue ? newValue.label : null } // Add new filter value or null
    ]);
  };

  return (
    <Autocomplete
      value={selectedPipeline}
      options={optionpipeline}
      getOptionLabel={(option) => option.label}
      onChange={handlePipelineChange}
      renderInput={(params) => <TextField {...params} placeholder="Filter by Pipeline" variant="outlined" />}
      isOptionEqualToValue={(option, value) => option.value === value?.value} // Ensure correct comparison
    />
  );
};
const pipelineFilterFn = (row, columnId, filterValue) => {
  const pipeline = filterValue || '';
  const rowPipeline = row.original.Pipeline || '';
  return rowPipeline.includes(pipeline);
};

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
  label: account.accountName
}));
const accountFilterFn = (row, columnId, filterValue) => {
  const account = filterValue || '';
  const rowAccount = row.original.Account || '';
  return rowAccount.includes(account);
};

const AccountFilter = ({ column, table }) => {
  const [selectedAccount, setSelectedAccount] = useState(null);

  const handleAccountChange = (event, newValue) => {
    setSelectedAccount(newValue);
    
    // Update table filter value
    table.setColumnFilters(prevFilters => [
      ...prevFilters.filter(filter => filter.id !== column.id), // Remove existing filter for the column
      { id: column.id, value: newValue ? newValue.label : null } // Add new filter value or null
    ]);
  };

  return (
    
    <Autocomplete
      value={selectedAccount}
      options={accountOptions}
      getOptionLabel={(option) => option.label}
      onChange={handleAccountChange}
      renderInput={(params) => <TextField {...params} placeholder="Filter by Account" variant="outlined" />}
      isOptionEqualToValue={(option, value) => option.value === value?.value} // Ensure correct comparison
    />
  );
};


 const columns = useMemo(
    () => [
      {
        accessorKey: 'Name',
        header: 'Name',
        size: 150,
      },
     
      { accessorKey: 'JobAssignee', header: 'Job Assignee', size: 150, filterFn: typeFilterFn, Filter: ({ column, table }) => <TypeFilter column={column} table={table} /> },
      {
        accessorKey: 'Pipeline',
        header: 'Pipeline',
        size: 200,
        filterFn: pipelineFilterFn, // Use the custom filter function for Pipeline
        Filter: ({ column, table }) => <PipelineFilter column={column} table={table} />,
      },
      {
        accessorKey: 'Stage',
        header: 'Stage',
        size: 150,
      },
      {
        accessorKey: 'Account',
        header: 'Account',
        size: 150,
        filterFn: accountFilterFn, // Use the custom filter function for Account
        Filter: ({ column, table }) => <AccountFilter column={column} table={table} />,
      },
      {
        accessorKey: 'StartDate',
        header: 'Start Date',
        size: 150,
      },
      {
        accessorKey: 'DueDate',
        header: 'Due Date',
        size: 150,
      },
      {
        accessorKey: 'updatedAt',
        header: 'Time in current stage',
        size: 150,
      },
      
    ],
    [optionpipeline,accountOptions],
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

  return (
    <Stack direction={isMobile ? "column-reverse" : "column"} gap="8px">
    <Paper style={{ border: '2px solid blue', display: 'flex', overflowX: 'auto' }}>
      <Stack p="8px" gap="8px" display="flex" direction="row" >
        <>
          <Select
            value={selectedFilterIndex}
            onChange={handleFilterChange}
            size='small'
            sx={{width:'200px'}}
          >
            <MenuItem value={null}>None</MenuItem>
            {columns.map((column, index) => (
              <MenuItem key={index} value={index}>
                {column.header}
              </MenuItem>
            ))}
          </Select>

          <Stack direction="row" gap="8px" >
            {renderFilterContainers()}
          </Stack>
        </>

      </Stack>
    </Paper>
    <MaterialReactTable columns={columns} table={table} />
  </Stack>
  );
};

export default Example
