
// Login modal
// Login modal
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {useSelector, useDispatch} from "react-redux";
import {loginLoading, loginSuccess, loginError} from "../redux/action.js";


import Pagination from '@mui/material/Pagination';



//layout 

import PropTypes from 'prop-types';

import {Link} from "react-router-dom";





//Navbar code

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";



import axios from "axios";
import {useState, useEffect} from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

{
  /* <Navbar code end */
}




//




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



// layoutof file



function Item(props) {
    const { sx, ...other } = props;
    return (
      <Box
        sx={{
          p: 1,
          m: 1,
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
          color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          ...sx,
        }}
        {...other}
      />
    );
  }
  
  Item.propTypes = {
    sx: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
      ),
      PropTypes.func,
      PropTypes.object,
    ]),
  };

const MainPage = () => {

  const dispatch = useDispatch();
  // navbar code start

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to = "/profile">
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      </Link>
      <Link to = "/account">
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Link>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  //   navbar code end
  const [totalPage, setTotalPage] = useState(2)

      const [album, setAlbum] = useState([]);
      const [searchItem, setSearchItem] = useState("");
      const [genre, setGenre] = useState([]);

      const [page, setPage] = useState(1);
      const handlePageChange = async (event, value) => {
        setPage(value);
        const {data} = await axios.get(`http://localhost:2233/album/pagination?size=3&page=${page}`)

        // console.log(data);
        setAlbum(data.album);
      }

      const fetchData = async () => {
          const {data} = await axios.get("http://localhost:2233/album");
        //   console.log(data);
        // setAlbum(data.album);
        let c = {};
        data.album.map((e) => {
            // if(!(genre.includes(e.genre))) {
            //     setGenre([...genre, e.genre])
            // }
            if(!(e.genre in c)) {
              c[e.genre] = 1;
            }
            
        })
        // console.log(c);
        var f = [];
        for (let x in c) {
          f.push(x);
        }
        setGenre([...genre, ...f])
        const d = await axios.get(`http://localhost:2233/album/pagination?size=3&page=${page}`)

        setAlbum(d.data.album);
        console.log(d);
        setTotalPage(d.data.totalPage)


      }
      
      // const pageChange = async () => {

      // }

      useEffect(async () => {
       
        const d = await axios.get(`http://localhost:2233/album/pagination?size=3&page=${page}`)

        setAlbum(d.data.album);
      }, [page])
      // console.log(album);


    //   console.log(genre);


      const handleChange = (e) => {
        setSearchItem(e.target.value);
        

      }
      const [selectGen, setSelectGen] = useState("all")

      const handleGenre = async (e) => {
        if(e === "all") {
          const {data} = await axios.get(`http://localhost:2233/album/pagination?size=3&page=${page}`);
          setAlbum(data.album);
        } else {
          const {data} = await axios.get(`http://localhost:2233/album/find/${e}?size=3&page=${page}`);

            setAlbum(data.album);
        setTotalPage(data.totalPage)

        }
        setSelectGen(e);
        
            // console.log(e); 
            // console.log(data);
      }
      console.log(selectGen);
     
      const handleYearASC = async () => {
        // if(selectGen == "all") {

        // }
        const {data} = await axios.get(`http://localhost:2233/album/asc/data/find?gen=${selectGen}&size=3&page=${page}`);
        setAlbum(data.album);
        setTotalPage(data.totalPage)

        // console.log(album);
      }

      const handleYearDESC = async () => {
        const {data} = await axios.get(`http://localhost:2233/album/desc/data/find?gen=${selectGen}&size=3&page=${page}`);
        setAlbum(data.album);
        setTotalPage(data.totalPage)

        // console.log(data)
      }
      
    //   console.log(album); 

      useEffect(() => {
        fetchData();
      }, [])
      useEffect( () => {
        let timer = setTimeout(async () => {
            const {data} = await axios.get(`http://localhost:2233/album/${searchItem}?size=3&page=${page}`)
            setAlbum(data.album);
            setTotalPage(data.totalPage)


        }, 100)
        if(searchItem === "") {
        clearTimeout(timer)

        }
      }, [searchItem])

    //   console.log(album);





    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [formdata, setFormData] = useState({email: "", password : ""})

      const handleFormChange = (e) => {
        const {name, value}  = e.target;

        setFormData({...formdata, [name] : value})
      }
      // console.log(formdata);


      
      const {isAuth, token, loading} = useSelector((store) => store.auth); 

      console.log(isAuth, token, loading);



      // console.log(token);
      console.log(genre);


      const [opena, setOpena] = useState(false);
      const handleOpena = () => {
        handleClose();
        setOpena(true)
        
      };
      const handleClosea = () => setOpena(false);

      const [registerData, setRegisterData] = useState({name : "", email : "", password : ""})

      const handleRegister = (e) => {
        const {name, value} = e.target;

        setRegisterData({...registerData, [name] : value})
      }

      const registerUser = async () => {
        const {data} = await axios.post("http://localhost:2233/register", registerData);
        console.log(data); 
      }






  return (
    <>
    {/* <Button >Open modal</Button> */}

    
    <Modal
        open={opena}
        onClose={handleClosea}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Register here
          </Typography>
          <div>
            <label>Name</label><br />
            <input onChange = {(e) => handleRegister(e)} type  = "text" name = "name" value = {registerData.name} placeholder = "Enter the name" /><br /><hr />
            <label>Email: </label><br />
            <input onChange = {(e) => handleRegister(e)} type = "text" name = "email" value = {registerData.email} placeholder = "Enter the email" /><br /><hr />
            <label>Password</label><br />
            <input onChange = {(e) => handleRegister(e)} type = "text" name = "password" value = {registerData.password} placeholder = "Enter the email" /> <br /> <hr />
            <Button onClick = {registerUser} variant = "contained">Register</Button>
          </div>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           
          </Typography> */}
        </Box>
      </Modal>





    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Login Here
          </Typography>
          <div>
            <label>Email:       </label><br />
            <input style = {{width: "300px", height: "35px"}} onChange = {(e) => handleFormChange(e)}type = "text" name = "email" value = {formdata.email} placeholder = "Enter the email" />
            <br /><hr />
            <label>Password:      </label><br />
            <input style = {{width: "300px", height: "35px"}} onChange = {(e) => handleFormChange(e)}type = "text" name = "password" value = {formdata.password} placeholder = "Enter the password" />
            <br /><hr />
            <Button onClick = {async () => {
              dispatch(loginLoading());
              const {data} = await axios.post("http://localhost:2233/login", formdata);
              // console.log(data.user);
              dispatch(loginSuccess(data))
              console.log(data);
              

            }}>Login</Button>
            
          </div>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button onClick = {handleOpena} variant = "contained">
            Create a new Account
            </Button>
           
          </Typography>
        </Box>
      </Modal>
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Link style = {{textDecoration: "none"}} to = "/">
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                MUSIC
              </Typography>
              </Link>
              <Search>
                <SearchIconWrapper >
                  <SearchIcon sx = {{cursor: "pointer"}} />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  onChange = {(e) => {
                      handleChange(e);
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <Badge badgeContent={4} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>

                
                  {
                    isAuth ? (
                      <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                      <AccountCircle />
                      </IconButton>
                    ) : (
                      <Button onClick={handleOpen} variant = "contained">LOGIN</Button>
                    )
                  }
                  
                
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
        </Box>
      </div>
      <div style={{ width: '100%' }}>
      <Box
        sx={{ display: 'flex', p: 1, bgcolor: 'background.paper', borderRadius: 1 }}
      >
        <Item sx={{ flexGrow: 2 }}>
            <div style = {{textAlign: "center"}}>
            All Album will be here
            </div>
            
            <Box sx={{ display: 'grid', bgcolor: "white", gridTemplateColumns: 'repeat(3, 1fr)' }}>
               
               
               {
                   album.map((e, i) => (
                       <Link style = {{textDecoration: "none"}} to = {`/album/${e._id}`}>
                        <Item sx = {{cursor: "pointer"}} >
                            <div>
                                <img style = {{width: "100%", height: "200px"}} src = {e.cover_photo} alt = "cover" />
                            </div>
                            
                            <Box sx = {{display: "flex",flexWrap: 'wrap',
                                    alignContent: 'flex-start'}}>
                                <Item sx = {{border : "0px"}}><span style = {{color: "blue"}}>Album: </span>{e.name}</Item>
                                <Item sx = {{border: "0px"}}><span style = {{color: "blue"}}>Year: </span>{e.year}</Item>
                                <Item sx = {{border: "0px"}}> <span style = {{color: "blue"}}>Artist: </span>{e.artist}</Item>
                                <Item sx = {{border: "0px"}}><span style = {{color: "blue"}}>Genre: </span>{e.genre}</Item>
                                <Item sx = {{border: "0px"}}><span style = {{color: "red"}}>Total Songs:  </span>{e.songs.length}</Item>
                            </Box>
                        </Item>
                       </Link>
                   ))
               }
               
               {/* <Item>1</Item> 
                <Item>2</Item>
                <Item>3</Item>
                <Item>3</Item> */}

            </Box>
        </Item>
        <Item sx={{ flexGrow: 1 }}>
            <div>
                <div>Sort by year</div>
                <button onClick = {handleYearASC}>Ascending</button>
                <button onClick = {handleYearDESC}>Descending</button>
                
            </div>
            <div>
            <div>Filter by genre:</div>
            <div>
                <select onChange = {(a) => {
                    handleGenre(a.target.value);
                    
                }} >
                  <option value = "all">All</option>
                    {
                        genre.map((b) => (
                            <option  value = {b}>{b}</option>
                        ))

                        
                    }
                    {/* <option>rap</option>
                    <option>Melody</option> */}
                </select>
            </div>
            </div>
        </Item>
        
      </Box>
      <div><Pagination count={totalPage} page = {page} onChange = {handlePageChange}color="primary" /></div>
    </div>
    </>
  );
};

export { MainPage };
