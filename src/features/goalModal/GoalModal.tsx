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
import { Goal } from "../../types/Index";
import { GoalForm } from "./GoalForm";

const GoalModal = ({
  onEdit,
  onCreate,
}: {
  onEdit: (values: Goal) => void;
  onCreate: (values: Goal) => void;
}) => {
  const modalContext = useContext(ModalContext);
  if (!modalContext) throw Error("modalContext is undefined.");

  return "type" in modalContext.modal ? (
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
        margin={{ base: "0", sm: "unset" }}
        marginY={{ sm: "16" }}
      >
        <ModalHeader>
          {
            { CREATE: "Create a new goal", EDIT: "Edit a goal" }[
              modalContext.modal.type
            ]
          }
        </ModalHeader>
        <ModalCloseButton />
        <GoalForm
          initialValues={modalContext.modal.initialValues}
          onSubmit={{ CREATE: onCreate, EDIT: onEdit }[modalContext.modal.type]}
        >
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={modalContext.onClose}>
              Cancel
            </Button>
            <Button colorScheme="teal" type="submit">
              {modalContext.modal.type[0] +
                modalContext.modal.type.slice(1).toLowerCase()}
            </Button>
          </ModalFooter>
        </GoalForm>
      </ModalContent>
    </Modal>
  ) : null;
};

export { GoalModal };
