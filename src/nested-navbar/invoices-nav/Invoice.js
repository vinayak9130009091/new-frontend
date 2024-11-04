import React, { useEffect, useState } from "react";
import { Checkbox, Autocomplete, Switch, FormControlLabel, Box, Button, Drawer, Typography, Chip, IconButton, Divider, Select, MenuItem, InputLabel, TextField, FormControl, FormLabel, InputAdornment, Popover, ListItem, List, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { CiMenuKebab } from "react-icons/ci";
import { toast } from "react-toastify";
import { useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import CreateInvoice from "../invoices-nav/CreateInvoice";
import UpdateInvoice from "../invoices-nav/UpdateInvoice";

const Invoice = () => {
  const navigate = useNavigate();
  const INVOICES_API = process.env.REACT_APP_INVOICES_URL;
  const [showInvoiceTemplateForm, setShowInvoiceTemplateForm] = useState(false);
  const [showInvoiceUpdateForm, setShowInvoiceUpdateForm] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [tempIdget, setTempIdGet] = useState("");
  const [accountInvoicesData, setAccountInvoicesData] = useState([]);
  const { data } = useParams();
  console.log(data);

  useEffect(() => {
    fetchInvoices(data);
  }, []);

  const fetchInvoices = async (data) => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(`${INVOICES_API}/workflow/invoices/invoice/invoicelistby/accountid/${data}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setAccountInvoicesData(result.invoice);
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error("Error fetching email templates:", error);
    }
  };

  console.log(accountInvoicesData);

  const toggleMenu = (_id) => {
    setOpenMenuId(openMenuId === _id ? null : _id);
    setTempIdGet(_id);
  };

  const handleDelete = (_id) => {
    // Show a confirmation prompt
    const isConfirmed = window.confirm("Are you sure you want to delete this organizer template?");

    // Proceed with deletion if confirmed
    if (isConfirmed) {
      const requestOptions = {
        method: "DELETE",
        redirect: "follow",
      };
      const url = `${INVOICES_API}/workflow/invoices/invoice/`;
      fetch(url + _id, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete item");
          }
          return response.text();
        })
        .then((result) => {
          console.log(result);
          toast.success("Item deleted successfully");
          fetchInvoices(data);
          // setshowOrganizerTemplateForm(false);
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to delete item");
        });
    }
  };

  //***********Invoice Create */

  const handleCreateInvoiceClick = () => {
    setShowInvoiceTemplateForm(true);
  };

  const handleClose = () => {
    setShowInvoiceTemplateForm(false);
    fetchInvoices(data);
  };

  const handleInvoiceUpdateClose = () => {
    setShowInvoiceUpdateForm(false);
    fetchInvoices(data);
  };

  const [invoiceId, SetInvoiceId] = useState();
  const handleEdit = (_id) => {
    setShowInvoiceUpdateForm(true);
    SetInvoiceId(_id);
    // navigate("/" + _id);
  };
  console.log(invoiceId);

  const handleDuplicate = async (_id) => {
    // Find the template by its ID
    const InvoiceToDuplicate = accountInvoicesData.find((template) => template._id === _id);
    if (!InvoiceToDuplicate) {
      toast.error("Invocie not found");
      return;
    }
    // Create a new template object (with new ID and modified template name)
    const duplicatedInvoice = {
      ...InvoiceToDuplicate,
      invoicenumber: `${InvoiceToDuplicate.invoicenumber} (Copy)`, // Indicate it's a duplicate
    };
    console.log(duplicatedInvoice);
    try {
      // Prepare request options
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify(duplicatedInvoice);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      // Send the duplicated template to the server
      const response = await fetch(`${INVOICES_API}/workflow/invoices/invoice`, requestOptions);
      const result = await response.json();
      console.log(result);
      if (result.message === "Invoice created successfully") {
        toast.success("Invoice duplicated successfully");
        fetchInvoices(data); // Refresh the list after duplication
      } else {
        toast.error(result.error || "Failed to duplicate Invoice");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error duplicating template");
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Button variant="contained" onClick={handleCreateInvoiceClick} sx={{ mb: 3 }}>
        New Invoice
      </Button>
      <Paper>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Invoice #</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell>
                <strong>Posted</strong>
              </TableCell>
              <TableCell>
                <strong>Total</strong>
              </TableCell>
              <TableCell>
                <strong>Amount P...</strong>
              </TableCell>
              <TableCell>
                <strong>Balance D...</strong>
              </TableCell>
              <TableCell>
                <strong>Last PAI..</strong>
              </TableCell>
              <TableCell>
                <strong>Description</strong>
              </TableCell>
              <TableCell>
                <strong>Locked D...</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accountInvoicesData.map((row) => (
              <TableRow key={row._id}>
                <TableCell>
                  <Typography sx={{ color: "#2c59fa", cursor: "pointer", fontWeight: "bold" }} onClick={() => handleEdit(row._id)}>
                    {row.invoicenumber}
                  </Typography>
                </TableCell>
                <TableCell></TableCell>
                <TableCell>{row.createdAt}</TableCell>
                <TableCell>${row.summary.total}</TableCell>
                <TableCell>${}</TableCell> {/* Show the number of sections */}
                <TableCell>${row.summary.total} </TableCell>
                <TableCell> </TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell sx={{ textAlign: "end" }}>
                  <IconButton onClick={() => toggleMenu(row._id)} style={{ color: "#2c59fa" }}>
                    <CiMenuKebab style={{ fontSize: "25px" }} />
                    {openMenuId === row._id && (
                      <Box
                        sx={{
                          position: "absolute",
                          zIndex: 1,
                          backgroundColor: "#fff",
                          boxShadow: 1,
                          borderRadius: 1,
                          p: 1,
                          // left:0,
                          right: "30px",
                          m: 2,
                          top: "10px",
                          width: "150px",
                          textAlign: "start",
                        }}
                      >
                        <Typography sx={{ fontSize: "12px", fontWeight: "bold" }} onClick={() => handleEdit(row._id)}>
                          Edit
                        </Typography>

                        <Typography sx={{ fontSize: "12px", fontWeight: "bold" }} onClick={() => handleDuplicate(row._id)}>
                          Duplicate
                        </Typography>

                        <Typography sx={{ fontSize: "12px", color: "red", fontWeight: "bold" }} onClick={() => handleDelete(row._id)}>
                          Delete
                        </Typography>
                      </Box>
                    )}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Drawer
        anchor="right"
        open={showInvoiceTemplateForm}
        onClose={handleClose}
        classes={{ paper: "custom-right-drawer" }}
        PaperProps={{
          sx: {
            width: "60%",
            // padding: 2,
          },
        }}
      >
        <CreateInvoice onClose={handleClose} />
      </Drawer>

      <Drawer
        anchor="right"
        open={showInvoiceUpdateForm}
        onClose={handleInvoiceUpdateClose}
        selectedInvoice={handleEdit}
        classes={{ paper: "custom-right-drawer" }}
        PaperProps={{
          sx: {
            width: "60%",
            // padding: 2,
          },
        }}
      >
        <UpdateInvoice onClose={handleInvoiceUpdateClose} invoiceData={invoiceId} />
      </Drawer>
    </Box>
  );
};

export default Invoice;
