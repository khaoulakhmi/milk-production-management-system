import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Button,
    FormControl,
    Select,
    FormLabel,
    Input,
  } from '@chakra-ui/react';

  interface UpdateProps {
    isOpen: boolean;
    onClose: () => void;
    onCancel: () => void;
    onUpdate: () => void;
    handleInputChange:(e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => void;
    cancelRef: any; // Define the type for cancelRef
}
  
export const Update: React.FC<UpdateProps> = ({ isOpen, onClose, onCancel, onUpdate, cancelRef, handleInputChange }) => {
    return(
        <>
        <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
          >
              <AlertDialogOverlay>
                  <AlertDialogContent>
                      <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                          Update Cow
                      </AlertDialogHeader>
                      <AlertDialogBody>
                        <form>
                        <FormControl marginBottom="1rem">
                            <FormLabel htmlFor="date">Quantity:</FormLabel>
                            <Input type="number" id="quantity" name="quantity" onChange={handleInputChange} />
                        </FormControl>
                        <FormControl marginBottom="1rem">
                            <FormLabel htmlFor="date">Date:</FormLabel>
                            <Input type="date" id="date" name="date" onChange={handleInputChange} />
              </FormControl>
                        </form>
                    </AlertDialogBody>


                      <AlertDialogFooter>
                          <Button ref={cancelRef} onClick={onCancel}>
                              Cancel
                          </Button>
                          <Button colorScheme='teal' onClick={onUpdate} ml={3}>
                              Update
                          </Button>
                      </AlertDialogFooter>
                  </AlertDialogContent>
              </AlertDialogOverlay>
          </AlertDialog>
        </>
    )
}