import React from 'react'
import { IconButton, useDisclosure } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Text , Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'
const ProfileModel = ({ user,children}) => {
    const { isOpen , onOpen , onClose } = useDisclosure()
    useEffect(() => {
    
    }, [])
    
  return (
    <>
    {
        children?(<span onClick={onOpen}>{children}</span>):(<IconButton display={{base:"flex"}} onClick={onOpen} icon={<ViewIcon/>} />)
    }
     <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader 
          fontSize={"40ox"} fontFamily="Work Sans" display="flex" justifyContent="center"
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center" justifyContent="center" mt="10px">
<Image borderRadius="full" alt={user.name} src={user.pic}  boxSize="150px" />
<Text fontSize={{base:"20px",md:"30px"}} fontFamily="Work Sans" display="flex" justifyContent="center" mt="10px">{user.email}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
           
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModel