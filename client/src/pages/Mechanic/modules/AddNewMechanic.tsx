import {
    Flex,
    FormControl,
    Box,
    HStack,
  } from "@chakra-ui/react";
  
  import ImageUploader from "../../../components/ImageUploader/ImageUploader";
  import Input from "../../../components/Input/Input";
  import Button from "../../../components/Button/Button";
  import { ChangeEvent, FormEvent, useState } from "react";
  import { Mechanic } from "../../../context/DataContext";
  
  interface AddNewProps {
    onCancel: () => void;
    onAdd: (addNewMechanic: Mechanic) => void;
  }
  
  const AddMechanic = ({ onCancel, onAdd }: AddNewProps) => {
    const [newMechanic, setNewMechanic] = useState<Mechanic>({
       firstName: "",
       lastName: "",
       address: "",
       mobileNumber:"",
       profileImage: "",
       totalJobs: 0,
    });
  
    const handleImageUpload = (image: File) => {
        setNewMechanic((prevData) => ({
          ...prevData,
          profileImage: image,
        }));
      };
  
    const handleChange = async (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setNewMechanic((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      onAdd(newMechanic);
      onCancel();
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <Flex gap="32px">
          <ImageUploader onImageUpload={handleImageUpload} />
  
          <Box
            width="100%"
            sx={{
              "> div:not(:first-of-type)": {
                marginTop: "16px",
              },
            }}
          >
            <HStack>
            <FormControl>
              <Input
                type="text"
                placeholder="Ex: Juan"
                label="First Name"
                name="firstName"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <Input
                type="text"
                placeholder="Ex: Dela Cruz"
                label="Last Name"
                name="lastName"
                onChange={handleChange}
              />
            </FormControl>
            </HStack>
           
            <FormControl>
              <Input
                type="text"
                disabled={false}
                label="Address"
                name="address"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <Input
                type="text"
                disabled={false}
                label="Mobile Number"
                name="mobileNumber"
                onChange={handleChange}
              />
            </FormControl>
            <Flex gap="8px">
              <Button bgColor="green" type="submit">
                Add
              </Button>
              <Button bgColor="gray" onClick={onCancel}>
                Cancel
              </Button>
            </Flex>
          </Box>
        </Flex>
      </form>
    );
  };
  
  export default AddMechanic;
  