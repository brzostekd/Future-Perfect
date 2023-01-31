import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { useContext } from "react";
import { ModalContext } from "../../contexts";
import { GoalForm } from "./GoalForm";

// type Props = {
//   header: string;
//   initialValues: Goal;
//   disclosure: ReturnType<typeof useDisclosure>;
// };
const GoalModal = () => {
  let modalContext = useContext(ModalContext);
  if (!modalContext)
    throw Error(
      "modalContext is undefined. Wrong usage of GoalModal comonent."
    );
  //   if (!("header" in modalContext.modal))
  //     throw Error(
  //       "GoalModalProps have to be present on modalContextType in order for the component to be displayed."
  //     );
  // modalContext = {
  //   ...modalContext,
  //   ...{
  //     header: "sef",
  //     initialValues: {
  //       id: new ObjectId(),
  //       name: "",
  //       created_at: new Date(),
  //       board_id: new ObjectId(),
  //       color: "red",
  //       is_current: false,
  //       tasks: [
  //         {
  //           id: new ObjectId(),
  //           name: "",
  //           created_at: new Date(),
  //           status: STATUS.Pending,
  //           priority: 1,
  //         },
  //       ],
  //     },
  //     onSubmit: (values) => {
  //       console.log(values);
  //     },
  //   },
  // };
  return "header" in modalContext.modal ? (
    <Modal isOpen={modalContext.isOpen} onClose={modalContext.onClose}>
      <ModalOverlay />
      <ModalContent
        sx={{
          "*::-webkit-scrollbar": {
            width: "5",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "blackAlpha.200",
            borderRadius: "full",
            backgroundClip: "content-box",
            border: "0.25rem solid transparent",
          },
          "*::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "blackAlpha.300",
          },
        }}
      >
        <ModalHeader>{modalContext.modal.header}</ModalHeader>
        <ModalCloseButton />
        <GoalForm
          initialValues={modalContext.modal.initialValues}
          onSubmit={modalContext.modal.onSubmit}
        >
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={modalContext.onClose}>
              Cancel
            </Button>
            <Button colorScheme="teal" type="submit">
              Create
            </Button>
          </ModalFooter>
        </GoalForm>
      </ModalContent>
    </Modal>
  ) : null;
};

export { GoalModal };
