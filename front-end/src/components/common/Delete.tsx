import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
  } from '@chakra-ui/react';


  interface DeleteProps {
      isOpen: boolean;
      onClose: () => void;
      onCancel: () => void;
      onDelete: () => void;
      cancelRef: any; 
      className: string
  }
  export const Delete: React.FC<DeleteProps> = ({ isOpen, onClose, onCancel, onDelete, cancelRef, className }) => {
    return <>
          <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
          >
              <AlertDialogOverlay>
                  <AlertDialogContent>
                      <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                          Delete {className}
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