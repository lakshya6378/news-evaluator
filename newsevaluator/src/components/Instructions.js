import React from 'react'
import { Box, Heading, OrderedList, ListItem } from '@chakra-ui/react'

export default function Instructions() {
  return (
    <Box className='Instructions-container'>
      <Heading className='heading'>How to convert Article to AI generated News</Heading>
      <OrderedList className='numbered-circle-list' listStyleType="none" padding="10px" >
        <ListItem className='listitems' marginBottom="10px" display="flex" alignItems="center"  gap="2%" minHeight="100px">
        <Box width="25%"     fontWeight="bolder">
            <Box height="3em" width="3em"  border="2px solid #000" borderRadius="50%" textAlign="center" lineHeight="2.6em" fontSize={20} background='#ffffff' color="red">
            1 
            </Box>
          </Box>
          <Box width="70%" textAlign="justify" fontSize="20px">
          Select the Image or PDF you wish to convert
          </Box>
        </ListItem>
        <ListItem className='listitems' marginBottom="10px" display="flex" alignItems="center"  gap="2%" minHeight="100px">
        <Box width="25%"     fontWeight="bolder">
            <Box height="3em" width="3em"  border="2px solid #000" borderRadius="50%" textAlign="center" lineHeight="2.6em" fontSize={20} background='#ffffff' color="red" >
             2
            </Box>
          </Box>
         <Box width="70%" textAlign="start" fontSize="20px"> Our News generator will convert that document to AI Text</Box>
        </ListItem>
        <ListItem className='listitems' marginBottom="10px" display="flex" alignItems="center"  gap="2%" minHeight="100px">
        <Box width="25%"     fontWeight="bold">
            <Box height="3em" width="3em"  border="2px solid #000" borderRadius="50%" textAlign="center" lineHeight="2.6em" fontSize={20} background='#ffffff' color="red">
        3
            </Box>
          </Box>
          <Box width="70%" textAlign="start" fontSize="20px">You can double click on any text for knowing the meaning, pronunciation, and example for a technical Word
          </Box>
        </ListItem>
        <ListItem className='listitems' marginBottom="10px" display="flex" alignItems="center"  gap="2%" minHeight="100px">
          <Box width="25%"     fontWeight="bolder">
            <Box height="3em" width="3em"  border="2px solid #000" borderRadius="50%" textAlign="center" lineHeight="2.6em" fontSize={20} background='#ffffff' color="red">
            4
            </Box>
          </Box>
          <Box width="70%" textAlign="start" fontSize="20px">
          For watch your previous search results, You can simply watch the history for Your Account.
          </Box>
        </ListItem>
      </OrderedList> 
      <div className="color-line"></div>
    </Box>
  )
}
