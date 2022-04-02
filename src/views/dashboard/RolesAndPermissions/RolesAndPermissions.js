import React, {  useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGroups,getPermissiosns,createGroup,assignPermissionToGroup,deleteGroup } from "src/actions/AdminActions";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Paper,Switch,FormGroup,FormControlLabel,TextField,Typography,Select,MenuItem,InputLabel,FormControl,Alert } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';



  
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

  
const RoleAndPermissions = () => {

  const groups = useSelector((state) => state.Groups.groups);
  const permissions = useSelector((state) => state.Permissions.permissions);
  const dummyPermission = []
  const [groupName,setGroupName] = useState('');
  const [permissionsList,setPermissionsList] = useState([]);
  const [removePermissionsList,setRemovePermisionsList] = useState([]);
  const [errorMessage, setErrorMessage]= useState('');
  const [boolErrorMessage, setBoolErrorMessage]= useState(false);
  const [count, setCount] = useState(0);

  const [groupDelete, setGroupDelete] = useState('');

  const handleDeleteChange = (event) => {
    setGroupDelete(event.target.value);
  };

  const clickAlertClose = () =>{
    setBoolErrorMessage(false)
  }

  const clickDeleteGroup = () =>{
    if(groupDelete === ''){
      setBoolErrorMessage(true)
    }
    else{
      setBoolErrorMessage(false)
      const data ={id:groupDelete}
      dispatch(deleteGroup(data))
    }
    
  }
 
  const dispatch = useDispatch();
  
  const [value, setValue] = useState(0);

  const groupNameChange = (value)=>{
    setGroupName(value)
    setErrorMessage('')
  }

  const clearGroupName = () =>{
    setGroupName('')
    setErrorMessage('')
  }

  const handlePermissionsChange = (id,value,index) =>{
    if(groups[index].permissions.includes(id)){
      setRemovePermisionsList(arr => [...arr, value])
    }
    
    if(permissionsList.includes(value)){
      setPermissionsList( arr => arr.filter(item=>item !== value))
    }
    if(!permissionsList.includes(value)){
      setPermissionsList( arr => [...arr, value])
    }
  }
 
  const postPermissions = (id) =>{    
    const data = {"id" : id, "permissions" : permissionsList,"remove_permissions": removePermissionsList}
    dispatch(assignPermissionToGroup(data))
    
  }

  const createGroupSubmit = () =>{
      if(groupName === ''){
        setErrorMessage("Name Cant Be Empty")
      }
      else{
        const data={"name":groupName}
        dispatch(createGroup(data))       
        setCount(count + 1) 
      }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const selectGroups = groups && groups.map((group)=>{
    return (
      
      <MenuItem value={group.id}>{group.name}</MenuItem>
      
    )
  })

  const displayGroups= groups && groups.map((group,index)=>{    
      return (            
          <Tab label={group.name} {...a11yProps(index)} />        
      )
    })
  
    const displayGroupPermissions = groups && groups.map((group,number)=>{
      return(
        
            <TabPanel value={value} index={number} >
              <Box sx={{ mb: 1, mr:1 , display:'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" endIcon={<CheckIcon />} sx={{  mr:1 }} onClick={e=>postPermissions(group.id)}>
                  Apply
                </Button>  
              </Box>

              <Paper sx={{ width: 850 }} style={{maxHeight: 430, overflow: 'auto'}}>
              <div className="container row">
                {
                  permissions.map((permission)=>{
                    return(
                      
                      <div className="col-lg-4 ">
                      {                       
                        
                        group.permissions.includes(permission.id) 
                        ? 
                        <FormGroup>
                          <FormControlLabel control={<Switch defaultChecked onChange={e=>handlePermissionsChange(permission.id,permission.codename,number)} />} label={permission.name } />
                        </FormGroup>
                        
                        : 
                        <FormGroup>
                          <FormControlLabel control={<Switch onChange={e=>handlePermissionsChange(permission.id,permission.codename,number)} />} label={permission.name } />
                        </FormGroup>
                      }
                      
                      </div>
                    )
                  })
                }
                
              </div>
              </Paper>
            </TabPanel>            
      )
      })
  
  useEffect(() => {
    dispatch(getGroups());
    dispatch(getPermissiosns());
  }, [count]);

  return (
    <div>
      { boolErrorMessage ? 
      <div className="d-flex justify-content-end">
          <div class="alert alert-danger alert-dismissible fade show position-absolute" role="alert">
          Can't Delete, Group Hasn't been selected.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={clickAlertClose}></button>
        </div>
      </div>

      : ''}
      <div className="d-flex justify-content-start " >
      <button type="button" className="btn btn-primary mb-2" style={{height:'40px'}} data-bs-toggle="modal" data-bs-target="#exampleModal" >
        Add New
      </button>
    <FormControl fullWidth={true} size={'small'} sx={{ width: 300 ,ml:2 ,}} >
      <InputLabel id="demo-simple-select-label">Select Group To Delete</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={groupDelete}
          label="Age"
          onChange={handleDeleteChange}
        >
         
          {selectGroups}
        </Select>
        <p className="text-danger">*This will delete all permission whtin in group</p>
        
      </FormControl>
      <button type="button" className="btn btn-danger mb-2 btn-sm ml-2" onClick={clickDeleteGroup} style={{height:'40px'}}>
         Delete Selected Group
      </button>
      
      </div>
      
      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add New Role</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Add new Roles without Permissions.
              <div>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                required
                id="outlined-required"
                label="Group Name"
                onChange={e=>groupNameChange(e.target.value)}
                value={groupName}
              />
              <Typography variant="body2" className="text-danger">
                {errorMessage}
              </Typography>

              </Box>
              
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={e=>clearGroupName()}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={e=>createGroupSubmit()}>Apply</button>
            </div>
          </div>
        </div>
      </div>

      <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 500 }}
      >
       
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        
        {displayGroups}
      </Tabs>      

      {displayGroupPermissions}
    </Box>
      
    </div>
  );
};

export default RoleAndPermissions;
