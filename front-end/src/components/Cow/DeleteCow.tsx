import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Button,
  } from '@chakra-ui/react';


  interface DeleteCowProps {
      isOpen: boolean;
      onClose: () => void;
      onCancel: () => void;
      onDelete: () => void;
      cancelRef: any; // Define the type for cancelRef
  }
  export const DeleteCow: React.FC<DeleteCowProps> = ({ isOpen, onClose, onCancel, onDelete, cancelRef }) => {
    return <>
          <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
          >
              <AlertDialogOverlay>
                  <AlertDialogContent>
                      <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                          Delete Cow
                      </AlertDialogHeader>

                      <AlertDialogBody>
                          Are you sure? You can't undo this action afterwards.
                      </AlertDialogBody>

                      <AlertDialogFooter>
                          <Button ref={cancelRef} onClick={onCancel}>
                              Cancel
                          </Button>
                          <Button colorScheme='red' onClick={onDelete} ml={3}>
                              Delete
                          </Button>
                      </AlertDialogFooter>
                  </AlertDialogContent>
              </AlertDialogOverlay>
          </AlertDialog>
      </>;
  }