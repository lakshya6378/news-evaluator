import React,{useContext,useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Authcontext } from '../context/Authcontext';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import axios from 'axios';
import './navbar.scss'
const Links = ['Dashboard', 'Projects', 'Team'];

const NavLink = ({ children }) => (
  <Box
    as="a"
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Box>
);
NavLink.propTypes={
  children:PropTypes.node.isRequired
}

function Navbar() {
  const navigate=useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [auth,setauth]=useState(false);
    //const [message,setmessage]=useState('');
    const [name,setname]=useState('');
    axios.defaults.withCredentials=true;
    const {logout}=useContext(Authcontext)
    useEffect(()=>{
      axios.get('http://localhost:8080')
      .then(res=>{
        if(res.data.Status==="Success"){
          setauth(true)
          setname(res.data.name);
        }else {
          setauth(false)
          //setmessage(res.data.Error)
        }
      })
      .then(err=>console.log(err))
  },[]);

  return (
    <>
      <Box className="navcontainer" px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>Logo</Box>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    ''
                  }
                />
              </MenuButton>
              <MenuList>
              <h3>{name}</h3>
              {
            auth ?
            <>
            <MenuItem onClick={()=>navigate('/history')}>
            History
            </MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
            </>
            :
            <MenuItem onClick={() => navigate('/login')}>
               Login
            </MenuItem>
        }
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}

export default Navbar