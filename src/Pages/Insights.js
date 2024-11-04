// // InsightsPage.js

// import React, { useEffect, useState } from "react";
// import { TablePagination, Chip, Tooltip, Autocomplete, OutlinedInput, MenuItem as MuiMenuItem, FormControl, InputLabel, Menu, Button, IconButton, Select, MenuItem, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Paper } from "@mui/material";
// import axios from "axios";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { RxCross2 } from "react-icons/rx";
// import { Link } from "react-router-dom";

// const FixedColumnTable = () => {
//   const CONTACT_API = process.env.REACT_APP_CONTACTS_URL;
//   const TAGS_API = process.env.REACT_APP_TAGS_TEMP_URL;
//   const [contactData, setContactData] = useState([]);
//   const [selected, setSelected] = useState([]);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5); // 5 rows per page
//   const [filters, setFilters] = useState({
//     tags: [],
//   });

//   const [showFilters, setShowFilters] = useState({
//     tags: false,
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${CONTACT_API}/contacts/contactlist/list/`);
//         setContactData(response.data.contactlist);
//         console.log(response.data.contactlist);
//       } catch (error) {
//         console.log("Error:", error);
//       }
//     };

//     fetchData();
//   }, [CONTACT_API]);

//   const handleSelect = (id) => {
//     const currentIndex = selected.indexOf(id);
//     const newSelected = currentIndex === -1 ? [...selected, id] : selected.filter((item) => item !== id);
//     setSelected(newSelected);
//     // Log all selected row IDs
//     console.log("Selected IDs:", newSelected); // Log all selected IDs
//   };
//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prevFilters) => ({ ...prevFilters, [name]: value })); // Update filter without clearing others
//     setPage(0);
//   };

//   const filteredData = contactData.filter((row) => {
//     const tagMatch = filters.tags.length ? row.Tags && Array.isArray(row.Tags) && filters.tags.some((tag) => row.Tags.some((rowTag) => rowTag.tagName === tag.tagName && rowTag.tagColour === tag.tagColour)) : true;
//     return tagMatch;
//   });

//   const handleFilterButtonClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const clearFilter = (filterField) => {
//     setFilters((prevFilters) => ({ ...prevFilters, [filterField]: "" })); // Clear the specific filter
//     setShowFilters((prev) => ({
//       ...prev,
//       [filterField]: false, // Hide the filter input
//     }));
//   };

//   const toggleFilter = (filterType) => {
//     setShowFilters((prev) => ({
//       ...prev,
//       [filterType]: !prev[filterType],
//     }));
//   };
//   const handleMultiSelectChange = (name, values) => {
//     setFilters((prevFilters) => ({ ...prevFilters, [name]: values }));
//   };
//   // const teamMemberOptions = Array.from(new Set(accountData.flatMap((row) => row.Team.map((member) => member.username))));
//   const [tags, setTags] = useState([]);

//   useEffect(() => {
//     fetchTagData();
//   }, []);

//   const fetchTagData = async () => {
//     try {
//       const response = await fetch(`${TAGS_API}/tags/`);
//       const data = await response.json();
//       setTags(data.tags);
//     } catch (error) {
//       console.error("Error fetching tags:", error);
//     }
//   };

//   const uniqueTags =
//     tags.length > 0
//       ? Array.from(new Set(tags.map((tag) => `${tag.tagName}-${tag.tagColour}`))).map((tagKey) => {
//           const [tagName, tagColour] = tagKey.split("-");
//           return { tagName, tagColour };
//         })
//       : [];
//   const calculateWidth = (tagName) => {
//     const baseWidth = 10; // base width for each tag
//     const charWidth = 8; // approximate width of each character
//     const padding = 10; // padding on either side
//     return baseWidth + charWidth * tagName.length + padding;
//   };
//   const handleSort = (key) => {
//     setSortConfig((prevSortConfig) => {
//       if (prevSortConfig.key === key) {
//         return { key, direction: prevSortConfig.direction === "asc" ? "desc" : "asc" };
//       }
//       return { key, direction: "asc" };
//     });
//   };

//   const sortedData = React.useMemo(() => {
//     const dataToSort = filteredData; // Use filteredData for sorting
//     const sorted = [...dataToSort]; // Create a copy of filteredData

//     if (sortConfig.key) {
//       sorted.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
//         if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
//         return 0;
//       });
//     }
//     return sorted;
//   }, [filteredData, sortConfig]);
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };
//   const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   return (
//     <>
//       <div style={{ display: "flex", padding: "10px", marginBottom: "20px" }}>
//         <Button variant="text" onClick={handleFilterButtonClick} style={{ marginRight: "10px" }}>
//           Filter Options
//         </Button>
//         <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
//           <MenuItem
//             onClick={() => {
//               toggleFilter("tags");
//               handleClose();
//             }}
//           >
//             Tags
//           </MenuItem>
//           <MenuItem
//             onClick={() => {
//               toggleFilter("createdAt");
//               handleClose();
//             }}
//           >
//             Created At
//           </MenuItem>
//           <MenuItem
//             onClick={() => {
//               toggleFilter("updatedAt");
//               handleClose();
//             }}
//           >
//             Updated At
//           </MenuItem>
//         </Menu>
//         {/* Tags Filter */}
//         {showFilters.tags && (
//           <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
//             <Autocomplete
//               multiple
//               options={uniqueTags}
//               value={filters.tags || []}
//               onChange={(e, newValue) => handleMultiSelectChange("tags", newValue)}
//               getOptionLabel={(option) => option.tagName}
//               filterSelectedOptions
//               renderOption={(props, option) => (
//                 <li
//                   {...props}
//                   style={{
//                     backgroundColor: option.tagColour,
//                     color: "#fff",
//                     padding: "2px 8px",
//                     borderRadius: "8px",
//                     textAlign: "center",
//                     marginBottom: "5px",
//                     fontSize: "10px",
//                     width: `${calculateWidth(option.tagName)}px`,
//                     marginLeft: "5px",
//                     cursor: "pointer",
//                   }}
//                 >
//                   {option.tagName}
//                 </li>
//               )}
//               renderTags={(selected, getTagProps) =>
//                 selected.map((option, index) => (
//                   <Chip
//                     key={option.value}
//                     label={option.tagName}
//                     style={{
//                       backgroundColor: option.tagColour,
//                       color: "#fff",
//                       cursor: "pointer",
//                       // borderRadius: "8px",
//                       fontSize: "12px",
//                       margin: "2px",
//                     }}
//                     {...getTagProps({ index })}
//                   />
//                 ))
//               }
//               renderInput={(params) => <TextField {...params} variant="outlined" placeholder="Filter by Tags" size="small" style={{ width: "250px" }} />}
//               style={{ marginRight: "10px", width: "250px" }}
//             />
//             <DeleteIcon onClick={() => clearFilter("tags")} style={{ cursor: "pointer", color: "red" }} />
//           </div>
//         )}
//       </div>
//       <TableContainer component={Paper} style={{ width: "100%", overflowX: "auto" }}>
//         <Table style={{ tableLayout: "fixed", width: "100%" }}>
//           <TableHead>
//             <TableRow>
//               <TableCell padding="checkbox" style={{ position: "sticky", left: 0, zIndex: 1, background: "#fff" }}>
//                 <Checkbox
//                   checked={selected.length === contactData.length}
//                   onChange={() => {
//                     if (selected.length === contactData.length) {
//                       setSelected([]);
//                     } else {
//                       const allSelected = contactData.map((item) => item.id);
//                       setSelected(allSelected);
//                     }
//                   }}
//                 />
//               </TableCell>
//               <TableCell onClick={() => handleSort("name")} style={{ cursor: "pointer", position: "sticky", left: 50, zIndex: 1, background: "#fff" }} width="200">
//                 Name {sortConfig.key === "name" ? (sortConfig.direction === "asc" ? "↑" : "↓") : null}
//               </TableCell>
//               <TableCell width="200">Email</TableCell>
//               <TableCell width="200" style={{ cursor: "pointer" }} onClick={() => handleSort("phoneNumbers")}>
//                 Phone Number {sortConfig.key === "phoneNumbers" ? (sortConfig.direction === "asc" ? "↑" : "↓") : null}
//               </TableCell>
//               <TableCell width="200">Tags</TableCell>
//               <TableCell width="200" onClick={() => handleSort("companyName")} style={{ cursor: "pointer" }}>
//                 Company Name {sortConfig.key === "companyName" ? (sortConfig.direction === "asc" ? "↑" : "↓") : null}
//               </TableCell>
//               <TableCell width="200">Created At</TableCell>
//               <TableCell width="200">Updated At</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedData.map((row) => {
//               const isSelected = selected.indexOf(row.id) !== -1;
//               return (
//                 <TableRow key={row.id} hover onClick={() => handleSelect(row.id)} role="checkbox" tabIndex={-1} selected={isSelected}>
//                   <TableCell padding="checkbox" style={{ position: "sticky", left: 0, zIndex: 1, background: "#fff" }}>
//                     <Checkbox checked={isSelected} />
//                   </TableCell>
//                   <TableCell style={{ position: "sticky", left: 50, zIndex: 1, background: "#fff" }}>{row.name}</TableCell>
//                   <TableCell>{row.email}</TableCell>
//                   <TableCell>{row.phoneNumbers && row.phoneNumbers[0] && row.phoneNumbers[0].map((phoneObj, index) => <div key={index}>{phoneObj.phone}</div>)}</TableCell>
//                   <TableCell>
//                     {row.tags && row.tags[0] && row.tags[0].length > 0 && (
//                       <>
//                         <Chip
//                           label={row.tags[0][0].tagName}
//                           style={{
//                             backgroundColor: row.tags[0][0].tagColour,
//                             color: "#fff",
//                             fontSize: "10px",
//                           }}
//                         />
//                         {row.tags[0].length > 1 && (
//                           <Tooltip
//                             title={
//                               <div>
//                                 {row.tags[0].map((tag) => (
//                                   <div
//                                     key={tag.tagName}
//                                     style={{
//                                       backgroundColor: tag.tagColour,
//                                       color: "#fff",
//                                       padding: "2px 4px",
//                                       marginBottom: "2px",
//                                       borderRadius: "4px",
//                                       fontSize: "10px",
//                                       margin: "2px",
//                                     }}
//                                   >
//                                     {tag.tagName}
//                                   </div>
//                                 ))}
//                               </div>
//                             }
//                             placement="top"
//                           >
//                             <span style={{ cursor: "pointer", marginLeft: "8px" }}>+{row.tags[0].length - 1} </span>
//                           </Tooltip>
//                         )}
//                       </>
//                     )}
//                   </TableCell>
//                   <TableCell>{row.companyName}</TableCell>
//                   <TableCell>{formatDate(row.createdAt)}</TableCell>
//                   <TableCell>{formatDate(row.updatedAt)}</TableCell>
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//         <TablePagination rowsPerPageOptions={[5, 10, 15, 20]} component="div" count={sortedData.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
//       </TableContainer>
//     </>
//   );
// };

// export default FixedColumnTable;

import React from "react";
import { Box, Grid, Paper, Typography, Container } from "@mui/material";

const InsightsPage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom mb={3}>
          Insights
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4} p={3}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Metric 1
              </Typography>
              <Typography variant="body1">Some detailed information about Metric 1.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} p={3}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Metric 1
              </Typography>
              <Typography variant="body1">Some detailed information about Metric 1.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} p={3}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Metric 2
              </Typography>
              <Typography variant="body1">Some detailed information about Metric 2.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} p={3}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Metric 3
              </Typography>
              <Typography variant="body1">Some detailed information about Metric 3.</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
export default InsightsPage;

// const FixedColumnTable = () => {
//   const ACCOUNT_API = process.env.REACT_APP_ACCOUNTS_URL;
//   const [accountData, setAccountData] = useState([]);
//   const [selected, setSelected] = useState([]);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [filters, setFilters] = useState({
//     accountName: "",
//     type: "",

//     // Add other filter fields as needed
//   });
//   const [currentFilter, setCurrentFilter] = useState("");
//   const handleMenuItemClick = (filterField) => {
//     setCurrentFilter(filterField);
//     setAnchorEl(null); // Close the menu when a filter is selected
//   };

//   const clearFilter = () => {
//     setFilters({ ...filters, [currentFilter]: "" }); // Clear the specific filter
//     setCurrentFilter(""); // Reset the current filter
//   };
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const config = {
//           method: "get",
//           maxBodyLength: Infinity,
//           url: `${ACCOUNT_API}/accounts/account/accountdetailslist/`,
//           headers: {},
//         };

//         const response = await axios.request(config);
//         setAccountData(response.data.accountlist);
//         console.log(response.data.accountlist); // Log fetched data
//       } catch (error) {
//         console.log("Error:", error);
//       }
//     };

//     fetchData();
//   }, [ACCOUNT_API]);

// const handleSelect = (id) => {
//   const currentIndex = selected.indexOf(id);
//   const newSelected = currentIndex === -1 ? [...selected, id] : selected.filter((item) => item !== id);

//   setSelected(newSelected);

//   // Log selected row data
//   const selectedData = accountData.filter((item) => newSelected.includes(item.id)); // Assuming each account has a unique `id`

//   // Check if selectedData is not empty
//   if (selectedData.length > 0) {
//     console.log(selectedData[0].id);
//   }
// };
//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters({ ...filters, [name]: value });
//   };

//   // Filter data based on filter states
//   const filteredData = accountData.filter((row) => {
//     return (
//       row.Name.toLowerCase().includes(filters.accountName.toLowerCase()) && (filters.type ? row.Type.toLowerCase() === filters.type.toLowerCase() : true)
//       // Add other filter conditions as needed
//     );
//   });

//   const handleFilterButtonClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <>
//       <div style={{ display: "flex", padding: "10px", marginBottom: "20px" }}>
//         <Button variant="outlined" onClick={handleFilterButtonClick} style={{ marginRight: "10px" }}>
//           Filter Options
//         </Button>
//         <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
//           <MenuItem onClick={() => handleMenuItemClick("accountName")}>Account Name</MenuItem>
//           <MenuItem onClick={() => handleMenuItemClick("type")}>Type</MenuItem>
//         </Menu>

//         {currentFilter && currentFilter === "accountName" && (
//           <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
//             <TextField name={currentFilter} value={filters[currentFilter]} onChange={handleFilterChange} placeholder={`Filter by ${currentFilter}`} variant="outlined" size="small" style={{ marginRight: "10px" }} />
//             <DeleteIcon onClick={clearFilter} style={{ cursor: "pointer", color: "red" }} />
//           </div>
//         )}

//         {currentFilter && currentFilter === "type" && (
//           <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
//             <FormControl variant="outlined" size="small" style={{ marginRight: "10px", width: "150px" }}>
//               <InputLabel>Type</InputLabel>
//               <Select name="type" value={filters.type} onChange={handleFilterChange} label="Type">
//                 <MuiMenuItem value="">All</MuiMenuItem>
//                 <MuiMenuItem value="Individual">Individual</MuiMenuItem>
//                 <MuiMenuItem value="Company">Company</MuiMenuItem>
//               </Select>
//             </FormControl>
//             <DeleteIcon onClick={clearFilter} style={{ cursor: "pointer", color: "red" }} />
//           </div>
//         )}
//       </div>
//       <TableContainer component={Paper} style={{ width: "100%", overflowX: "auto" }}>
//         <Table style={{ tableLayout: "fixed", width: "100%" }}>
//           <TableHead>
//             <TableRow>
//               <TableCell padding="checkbox" style={{ position: "sticky", left: 0, zIndex: 1, background: "#fff" }}>
//                 <Checkbox
//                   checked={selected.length === accountData.length}
//                   onChange={() => {
//                     if (selected.length === accountData.length) {
//                       setSelected([]);
//                     } else {
//                       const allSelected = accountData.map((item) => item.id); // Assuming each account has a unique `id`
//                       setSelected(allSelected);
//                       // console.log(accountData); // Log all data when selecting all
//                     }
//                   }}
//                 />
//               </TableCell>
//               <TableCell style={{ position: "sticky", left: 50, zIndex: 1, background: "#fff" }} width="200">
//                 AccountName
//               </TableCell>
//               <TableCell width="200">Type</TableCell>
//               <TableCell width="200">Follow</TableCell>
//               <TableCell width="200">Team Members</TableCell>
//               <TableCell width="200">Tags</TableCell>
//               <TableCell width="200">Invoices</TableCell>
//               <TableCell width="200">Credits</TableCell>
//               <TableCell width="200">Tasks</TableCell>
//               <TableCell width="200">Proposals</TableCell>
//               <TableCell width="200">Unreadchchats</TableCell>
//               <TableCell width="200">Pending Organizers</TableCell>
//               <TableCell width="200">Pending Signatures</TableCell>
//               <TableCell width="200">Last Login</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {filteredData.map((row) => {
//               const isSelected = selected.indexOf(row.id) !== -1; // Check if this row is selected
//               return (
//                 <TableRow key={row.id} hover onClick={() => handleSelect(row.id)} role="checkbox" tabIndex={-1} selected={isSelected}>
//                   <TableCell padding="checkbox" style={{ position: "sticky", left: 0, zIndex: 1, background: "#fff" }}>
//                     <Checkbox checked={isSelected} />
//                   </TableCell>
//                   <TableCell style={{ position: "sticky", left: 50, zIndex: 1, background: "#fff" }}>{row.Name}</TableCell>
//                   <TableCell>{row.Type}</TableCell>
//                   <TableCell>{row.Follow}</TableCell>
//                   <TableCell>
//                     {row.Team.map((member) => (
//                       <div key={member._id}>{member.username}</div>
//                     ))}
//                   </TableCell>
//                   <TableCell>
//                     {row.Tags.map((tag) => (
//                       <span key={tag._id} style={{ background: tag.tagColour, color: "#fff", borderRadius: "8px", marginLeft: "3px", marginBottom: "5px", padding: "2px 8px", fontSize: "10px" }}>
//                         {tag.tagName}
//                       </span>
//                     ))}
//                   </TableCell>
//                   <TableCell>{row.Invoices}</TableCell>
//                   <TableCell>{row.Credits}</TableCell>
//                   <TableCell>{row.Tasks}</TableCell>
//                   <TableCell>{row.Proposals}</TableCell>
//                   <TableCell>{row.Unreadchats}</TableCell>
//                   <TableCell>{row.Pendingorganizers}</TableCell>
//                   <TableCell>{row.Pendingsignatures}</TableCell>
//                   <TableCell>{row.Lastlogin}</TableCell>
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </>
//   );
// };

// import React, { useEffect, useState } from "react";
// import { Chip, Tooltip, Autocomplete, OutlinedInput, MenuItem as MuiMenuItem, FormControl, InputLabel, Menu, Button, IconButton, Select, MenuItem, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Paper } from "@mui/material";
// import axios from "axios";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { RxCross2 } from "react-icons/rx";
// import { Link } from "react-router-dom";
// const FixedColumnTable = () => {
//   const ACCOUNT_API = process.env.REACT_APP_ACCOUNTS_URL;
//   const TAGS_API = process.env.REACT_APP_TAGS_TEMP_URL;
//   const [accountData, setAccountData] = useState([]);
//   const [selected, setSelected] = useState([]);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [sortConfig, setSortConfig] = useState({ key: "Name", direction: "asc" });
//   const [filters, setFilters] = useState({
//     accountName: "",
//     type: "",
//     teamMember: "",
//     tags: [],
//   });
//   const [showFilters, setShowFilters] = useState({
//     accountName: false,
//     type: false,
//     teamMember: false,
//     tags: false,
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${ACCOUNT_API}/accounts/account/accountdetailslist/`);
//         setAccountData(response.data.accountlist);
//         console.log(response.data.accountlist);
//       } catch (error) {
//         console.log("Error:", error);
//       }
//     };

//     fetchData();
//   }, [ACCOUNT_API]);

//   const handleSelect = (id) => {
//     const currentIndex = selected.indexOf(id);
//     const newSelected = currentIndex === -1 ? [...selected, id] : selected.filter((item) => item !== id);
//     setSelected(newSelected);
//     // Log all selected row IDs
//     console.log("Selected IDs:", newSelected); // Log all selected IDs
//   };
//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prevFilters) => ({ ...prevFilters, [name]: value })); // Update filter without clearing others
//   };
//   const filteredData = accountData.filter((row) => {
//     const accountNameMatch = row.Name.toLowerCase().includes(filters.accountName.toLowerCase());
//     const typeMatch = filters.type ? row.Type.toLowerCase() === filters.type.toLowerCase() : true;
//     const teamMemberMatch = filters.teamMember ? row.Team.some((member) => member.username === filters.teamMember) : true;
//     // const tagMatch = filters.tags.length ? filters.tags.every((tag) => row.Tags.some((rowTag) => rowTag.tagName === tag)) : true;
//     const tagMatch = filters.tags.length ? filters.tags.every((tag) => row.Tags.some((rowTag) => rowTag.tagName === tag.tagName && rowTag.tagColour === tag.tagColour)) : true;
//     return accountNameMatch && typeMatch && teamMemberMatch && tagMatch;
//   });
//   const handleFilterButtonClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const clearFilter = (filterField) => {
//     setFilters((prevFilters) => ({ ...prevFilters, [filterField]: "" })); // Clear the specific filter
//     setShowFilters((prev) => ({
//       ...prev,
//       [filterField]: false, // Hide the filter input
//     }));
//   };

//   const toggleFilter = (filterType) => {
//     setShowFilters((prev) => ({
//       ...prev,
//       [filterType]: !prev[filterType],
//     }));
//   };
//   const handleMultiSelectChange = (name, values) => {
//     setFilters((prevFilters) => ({ ...prevFilters, [name]: values }));
//   };
//   const [tags, setTags] = useState([]);

//   useEffect(() => {
//     fetchTagData();
//   }, []);

//   const fetchTagData = async () => {
//     try {
//       const response = await fetch(`${TAGS_API}/tags/`);
//       const data = await response.json();
//       setTags(data.tags);
//     } catch (error) {
//       console.error("Error fetching tags:", error);
//     }
//   };
//   const teamMemberOptions = Array.from(new Set(accountData.flatMap((row) => row.Team.map((member) => member.username))));

//   // const uniqueTags = Array.from(new Set(accountData.flatMap((row) => row.Tags.map((tag) => ({ tagName: tag.tagName, tagColour: tag.tagColour })))), (tag) => `${tag.tagName}-${tag.tagColour}`).map((tagKey) => {
//   //   const [tagName, tagColour] = tagKey.split("-");
//   //   return { tagName, tagColour };
//   // });
//   const uniqueTags =
//     tags.length > 0
//       ? Array.from(new Set(tags.map((tag) => `${tag.tagName}-${tag.tagColour}`))).map((tagKey) => {
//           const [tagName, tagColour] = tagKey.split("-");
//           return { tagName, tagColour };
//         })
//       : [];

//   const calculateWidth = (tagName) => {
//     const baseWidth = 10; // base width for each tag
//     const charWidth = 8; // approximate width of each character
//     const padding = 10; // padding on either side
//     return baseWidth + charWidth * tagName.length + padding;
//   };
//   const handleSort = (key) => {
//     setSortConfig((prevSortConfig) => {
//       if (prevSortConfig.key === key) {
//         return { key, direction: prevSortConfig.direction === "asc" ? "desc" : "asc" };
//       }
//       return { key, direction: "asc" };
//     });
//   };

//   // const sortedData = React.useMemo(() => {
//   //   const sorted = [...filteredData];
//   //   if (sortConfig.key) {
//   //     sorted.sort((a, b) => {
//   //       if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
//   //       if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
//   //       return 0;
//   //     });
//   //   }
//   //   return sorted;
//   // }, [filteredData, sortConfig]);

//   const sortedData = React.useMemo(() => {
//     const dataToSort = filteredData; // Use filteredData for sorting
//     const sorted = [...dataToSort]; // Create a copy of filteredData

//     if (sortConfig.key) {
//       sorted.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
//         if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
//         return 0;
//       });
//     }
//     return sorted;
//   }, [filteredData, sortConfig]);
//   return (
//     <>
//       <div style={{ display: "flex", padding: "10px", marginBottom: "20px" }}>
//         <Button variant="text" onClick={handleFilterButtonClick} style={{ marginRight: "10px" }}>
//           Filter Options
//         </Button>
//         <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
//           <MenuItem
//             onClick={() => {
//               toggleFilter("accountName");
//               handleClose();
//             }}
//           >
//             Account Name
//           </MenuItem>
//           <MenuItem
//             onClick={() => {
//               toggleFilter("type");
//               handleClose();
//             }}
//           >
//             Type
//           </MenuItem>
//           <MenuItem
//             onClick={() => {
//               toggleFilter("teamMember");
//               handleClose();
//             }}
//           >
//             Team Member
//           </MenuItem>
//           <MenuItem
//             onClick={() => {
//               toggleFilter("tags");
//               handleClose();
//             }}
//           >
//             Tags
//           </MenuItem>
//         </Menu>

//         {/* Account Name Filter */}
//         {showFilters.accountName && (
//           <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
//             <TextField name="accountName" value={filters.accountName} onChange={handleFilterChange} placeholder="Filter by Account Name" variant="outlined" size="small" style={{ marginRight: "10px" }} />
//             <DeleteIcon onClick={() => clearFilter("accountName")} style={{ cursor: "pointer", color: "red" }} />
//           </div>
//         )}

//         {/* Type Filter */}
//         {showFilters.type && (
//           <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
//             <FormControl variant="outlined" size="small" style={{ marginRight: "10px", width: "150px" }}>
//               <InputLabel>Type</InputLabel>
//               <Select name="type" value={filters.type} onChange={handleFilterChange} label="Type">
//                 <MenuItem value="">All</MenuItem>
//                 <MenuItem value="Individual">Individual</MenuItem>
//                 <MenuItem value="Company">Company</MenuItem>
//               </Select>
//             </FormControl>
//             <DeleteIcon onClick={() => clearFilter("type")} style={{ cursor: "pointer", color: "red" }} />
//           </div>
//         )}
//         {/* Team Member Filter */}
//         {showFilters.teamMember && (
//           <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
//             <FormControl variant="outlined" size="small" style={{ marginRight: "10px", width: "150px" }}>
//               <InputLabel>Team Member</InputLabel>
//               <Select name="teamMember" value={filters.teamMember} onChange={handleFilterChange} label="Team Member">
//                 <MenuItem value="">All</MenuItem>
//                 {teamMemberOptions.map((member) => (
//                   <MenuItem key={member} value={member}>
//                     {member}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <DeleteIcon onClick={() => clearFilter("teamMember")} style={{ cursor: "pointer", color: "red" }} />
//           </div>
//         )}
//         {/* Tags Filter */}
//         {showFilters.tags && (
//           <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
//             <Autocomplete
//               multiple
//               options={uniqueTags}
//               value={filters.tags}
//               onChange={(e, newValue) => handleMultiSelectChange("tags", newValue)}
//               getOptionLabel={(option) => option.tagName}
//               filterSelectedOptions
//               renderOption={(props, option) => (
//                 <li
//                   {...props}
//                   style={{
//                     backgroundColor: option.tagColour,
//                     color: "#fff",
//                     padding: "2px 8px",
//                     borderRadius: "8px",
//                     textAlign: "center",
//                     marginBottom: "5px",
//                     fontSize: "10px",
//                     width: `${calculateWidth(option.tagName)}px`,
//                     marginLeft: "5px",
//                     cursor: "pointer",
//                   }}
//                 >
//                   {option.tagName}
//                 </li>
//               )}
//               // renderTags={(selected, getTagProps) =>
//               //   selected.map((option, index) => (
//               //     <Chip
//               //       key={option.tagName}
//               //       label={option.tagName}
//               //       {...getTagProps({ index })}
//               // style={{
//               //   backgroundColor: option.tagColour,
//               //   color: "#fff",
//               //   borderRadius: "8px",
//               //   fontSize: "12px",
//               //   margin: "2px",
//               // }}
//               //       deleteIcon={<RxCross2 style={{ color: "#fff", cursor: "pointer" }} />}
//               //     />
//               //   ))
//               // }
//               renderTags={(selected, getTagProps) =>
//                 selected.map((option, index) => (
//                   <Chip
//                     key={option.value}
//                     label={option.tagName}
//                     style={{
//                       backgroundColor: option.tagColour,
//                       color: "#fff",
//                       cursor: "pointer",
//                       // borderRadius: "8px",
//                       fontSize: "12px",
//                       margin: "2px",
//                     }}
//                     {...getTagProps({ index })}
//                   />
//                 ))
//               }
//               renderInput={(params) => <TextField {...params} variant="outlined" placeholder="Filter by Tags" size="small" style={{ width: "250px" }} />}
//               style={{ marginRight: "10px", width: "250px" }}
//             />
//             <DeleteIcon onClick={() => clearFilter("tags")} style={{ cursor: "pointer", color: "red" }} />
//           </div>
//         )}
//       </div>
//       <TableContainer component={Paper} style={{ width: "100%", overflowX: "auto" }}>
//         <Table style={{ tableLayout: "fixed", width: "100%" }}>
//           <TableHead>
//             <TableRow>
//               <TableCell padding="checkbox" style={{ position: "sticky", left: 0, zIndex: 1, background: "#fff" }}>
//                 <Checkbox
//                   checked={selected.length === accountData.length}
//                   onChange={() => {
//                     if (selected.length === accountData.length) {
//                       setSelected([]);
//                     } else {
//                       const allSelected = accountData.map((item) => item.id);
//                       setSelected(allSelected);
//                     }
//                   }}
//                 />
//               </TableCell>
//               <TableCell onClick={() => handleSort("Name")} style={{ cursor: "pointer", position: "sticky", left: 50, zIndex: 1, background: "#fff" }} width="200">
//                 AccountName {sortConfig.key === "Name" ? (sortConfig.direction === "asc" ? "↑" : "↓") : null}
//               </TableCell>
//               <TableCell width="200">Type</TableCell>
//               <TableCell width="200">Follow</TableCell>
//               <TableCell width="200">Team Members</TableCell>
//               <TableCell width="200">Tags</TableCell>
//               <TableCell width="200">Invoices</TableCell>
//               <TableCell width="200">Credits</TableCell>
//               <TableCell width="200">Tasks</TableCell>
//               <TableCell width="200">Proposals</TableCell>
//               <TableCell width="200">Unreadchchats</TableCell>
//               <TableCell width="200">Pending Organizers</TableCell>
//               <TableCell width="200">Pending Signatures</TableCell>
//               <TableCell width="200">Last Login</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {sortedData.map((row) => {
//               const isSelected = selected.indexOf(row.id) !== -1;
//               return (
//                 <TableRow key={row.id} hover onClick={() => handleSelect(row.id)} role="checkbox" tabIndex={-1} selected={isSelected}>
//                   <TableCell padding="checkbox" style={{ position: "sticky", left: 0, zIndex: 1, background: "#fff" }}>
//                     <Checkbox checked={isSelected} />
//                   </TableCell>
//                   <TableCell style={{ position: "sticky", left: 50, zIndex: 1, background: "#fff" }}>
//                     <Link to={`/accountsdash/overview/${row.id}`}> {row.Name}</Link>
//                   </TableCell>
//                   <TableCell>{row.Type}</TableCell>
//                   <TableCell>{row.Follow}</TableCell>
//                   <TableCell style={{ display: "flex", alignItems: "center" }}>
//                     {row.Team.map((member) => {
//                       // Generate initials from the username
//                       const initials = member.username
//                         .split(" ")
//                         .map((n) => n[0])
//                         .join("")
//                         .toUpperCase();

//                       return (
//                         <Tooltip key={member._id} title={member.username} placement="top">
//                           <span
//                             style={{
//                               display: "inline-block",
//                               backgroundColor: "#3f51b5", // Customize badge color as needed
//                               color: "#fff",
//                               borderRadius: "50%",
//                               width: "24px",
//                               height: "24px",
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                               fontSize: "12px",
//                               fontWeight: "bold",
//                               marginRight: "5px",
//                               cursor: "pointer",
//                             }}
//                           >
//                             {initials}
//                           </span>
//                         </Tooltip>
//                       );
//                     })}
//                   </TableCell>
// <TableCell>
//   {row.Tags.length > 1 ? (
//     <Tooltip
//       title={
//         <div>
//           {row.Tags.map((tag) => (
//             <div
//               key={tag._id}
//               style={{
//                 background: tag.tagColour,
//                 color: "#fff",
//                 borderRadius: "8px",
//                 padding: "2px 8px",
//                 marginBottom: "2px",
//                 fontSize: "10px",
//               }}
//             >
//               {tag.tagName}
//             </div>
//           ))}
//         </div>
//       }
//       placement="top"
//     >
//       <span
//         style={{
//           background: row.Tags[0].tagColour, // Show color of the first tag
//           color: "#fff",
//           borderRadius: "8px",
//           padding: "2px 8px",
//           fontSize: "10px",
//           cursor: "pointer",
//         }}
//       >
//         {row.Tags[0].tagName}
//       </span>
//     </Tooltip>
//   ) : (
//     row.Tags.map((tag) => (
//       <span
//         key={tag._id}
//         style={{
//           background: tag.tagColour,
//           color: "#fff",
//           borderRadius: "8px",
//           padding: "2px 8px",
//           fontSize: "10px",
//           marginLeft: "3px",
//         }}
//       >
//         {tag.tagName}
//       </span>
//     ))
//   )}
//   {row.Tags.length > 1 && <span style={{ marginLeft: "5px", fontSize: "10px", color: "#555" }}>+{row.Tags.length - 1}</span>}
// </TableCell>
//                   <TableCell>{row.Invoices}</TableCell>
//                   <TableCell>{row.Credits}</TableCell>
//                   <TableCell>{row.Tasks}</TableCell>
//                   <TableCell>{row.Proposals}</TableCell>
//                   <TableCell>{row.Unreadchats}</TableCell>
//                   <TableCell>{row.Pendingorganizers}</TableCell>
//                   <TableCell>{row.Pendingsignatures}</TableCell>
//                   <TableCell>{row.Lastlogin}</TableCell>
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </>
//   );
// };

// export default FixedColumnTable;

{
  /* <Autocomplete multiple options={uniqueTags || []} value={filters.tags || []} onChange={(e, newValue) => handleMultiSelectChange("tags", newValue)} renderInput={(params) => <TextField {...params} variant="outlined" placeholder="Filter by Tags" size="small" />} style={{ marginRight: "10px", width: "250px" }} /> */
}
{
  /* <Autocomplete
              multiple
              options={uniqueTags}
              value={filters.tags}
              onChange={(e, newValue) => handleMultiSelectChange("tags", newValue)}
              getOptionLabel={(option) => option.tagName}
              renderOption={(props, option) => (
                <li {...props} style={{ backgroundColor: option.tagColour, color: "#fff", padding: "2px 8px", borderRadius: "10px", width: `${calculateWidth(option.tagName)}px`, fontSize: "10px", color: "#fff", borderRadius: "8px", alignItems: "center", textAlign: "center", marginBottom: "5px" }}>
                  {option.tagName}
                </li>
              )}
              renderInput={(params) => <TextField {...params} variant="outlined" placeholder="Filter by Tags" size="small" style={{ width: "250px" }} />}
              style={{ marginRight: "10px", width: "250px" }}
            /> */
}
// renderTags={(selected, getTagProps) =>
//   selected.map((option, index) => (
//     <span
//       key={option.tagName}
//       style={{
//         backgroundColor: option.tagColour,
//         color: "#fff",
//         borderRadius: "10px",
//         padding: "3px",
//         margin: "2px",
//         fontSize: "12px",
//         width: `${calculateWidth(option.tagName)}px`,
//       }}
//       {...getTagProps({ index })}
//     >
//       {option.tagName}
//     </span>
//   ))
// }
// const uniqueTags = Array.from(new Set(accountData.flatMap((row) => row.Tags.map((tag) => tag.tagName))));
// const uniqueTags = Array.from(new Map(accountData.flatMap((row) => row.Tags.map((tag) => ({ tagName: tag.tagName, tagColour: tag.tagColour }))).map((tag) => [`${tag.tagName}-${tag.tagColour}`, tag])).values());
// const uniqueTags = Array.from(new Set(accountData.flatMap((row) => row.Tags.map((tag) => ({ tagName: tag.tagName, tagColour: tag.tagColour })))), (tag) => `${tag.tagName}-${tag.tagColour}`).map((tagKey) => {
//   const [tagName, tagColour] = tagKey.split("-");
//   return { tagName, tagColour };
// });
{
  /* <Autocomplete
              multiple
              options={uniqueTags || []}
              getOptionLabel={(option) => option.tagName}
              renderOption={(props, option) => (
                <li {...props} style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ background: option.tagColour, color: "#fff", padding: "2px 8px", borderRadius: "4px", marginRight: "8px" }}>{option.tagName}</span>
                </li>
              )}
              value={filters.tags || []}
              onChange={(e, newValue) =>
                handleMultiSelectChange(
                  "tags",
                  newValue.map((tag) => tag.tagName)
                )
              }
              renderInput={(params) => <TextField {...params} variant="outlined" placeholder="Filter by Tags" size="small" />}
              style={{ marginRight: "10px", width: "250px" }}
            /> */
}
{
  /* <TableBody>
          {accountData.map((row) => {
            const isSelected = selected.indexOf(row.id) !== -1; // Check if this row is selected
            return (
              <TableRow key={row.id} hover onClick={() => handleSelect(row.id)} role="checkbox" tabIndex={-1} selected={isSelected}>
                <TableCell padding="checkbox" style={{ position: "sticky", left: 0, zIndex: 1, background: "#fff" }}>
                  <Checkbox checked={isSelected} />
                </TableCell>
                <TableCell style={{ position: "sticky", left: 50, zIndex: 1, background: "#fff" }}>{row.Name}</TableCell> 
                <TableCell>{row.Type}</TableCell>
                <TableCell>{row.Follow}</TableCell>
                <TableCell>
                  {row.Team.map((member) => (
                    <div key={member._id}>{member.username}</div>
                  ))}
                </TableCell>
                <TableCell>
                  {row.Tags.map((tag) => (
                    <span key={tag._id} style={{ background: tag.tagColour, color: "#fff", borderRadius: "8px", alignItems: "center", textAlign: "center", marginLeft: "3px", marginBottom: "5px", padding: "2px 8px", fontSize: "10px" }}>
                      {tag.tagName}
                    </span>
                  ))}
                </TableCell>
                <TableCell>{row.Invoices}</TableCell>
                <TableCell>{row.Credits}</TableCell>
                <TableCell>{row.Tasks}</TableCell>
                <TableCell>{row.Proposals}</TableCell>
                <TableCell>{row.Unreadchats}</TableCell>
                <TableCell>{row.Pendingorganizers}</TableCell>
                <TableCell>{row.Pendingsignatures}</TableCell>
                <TableCell>{row.Lastlogin}</TableCell>
              </TableRow>
            );
          })}
        </TableBody> */
}

{
  /* {currentFilter && currentFilter === "accountName" && (
          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <TextField name={currentFilter} value={filters[currentFilter]} onChange={handleFilterChange} placeholder={`Filter by ${currentFilter}`} variant="outlined" size="small" style={{ marginRight: "10px" }} />
            <DeleteIcon onClick={clearFilter} style={{ cursor: "pointer", color: "red" }} />
          </div>
        )}
        {currentFilter && currentFilter === "type" && (
          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <FormControl variant="outlined" size="small" style={{ marginRight: "10px" }}>
              <InputLabel>Type</InputLabel>
              <Select name="type" value={filters.type} onChange={handleFilterChange} label="Type">
                <MuiMenuItem value="">All</MuiMenuItem>
                <MuiMenuItem value="Individual">Individual</MuiMenuItem>
                <MuiMenuItem value="Company">Company</MuiMenuItem>
              </Select>
            </FormControl>
            <DeleteIcon onClick={clearFilter} style={{ cursor: "pointer", color: "red" }} />
          </div>
        )} */
}
// const handleSelect = (id) => {
//   const currentIndex = selected.indexOf(id);
//   const newSelected = currentIndex === -1 ? [...selected, id] : selected.filter((item) => item !== id);

//   setSelected(newSelected);

//   // Log selected row data
//   const selectedData = accountData.filter((item) => newSelected.includes(item.id)); // Assuming each account has a unique `id`
//   console.log(selectedData[0].id);
// };
// // // // import React, { useEffect, useState } from 'react';
// // // // import Switch from '@mui/material/Switch';
// // // // import {FormControlLabel} from '@mui/material'
// // // // const ContactInfo = () => {
// // // //   const [contacts, setContacts] = useState([]);
// // // //   const [error, setError] = useState(null);

// // // //   useEffect(() => {
// // // //     const fetchContacts = async () => {
// // // //       try {
// // // //         const response = await fetch("http://127.0.0.1:7000/contacts/contactaccount/66dad3dbcc207e600b53ae6d", {
// // // //           method: "GET",
// // // //           redirect: "follow"
// // // //         });
// // // //         if (!response.ok) {
// // // //           throw new Error('Network response was not ok');
// // // //         }
// // // //         const result = await response.json();
// // // //         setContacts(result); // Set the response as an array of contacts
// // // //       } catch (error) {
// // // //         setError(error.message);
// // // //       }
// // // //     };

// // // //     fetchContacts();
// // // //   }, []); // Empty dependency array means this effect runs once when the component mounts

// // // //   if (error) {
// // // //     return <div>Error: {error}</div>;
// // // //   }

// // // //   if (contacts.length === 0) {
// // // //     return <div>Loading...</div>;
// // // //   }

// // // //   return (
// // // //     <div>
// // // //       <h1>Contact Information</h1>
// // // //       {/* {contacts.map((contact) => {
// // // //         const { email, contactName, login, notify, emailSync } = contact;

// // // //         return (
// // // //           <div key={contact._id} style={{ marginBottom: '20px' }}>
// // // //             <h2>Contact ID: {contact._id}</h2>
// // // //             <p><strong>Contact Name:</strong> {contactName}</p>
// // // //             <p><strong>Email:</strong> {email}</p>
// // // //             <p><strong>Login:</strong> {login ? 'true' : 'false'}</p>
// // // //             <p><strong>Notify:</strong> {notify ? 'true' : 'false'}</p>
// // // //             <p><strong>Email Sync:</strong> {emailSync ? 'true' : 'false'}</p>
// // // //           </div>
// // // //         );
// // // //       })} */}

// // // // {contacts.map((contact) => {
// // // //         const { email, contactName, login, notify, emailSync } = contact;

// // // //         return (
// // // //           <div key={contact._id} style={{ marginBottom: '20px' }}>
// // // //             <h2>Contact ID: {contact._id}</h2>
// // // //             <p><strong>Contact Name:</strong> {contactName}</p>
// // // //             <p><strong>Email:</strong> {email}</p>
// // // //             <FormControlLabel
// // // //               control={<Switch checked={login} />}
// // // //               label="Login"
// // // //             />
// // // //             <FormControlLabel
// // // //               control={<Switch checked={notify} />}
// // // //               label="Notify"
// // // //             />
// // // //             <FormControlLabel
// // // //               control={<Switch checked={emailSync} />}
// // // //               label="Email Sync"
// // // //             />
// // // //           </div>
// // // //         );
// // // //       })}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ContactInfo;

// // // import React, { useState } from 'react';
// // // import CreatableSelect from 'react-select/creatable';

// // // const options = [
// // //   { value: 'chocolate', label: 'Chocolate' },
// // //   { value: 'strawberry', label: 'Strawberry' },
// // //   { value: 'vanilla', label: 'Vanilla' }
// // // ];

// // // const MyCreatableSelect = () => {
// // //   const [selectedOption, setSelectedOption] = useState(null);

// // //   const handleChange = (newValue) => {
// // //     setSelectedOption(newValue);
// // //   };

// // //   return (
// // //     <CreatableSelect
// // //       isClearable
// // //       value={selectedOption}
// // //       onChange={handleChange}
// // //       options={options}
// // //       placeholder="Select or create an option"
// // //     />
// // //   );
// // // };

// // // export default MyCreatableSelect;

// // import React, { useState } from 'react';
// // import { Stepper, Step, StepLabel, Box, Button } from '@mui/material';

// // const MyForm = () => {
// //     const [currentStep, setCurrentStep] = useState(0); // Tracks the main steps (Email, Information, Settings)
// //     const [subStep, setSubStep] = useState(3); // Tracks sub-steps within Information (Cases 3-7)
// //     const [settingsStep, setSettingsStep] = useState(8); // Tracks sub-steps within Settings (Cases 8-9)

// //     const steps = ['Email', 'Information', 'Settings'];

// //     const renderFormFields = () => {
// //         switch (currentStep) {
// //             // Email (Case 2)
// //             case 0:
// //                 return (
// //                     <>
// //                         <div>Email Step Content (Case 2)</div>
// //                     </>
// //                 );

// //             // Information (Cases 3-7)
// //             case 1:
// //                 return (
// //                     <>
// //                         {renderInformationSteps()}
// //                     </>
// //                 );

// //             // Settings (Cases 8-9)
// //             case 2:
// //                 return (
// //                     <>
// //                         {renderSettingsSteps()}
// //                     </>
// //                 );

// //             default:
// //                 return null;
// //         }
// //     };

// //     // Information Step (Cases 3-7)
// //     const renderInformationSteps = () => {
// //         switch (subStep) {
// //             case 3:
// //                 return <div>Case 3 Content</div>;
// //             case 4:
// //                 return <div>Case 4 Content</div>;
// //             case 5:
// //                 return <div>Case 5 Content</div>;
// //             case 6:
// //                 return <div>Case 6 Content</div>;
// //             case 7:
// //                 return <div>Case 7 Content</div>;
// //             default:
// //                 return null;
// //         }
// //     };

// //     // Settings Step (Cases 8-9)
// //     const renderSettingsSteps = () => {
// //         switch (settingsStep) {
// //             case 8:
// //                 return <div>Case 8 Content</div>;
// //             case 9:
// //                 return <div>Case 9 Content</div>;
// //             default:
// //                 return null;
// //         }
// //     };

// //     const handleNext = () => {
// //         if (currentStep === 0) {
// //             // Move from Email to Information step
// //             setCurrentStep(1);
// //         } else if (currentStep === 1) {
// //             // Handle Information sub-steps (Cases 3-7)
// //             if (subStep < 7) {
// //                 setSubStep(prevSubStep => prevSubStep + 1);
// //             } else {
// //                 // If all sub-steps are completed, move to Settings
// //                 setCurrentStep(2);
// //             }
// //         } else if (currentStep === 2) {
// //             // Handle Settings sub-steps (Cases 8-9)
// //             if (settingsStep < 9) {
// //                 setSettingsStep(prevSettingsStep => prevSettingsStep + 1);
// //             } else {
// //                 // You can add finish behavior here
// //                 console.log('Form Completed!');
// //             }
// //         }
// //     };

// //     return (
// //         <Box>
// //             <Stepper activeStep={currentStep}>
// //                 {steps.map((label, index) => (
// //                     <Step key={index}>
// //                         <StepLabel>{label}</StepLabel>
// //                     </Step>
// //                 ))}
// //             </Stepper>

// //             <Box mt={4}>
// //                 {renderFormFields()}
// //             </Box>

// //             <Box mt={4}>

// //                 <Button variant="contained" onClick={handleNext}>
// //                     {currentStep === 2 && settingsStep === 9 ? 'Finish' : 'Next'}
// //                 </Button>
// //             </Box>
// //         </Box>
// //     );
// // };

// // export default MyForm;

// import React, { useState } from 'react';
// import { Stepper, Step, StepLabel, Box, Button } from '@mui/material';

// const MyForm = () => {
//     const [currentStep, setCurrentStep] = useState(0); // Tracks the main steps (Email, Information, Settings)
//     const [subStep, setSubStep] = useState(3); // Tracks sub-steps within Information (Cases 3-7)
//     const [settingsStep, setSettingsStep] = useState(8); // Tracks sub-steps within Settings (Cases 8-9)

//     const steps = ['Email', 'Information', 'Settings'];

//     const renderFormFields = () => {
//         switch (currentStep) {
//             // Email (Case 2)
//             case 0:
//                 return (
//                     <>
//                         <div>Email Step Content (Case 2)</div>
//                     </>
//                 );

//             // Information (Cases 3-7)
//             case 1:
//                 return (
//                     <>
//                         {renderInformationSteps()}
//                     </>
//                 );

//             // Settings (Cases 8-9)
//             case 2:
//                 return (
//                     <>
//                         {renderSettingsSteps()}
//                     </>
//                 );

//             default:
//                 return null;
//         }
//     };

//     // Information Step (Cases 3-7)
//     const renderInformationSteps = () => {
//         switch (subStep) {
//             case 3:
//                 return <div>Case 3 Content</div>;
//             case 4:
//                 return <div>Case 4 Content</div>;
//             case 5:
//                 return <div>Case 5 Content</div>;
//             case 6:
//                 return <div>Case 6 Content</div>;
//             case 7:
//                 return <div>Case 7 Content</div>;
//             default:
//                 return null;
//         }
//     };

//     // Settings Step (Cases 8-9)
//     const renderSettingsSteps = () => {
//         switch (settingsStep) {
//             case 8:
//                 return <div>Case 8 Content</div>;
//             case 9:
//                 return <div>Case 9 Content</div>;
//             default:
//                 return null;
//         }
//     };

//     const handleNext = () => {
//         if (currentStep === 0) {
//             // Move from Email to Information step
//             setCurrentStep(1);
//         } else if (currentStep === 1) {
//             // Handle Information sub-steps (Cases 3-7)
//             if (subStep < 7) {
//                 setSubStep(prevSubStep => prevSubStep + 1);
//             } else {
//                 // If all sub-steps are completed, move to Settings
//                 setCurrentStep(2);
//             }
//         } else if (currentStep === 2) {
//             // Handle Settings sub-steps (Cases 8-9)
//             if (settingsStep < 9) {
//                 setSettingsStep(prevSettingsStep => prevSettingsStep + 1);
//             } else {
//                 // You can add finish behavior here
//                 console.log('Form Completed!');
//             }
//         }
//     };

//     // Function to go back to the Email step (case 0)
//     const goToEmailStep = () => {
//         setCurrentStep(0); // Set the main step to Email (case 0)
//     };

//     return (
//         <Box>
//             <Stepper activeStep={currentStep}>
//                 {steps.map((label, index) => (
//                     <Step key={index}>
//                         <StepLabel>{label}</StepLabel>
//                     </Step>
//                 ))}
//             </Stepper>

//             <Box mt={4}>
//                 {renderFormFields()}
//             </Box>

//             <Box mt={4}>
//                 {/* Button to go back to Email step */}
//                 <Button variant="outlined" color="secondary" onClick={goToEmailStep} style={{ marginRight: 16 }}>
//                     Go to Email Step
//                 </Button>

//                 {/* Button for Next functionality */}
//                 <Button variant="contained" onClick={handleNext}>
//                     {currentStep === 2 && settingsStep === 9 ? 'Finish' : 'Next'}
//                 </Button>
//             </Box>
//         </Box>
//     );
// };

// export default MyForm;

// import React, { useState } from 'react';
// import { Stepper, Step, StepLabel, Box, Button } from '@mui/material';

// const MyForm = () => {
//     const [currentStep, setCurrentStep] = useState(0); // Tracks the main steps (Email, Information, Settings)
//     const [subStep, setSubStep] = useState(3); // Tracks sub-steps within Information (Cases 3-7)
//     const [settingsStep, setSettingsStep] = useState(8); // Tracks sub-steps within Settings (Cases 8-9)
//     const [showEmailContent, setShowEmailContent] = useState(false); // Tracks whether to show Email step content

//     const steps = ['Email', 'Information', 'Settings'];

//     const renderFormFields = () => {
//         switch (currentStep) {
//             // Email (Case 2)
//             case 0:
//                 return showEmailContent ? (
//                     <div>Email Step Content (Case 2)</div>
//                 ) : null;

//             // Information (Cases 3-7)
//             case 1:
//                 return (
//                     <>
//                         {renderInformationSteps()}
//                     </>
//                 );

//             // Settings (Cases 8-9)
//             case 2:
//                 return (
//                     <>
//                         {renderSettingsSteps()}
//                     </>
//                 );

//             default:
//                 return null;
//         }
//     };

//     // Information Step (Cases 3-7)
//     const renderInformationSteps = () => {
//         switch (subStep) {
//             case 3:
//                 return <div>Case 3 Content</div>;
//             case 4:
//                 return <div>Case 4 Content</div>;
//             case 5:
//                 return <div>Case 5 Content</div>;
//             case 6:
//                 return <div>Case 6 Content</div>;
//             case 7:
//                 return <div>Case 7 Content</div>;
//             default:
//                 return null;
//         }
//     };

//     // Settings Step (Cases 8-9)
//     const renderSettingsSteps = () => {
//         switch (settingsStep) {
//             case 8:
//                 return <div>Case 8 Content</div>;
//             case 9:
//                 return <div>Case 9 Content</div>;
//             default:
//                 return null;
//         }
//     };

//     const handleNext = () => {
//         if (currentStep === 0) {
//             // Move from Email to Information step
//             setCurrentStep(1);
//         } else if (currentStep === 1) {
//             // Handle Information sub-steps (Cases 3-7)
//             if (subStep < 7) {
//                 setSubStep(prevSubStep => prevSubStep + 1);
//             } else {
//                 // If all sub-steps are completed, move to Settings
//                 setCurrentStep(2);
//             }
//         } else if (currentStep === 2) {
//             // Handle Settings sub-steps (Cases 8-9)
//             if (settingsStep < 9) {
//                 setSettingsStep(prevSettingsStep => prevSettingsStep + 1);
//             } else {
//                 // You can add finish behavior here
//                 console.log('Form Completed!');
//             }
//         }
//     };

//     // Function to show Email step content
//     const goToEmailStep = () => {
//         setShowEmailContent(true); // Show the email content
//     };

//     return (
//         <Box>
//             {/* Render the Stepper only when the Email step content is shown */}
//             {showEmailContent && (
//                 <Stepper activeStep={currentStep}>
//                     {steps.map((label, index) => (
//                         <Step key={index}>
//                             <StepLabel>{label}</StepLabel>
//                         </Step>
//                     ))}
//                 </Stepper>
//             )}

//             <Box mt={4}>
//                 {/* Render form fields based on current step */}
//                 {renderFormFields()}
//             </Box>

//             <Box mt={4}>
//                 {/* Show button to go to email step initially */}
//                 {!showEmailContent && (
//                     <Button variant="outlined" color="secondary" onClick={goToEmailStep} style={{ marginRight: 16 }}>
//                         Go to Email Step
//                     </Button>
//                 )}
// {showEmailContent && (

//                 <Button variant="contained" onClick={handleNext}>
//                     {currentStep === 2 && settingsStep === 9 ? 'Finish' : 'Next'}
//                 </Button>
//               )}
//             </Box>
//         </Box>
//     );
// };

// export default MyForm;
