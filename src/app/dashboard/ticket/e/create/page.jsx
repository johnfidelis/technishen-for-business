"use client"
import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Switch,
  FormControlLabel,
  Grid,
  IconButton,
  Autocomplete,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { ThemeContext } from '@/context/ThemeContext'
import DeleteIcon from "@mui/icons-material/Delete";
import AddressAutocomplete from "../../../../../component/utils/GoogleInputAddress"
import { toast } from "react-toastify";
// import EmployeeProfile from "../../../../assets/components/EmployeeProfiles/EmployeeProfile";
// import EmployeeProfile from "../../../../assets/components/EmployeeProfiles/EmployeeProfile";
import EmployeeProfile from "@/component/modals/EmployeeProfile";


const Page = () => {
  const { theme } = useContext(ThemeContext)
  const businessId = "dfdfd"
  const [outsourced, setOutsourced] = useState(false);
  const [outsourcedData, setOutsourcedData] = useState(false);
  const clearAddressRef = useRef(null);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await axiosInstanceWithAuth.get(
  //         `/b2c/bookable-services/`
  //       );

  //       setOutsourcedData(response.data);
  //     } catch (error) {
  //       // toast.error("Error fetching categories.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  const [assignmentGroups, setAssignmentGroups] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [assignmentGroup, setAssignmentGroup] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [loadingEmployees, setLoadingEmployees] = useState(false);

  const [callerType, setCallerType] = useState("employee");
  const [userId, setUserId] = useState("");
  const [impact, setImpact] = useState("");
  const [urgency, setUrgency] = useState("");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [long, setLong] = useState(0.0);
  const [lat, setLat] = useState(0.0);
  const [caller, setCaller] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [ticketPriority, setTicketPriority] = useState("");
  const [scheduleDateAndTime, setScheduleDateAndTime] = useState("");
  const [options, setOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [callerModalOpen, setCallerModalOpen] = useState(false);
  const [assignModalOpen, setAssignToModalOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [channel, setChannel] = useState("");


  // useEffect(() => {
  //   // Fetch categories and subcategories
  //   const fetchCategories = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axiosInstanceWithAuth.get(
  //         `/ticket-category-to-book/`,
  //         {
  //           params: { business_id: businessId, caller_type: callerType },
  //         }
  //       );
  //       const fetchedCategories = response.data || [];
  //       setCategories(fetchedCategories);

  //       if (fetchedCategories.length > 0) {
  //         // Set the first category and its subcategories as default

  //         console.log({ fetchedCategories });
  //         setCategory(fetchedCategories[0].id);
  //         setSubCategories(fetchedCategories[0].sub_services || []);
  //         setSubCategory(fetchedCategories[0].sub_services?.[0]?.id || "");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching categories:", error);
  //       setCategories([]);
  //       setSubCategories([]);
  //     }
  //     setLoading(false);
  //   };
  //   if (businessId) {
  //     fetchCategories();
  //   }
  // }, [businessId, callerType]);

  // useEffect(() => {
  //   // Fetch assignment groups
  //   axiosInstanceWithAuth
  //     .get(
  //       `fulfiller-group-to-book/?business_id=${businessId}& caller_type=${callerType}`
  //     )
  //     .then((response) => {
  //       const groups = response.data;
  //       setAssignmentGroups(groups);
  //       if (groups.length > 0) {
  //         setAssignmentGroup(groups[0].id); // Set the first group as default
  //         setEmployees(groups[0].employees); // Load employees for the first group
  //       }
  //     })
  //     .catch((error) => console.error("Error fetching groups:", error))
  //     .finally(() => setLoadingGroups(false));
  // }, [businessId]);

  const handleGroupChange = (groupId) => {
    setAssignmentGroup(groupId);
    const selectedGroup = assignmentGroups.find(
      (group) => group.id === groupId
    );
    if (selectedGroup) {
      setEmployees(selectedGroup.employees || []);
    }
    setAssignTo("");
  };

  const handleEmployeeSearch = (query) => {
    setLoadingEmployees(true);
    const selectedGroup = assignmentGroups.find(
      (group) => group.id === assignmentGroup
    );
    if (!selectedGroup) return;

    // axiosInstanceWithAuth
    //   .get(`search-employees/?group_id=${assignmentGroup}&query=${query || ""}`)
    //   .then((response) => {
    //     const employeeList = response.data;
    //     if (employeeList.length === 0 && !query) {
    //       // Show random 5 employees if search is empty
    //       setEmployees(selectedGroup.employees.slice(0, 5));
    //     } else {
    //       setEmployees(employeeList);
    //     }
    //   })
    //   .catch((error) => console.error("Error fetching employees:", error))
    //   .finally(() => setLoadingEmployees(false));
  };

  const handleCategoryChange = (selectedCategoryId) => {
    setCategory(selectedCategoryId);
    const selectedCategory = categories.find(
      (cat) => cat.id === selectedCategoryId
    );
    setSubCategories(selectedCategory?.sub_services || []);
    setSubCategory(selectedCategory?.sub_services?.[0]?.id || ""); // Reset to first sub-category
  };

  // const fetchCallers = async (query) => {
  //   setLoading(true);
  //   try {
  //     const response = await axiosInstanceWithAuth.get(`/search-caller/`, {
  //       params: { query, business_id: businessId, caller_type: callerType },
  //     });
  //     setOptions(response.data || []);
  //     console.log({ response });
  //   } catch (error) {
  //     console.error("Error fetching callers:", error);
  //     setOptions([]);
  //   }
  //   setLoading(false);
  // };

  const handleInputChange = (event, value) => {
    if (value.length >= 2) {
      fetchCallers(value);
    } else {
      setOptions([]);
    }
  };

  const calculatePriority = () => {
    if (impact === "High" && urgency === "High") {
      return { level: "Very High", color: "#FF3300" }; // Very High
    }
    if (
      (impact === "High" && urgency === "Medium") ||
      (impact === "Medium" && urgency === "High")
    ) {
      return { level: "High", color: "#FF3300" }; // High
    }
    if (
      (impact === "High" && urgency === "Low") ||
      (impact === "Medium" && urgency === "Medium") ||
      (impact === "Medium" && urgency === "Low") ||
      (impact === "Low" && urgency === "High") ||
      (impact === "Low" && urgency === "Medium")
    ) {
      return { level: "Medium", color: "#CC00FF" }; // Medium
    }
    if (impact === "Low" && urgency === "Low") {
      return { level: "Low", color: "#00FF00" }; // Low
    } else {
      return { level: "", color: "black" };
    }
  };

  const priority = calculatePriority();

  const handleOutsourcedToggle = () => {
    setOutsourced(!outsourced);
    if (!outsourced) {
      setAssignmentGroup("");
      setAssignTo("");
    }
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const previewImages = files.map((file) => {
      return {
        id: URL.createObjectURL(file), // Temporary ID for preview
        file,
      };
    });
    setImages((prev) => [...prev, ...previewImages]);
  };

  const removeImage = (id) => {
    setImages((prev) => prev.filter((image) => image.id !== id));
  };

  const validateInputs = () => {
    if (!outsourced && !caller) return "Caller is required.";
    if (!businessId) return "Business ID is required.";
    if (!description) return "Description is required.";
    if (!category) return "Service category is required.";
    if (!subCategory) return "Sub-service is required.";
    if (!address) return "Address is required.";
    if (!urgency) return "Urgency level is required.";

    if (!impact) return "Impact level is required.";
    if (!outsourced && !channel) return "Contact channel is required.";
    if (!scheduleDateAndTime) return "Scheduled date and time are required.";
    return null; // No validation errors
  };

  const handleSubmit = async () => {
    const found = options.find((option) => option.id === caller);

    const validationError = validateInputs();
    if (validationError) {
      toast.error(validationError, {
        autoClose: 5000,
        hideProgressBar: true,
      });
      return;
    }

    const formData = new FormData();

    formData.append("business", businessId);
    formData.append("description", description);
    formData.append("service", category);
    formData.append("sub_service", subCategory);
    formData.append("address", address);
    formData.append("longitude", long);
    formData.append("latitude", lat);
    formData.append("urgency", urgency);
    formData.append("priority_level", priority.level);
    formData.append("impact", impact);
    formData.append("caller_type", callerType);

    formData.append("scheduled_datetime", scheduleDateAndTime);

    images.forEach((image) => {
      formData.append("images", image.file);
    });

    if (outsourced) {
      console.log({ category });
      console.log({ subCategory });
      formData.append("caller_id", caller);

      if (found) {
        const { first_name, last_name } = found;
        formData.append("caller_name", `${first_name} ${last_name}`);
      }
    } else {
      formData.append("caller_channel", channel);

      formData.append("caller", caller);
      if (assignmentGroup !== "") {
        formData.append("fulfiller_group", assignmentGroup);
      }
      if (assignTo !== "") {
        formData.append("assigned_to", assignTo.id);
      }
    }
    //

    setSubmitLoading(true);
    // axiosInstanceWithAuth
    //   // .post("/create-web-ticket/", formData, {
    //   .post(
    //     outsourced
    //       ? `b2c/business/${businessId}/create-ticket/`
    //       : "/create-web-ticket/",
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     if (response.status === 200 || response.status === 201) {
    //       console.log("Ticket created successfully:", response.data);
    //       toast.success("Ticket created successfully!", {
    //         autoClose: 5000,
    //         hideProgressBar: true,
    //       });
    //       setAssignmentGroup("");
    //       setAssignTo("");
    //       setImpact("");
    //       setUrgency("");
    //       setDescription("");
    //       setAddress(null);
    //       setCaller("");
    //       setCategory("");
    //       setSubCategory("");
    //       setTicketPriority("");
    //       setScheduleDateAndTime("");
    //       setChannel("");
    //       setImages([]);
    //       clearAddressRef.current?.();
    //     } else {
    //       console.error("Error creating ticket:", response.statusText);
    //       toast.error("Failed to create ticket. Please try again.", {
    //         autoClose: 5000,
    //         hideProgressBar: true,
    //       });
        // }
      // })
      // .catch((error) => {
      //   console.error("Error creating ticket:", error);
      //   toast.error("An error occurred while creating the ticket.", {
      //     autoClose: 5000,
      //     hideProgressBar: true,
      //   });
      // })
      // .finally(() => {
      //   setSubmitLoading(false);
      // });
  };

  const handleAddressUpdate = (parsedAddress) => {
    console.log(parsedAddress);
    setAddress(
      parsedAddress?.city +
        " " +
        parsedAddress?.state +
        " " +
        parsedAddress?.country
    );
    setLong(parsedAddress?.longitude);
    setLat(parsedAddress?.latitude);
  };

  const handleOpenCallerModal = (userId) => {
    // console.log({userId})
    setUserId(userId);
    setCallerModalOpen(true);
  };

  const handleOpenAssignToModal = (userId) => {
    console.log({ userId });
    setUserId(userId?.id);
    setAssignToModalOpen(true);
  };

  const handleClosCallereModal = () => {
    setCallerModalOpen(false);
  };

  return (
    <Box
      sx={{
        width: "98%",
        p: "2em",
        backgroundColor: "#FFFFFF",
        borderRadius: "0.625em",
        minHeight: "60vh",
        margin: "auto",
           fontFamily: "Inter, sans-serif",
      }}
    >
      <Box sx={{ mb: "2em", textAlign: "left" }}>
        <Typography
          variant="h5"
          sx={{
            color: "#000000",
            fontSize: "1.5em",
            mb: "1em",
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
          }}
        >
          Create Ticket
          <br />
          <FormControlLabel
            control={
              <Switch checked={outsourced} onChange={handleOutsourcedToggle} />
            }
            label="Outsource this Ticket"
            componentsProps={{
              typography: {
                sx: { fontSize: "0.75em" },
              },
            }}
          />
          {outsourced ? (
            <Typography
              color="error"
              sx={{ marginBottom: "20px", fontSize: "0.6em" }}
            >
              This ticket will be outsourced to Technishen Experts. This will
              result in additional costs.
            </Typography>
          ) : (
            <Typography
              color="error"
              sx={{ marginBottom: "20px", fontSize: "0.6em" }}
            >
              Toggle this ticket to outsource them to Technishen Experts.
            </Typography>
          )}
        </Typography>
        <hr />
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} gap={2}>
      
          
   

          <TextField
            label="Caller Type"
            select
            fullWidth
            variant="outlined"
            InputLabelProps={{
              style: {
                fontSize: "0.80em",
                   fontFamily: "Inter, sans-serif",
              },
            }}
            value={callerType}
            onChange={(e) => setCallerType(e.target.value)}
          >
            <MenuItem value="employee">Employee</MenuItem>
            <MenuItem value="customer">Customer</MenuItem>
          </TextField>

          <Autocomplete
            freeSolo
            options={options}
            getOptionLabel={(option) =>
              option.first_name + " " + option.last_name || ""
            }
            loading={loading}
            noOptionsText="No caller found"
            onInputChange={handleInputChange}
            onChange={(event, newValue) => setCaller(newValue?.id || "")}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Caller"
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  style: {
                    fontSize: "0.80em",
                       fontFamily: "Inter, sans-serif",
                  },
                }}
                style={{
                  marginTop: "1em",
                }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}

                      <InputAdornment position="end">
                        {caller == "" ? null : (
                          <VisibilityIcon
                            style={{ cursor: "pointer" }}
                            onClick={() => handleOpenCallerModal(caller)}
                          />
                        )}
                      </InputAdornment>
                    </>
                  ),
                }}
              />
            )}
          />

          <Box
            style={{
              marginTop: "1em",
            }}
          >
            <TextField
              label="Category"
              select
              fullWidth
              variant="outlined"
              InputLabelProps={{
                style: {
                  fontSize: "0.80em",
                     fontFamily: "Inter, sans-serif",
                },
              }}
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              {outsourced
                ? outsourcedData.map((cat, index) => (
                    <MenuItem key={index} value={cat.id}>
                      {cat.service_name}
                    </MenuItem>
                  ))
                : categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.service_name}
                    </MenuItem>
                  ))}
            </TextField>
          </Box>
          <TextField
            label="Sub-Category"
            select
            fullWidth
            variant="outlined"
            style={{
              marginTop: "0.7em",
            }}
            InputLabelProps={{
              style: {
                fontSize: "0.80em",
                   fontFamily: "Inter, sans-serif",
              },
            }}
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            {outsourced ? (
              outsourcedData
                .find((cat) => cat.id === category)
                ?.associated_sub_services?.map((sub) => (
                  <MenuItem key={sub.id} value={sub.id}>
                    {sub.sub_service_name} - ${parseFloat(sub.cost).toFixed(2)}
                  </MenuItem>
                ))
            ) : subCategories.length > 0 ? (
              subCategories.map((sub) => (
                <MenuItem key={sub.id} value={sub.id}>
                  {sub.sub_service_name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No subcategories available</MenuItem>
            )}
          </TextField>

          <TextField
            label="Contact Channel"
            select
            InputLabelProps={{
              style: {
                fontSize: "0.80em",
                   fontFamily: "Inter, sans-serif",
              },
            }}
            fullWidth
            variant="outlined"
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
            style={{
              display: outsourced !== true ? "block" : "none",
              marginTop: "1em",
            }}
          >
            <MenuItem value="Phone">Phone</MenuItem>
            <MenuItem value="Email">Email</MenuItem>
            <MenuItem value="Walk-In">Walk-In</MenuItem>
          </TextField>

          <Box
            style={{
              marginTop: "1em",
            }}
          >
            <AddressAutocomplete
              label="Address"
              fullWidth
              componentRestrictions={{ country: "za" }}
              InputLabelProps={{
                style: {
                  fontSize: "0.80em",
                     fontFamily: "Inter, sans-serif",
                },
              }}
              variant="outlined"
              value={address}
              handleAddressUpdate={handleAddressUpdate}
              clearInput={clearAddressRef}
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Impact"
            select
            fullWidth
            variant="outlined"
            InputLabelProps={{
              style: {
                fontSize: "0.80em",
                   fontFamily: "Inter, sans-serif",
              },
            }}
            value={impact}
            onChange={(e) => setImpact(e.target.value)}
          >
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </TextField>

          <TextField
            label="Urgency"
            select
            fullWidth
            InputLabelProps={{
              style: {
                fontSize: "0.80em",
                   fontFamily: "Inter, sans-serif",
              },
            }}
            variant="outlined"
            value={urgency}
            style={{
              marginTop: "1em",
            }}
            onChange={(e) => setUrgency(e.target.value)}
          >
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </TextField>

          <TextField
            fullWidth
            variant="outlined"
            style={{
              marginTop: "1em",
            }}
            InputProps={{
              style: {
                backgroundColor: "#E7EBF0",
                color: priority.color,
                fontSize: "0.80em",
                   fontFamily: "Inter, sans-serif",
              },
            }}
            value={`Priority Level = ${priority.level}`}
            onChange={(e) => setTicketPriority(priority.level)}
          />

          <TextField
            label="Assignment group"
            select
            fullWidth
            variant="outlined"
            value={assignmentGroup}
            onChange={(e) => handleGroupChange(e.target.value)}
            InputLabelProps={{
              style: {
                fontSize: "0.80em",
                   fontFamily: "Inter, sans-serif",
              },
            }}
            style={{
              display: outsourced !== true ? "block" : "none",
              marginTop: "1em",
            }}
          >
            {loadingGroups ? (
              <MenuItem disabled>
                <CircularProgress size={20} />
              </MenuItem>
            ) : assignmentGroups.length > 0 ? (
              assignmentGroups.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.group_name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No groups available</MenuItem>
            )}
          </TextField>

          <Autocomplete
            freeSolo
            options={employees}
            getOptionLabel={(option) =>
              `${option.first_name} ${option.last_name}` || ""
            }
            loading={loadingEmployees}
            noOptionsText="No employee found"
            onInputChange={(event, value) => {
              if (value) {
                handleEmployeeSearch(value);
              }
            }}
            onChange={(event, newValue) => setAssignTo(newValue || "")}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Assign to"
                fullWidth
                style={{
                  display: outsourced !== true ? "block" : "none",
                  marginTop: "1em",
                }}
                variant="outlined"
                InputLabelProps={{
                  style: {
                    fontSize: "0.80em",
                       fontFamily: "Inter, sans-serif",
                  },
                }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loadingEmployees ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                      <InputAdornment position="end">
                        {assignTo === "" ? null : (
                          <VisibilityIcon
                            style={{ cursor: "pointer" }}
                            onClick={() => handleOpenAssignToModal(assignTo)}
                          />
                        )}
                      </InputAdornment>
                    </>
                  ),
                }}
              />
            )}
          />

          <TextField
            label="Support Type"
            select
            InputLabelProps={{
              style: {
                fontSize: "0.80em",
                   fontFamily: "Inter, sans-serif",
              },
            }}
            fullWidth
            variant="outlined"
            style={{
              display: outsourced == true ? "block" : "none",
              marginTop: "1em",
            }}
            // value={channel}
            onChange={(e) => setChannel(e.target.value)}
          >
            <MenuItem value="Onsite Support">Onsite Support</MenuItem>
            <MenuItem value="Remote Support">Remote Support</MenuItem>
          </TextField>

          <TextField
            label="Ticket Date and Time"
            fullWidth
            style={{
              marginTop: "1em",
            }}
            InputLabelProps={{
              style: {
                fontSize: "0.80em",
                   fontFamily: "Inter, sans-serif",
              },
            }}
            variant="outlined"
            type="datetime-local"
            value={scheduleDateAndTime || " "}
            onChange={(e) => setScheduleDateAndTime(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Description of Ticket"
            multiline
            rows={4}
            fullWidth
            InputLabelProps={{
              style: {
                fontSize: "0.80em",
                   fontFamily: "Inter, sans-serif",
              },
            }}
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
                 fontFamily: "Inter, sans-serif",
              fontWeight: 500,
            }}
          >
            Upload Images
          </Typography>
          <Button variant="outlined" component="label" sx={{ mb: 2 }}>
            Choose Files
            <input
              type="file"
              hidden
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
          </Button>

          <Grid container spacing={2}>
            {images.map((image) => (
              <Grid item key={image.id} xs={12} sm={3} md={2}>
                <Box
                  sx={{
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  <img
                    src={image.id}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <IconButton
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                    }}
                    onClick={() => removeImage(image.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.primary_color ,
                color: "#FFFFFF",
                fontWeight: "bold",
                padding: "0.625rem 1.25em",
                fontSize: "0.80em",
                   fontFamily: "Inter, sans-serif",
              }}
              disabled={submitLoading}
              onClick={handleSubmit}
            >
              {submitLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "CREATE TICKET"
              )}
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {callerType === "customer" ? (
        // <EmployeeProfile
        <EmployeeProfile
          open={callerModalOpen}
          onClose={() => setCallerModalOpen(false)}
          user={caller}
          type={"customer"}
        />
      ) : (
        <EmployeeProfile
          open={callerModalOpen}
          onClose={() => setCallerModalOpen(false)}
          user={userId}
          type={"employee"}
        />
      )}
      <EmployeeProfile
        open={assignModalOpen}
        onClose={() => setAssignToModalOpen(false)}
        user={userId}
        type={"employee"}
      />
    </Box>
  );
};

export default Page;
