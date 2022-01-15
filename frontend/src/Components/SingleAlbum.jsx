







//layout 

import PropTypes from 'prop-types';

import {Link, useParams} from "react-router-dom";





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

const Album = () => {
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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
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
      const [loading, setLoading] = useState(true);
      const [album, setAlbum] = useState([]);
      const [searchItem, setSearchItem] = useState("");
      const [songs, setSongs] = useState({}); 
      const [show, setShow] = useState(false);

      const {albumSongs} = useParams();
    //   console.log(albumSongs);


      const fetchData = async () => {
          const {data} = await axios.get("http://localhost:2233/album");
        //   console.log(data);
        setAlbum(data.album);


        data.album.map((e) => {
            if(e._id == albumSongs) {
                setSongs(e)
            }
        })
        setLoading(false);
      }

    //   console.log(songs)

      const handleChange = (e) => {
        setSearchItem(e.target.value);
        

      }
     
      

      useEffect(() => {
        fetchData();
      }, [])
      useEffect( () => {
        let timer = setTimeout(async () => {
            const {data} = await axios.get(`http://localhost:2233/album/${searchItem}`)
            setAlbum(data.album);

        }, 100)
        if(searchItem === "") {
        clearTimeout(timer)


        }
        if(searchItem !== "") {
            setShow(true);
        }
      }, [searchItem])

    //   console.log(album);



    if(loading) {
        return (
            <div>Loading...</div>
        )
    }


  return (
    <>
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
              <Link to = "/">
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block", cursor : "pointer" } }}
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
        <Box sx={{ display: 'grid', bgcolor: "white", gridTemplateColumns: '1fr 1.5fr' }}>
        <Item sx = {{cursor: "pointer"}} >
                            <div>
                                <img style = {{width: "100%", height: "200px"}} src = {songs.cover_photo} alt = "cover" />
                            </div>
                            
                            
                        </Item>
                        <Item>
                        <Box sx = {{display: "flex",flexWrap: 'wrap',
                                    alignContent: 'flex-start'}}>
                                <Item sx = {{border : "0px"}}><span style = {{color: "blue"}}>Album: </span>{songs.name}</Item>
                                <Item sx = {{border: "0px"}}><span style = {{color: "blue"}}>Year: </span>{songs.year}</Item>
                                <Item sx = {{border: "0px"}}> <span style = {{color: "blue"}}>Artist: </span>{songs.artist}</Item>
                                <Item sx = {{border: "0px"}}><span style = {{color: "blue"}}>Genre: </span>{songs.genre}</Item>
                                <Item sx = {{border: "0px"}}><span style = {{color: "red"}}>Total Songs:  </span>{songs.songs.length}</Item>
                            </Box>
                        </Item>
        </Box>
            <div>
                {
                    show? (
                        <Box sx={{ display: 'grid', bgcolor: "white", gridTemplateColumns: 'repeat(3, 1fr)' }}>
               
               
               {
                   album.map((e, i) => (
                       <a href = {`/album/${e._id}`}>
                    
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
                        </a>
                    
                   ))
               }
               
               {/* <Item>1</Item> 
                <Item>2</Item>
                <Item>3</Item>
                <Item>3</Item> */}

            </Box>
                    ) : (
                        <Box sx={{ display: 'grid', gridTemplateRows: 'repeat(3, 1fr)' }}>
                {
                    songs.songs.map((e) => (
                        <Item sx = {{bgcolor: "white", display: "grid", gridTemplateColumns: "10% 80%"}}>
                            <div style = {{marginTop: "5px"}}>
                                <img style = {{width: "60px", height: "60px", borderRadius: "50%"}} src = {e.photo} alt = "image" />
                            </div>
                            <div>
                                <p style = {{marginTop: "1px"}}>{e.name}</p>
                                <p style = {{marginTop: "-16px", fontWeight: "400"}}>{e.duration} <span style = {{marginTop: "-5px"}}>.</span></p>
                                <p>Artist: <span style = {{color: "red"}}>{songs.artist}</span>    Album:   <span style = {{color: "blue"}}>{songs.name}</span>    Genre:  <span style = {{color: "green"}}>{songs.genre}</span></p>
                            </div>

                        </Item>
                    ))
                }
               
                {/* <Item sx = {{bgcolor: "white"}}>2</Item>
                <Item sx = {{bgcolor: "white"}}>3</Item> */}
            </Box>
                    )
                }
            
            </div>
            
        </Item>
        <Item sx={{ flexGrow: 1 }}>Filter container</Item>
        
      </Box>
    </div>
    </>
  );
};

// export { MainPage };

// const Album = () => {
//     return (
//         <>
//             This is the album Do you want to see the songs
//         </>
//     )
// }

export {Album};