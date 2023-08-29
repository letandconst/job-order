import { useEffect, useState } from "react";
import { useData } from "../../../context/DataContext";
import axios from "axios";
import {
  Badge,
  ListItem,
  UnorderedList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

interface WorkRequest {
  request: string;
  labor: number;
}

interface JobInterface {
  workRequested: WorkRequest[];
  customerName: string;
  carModel: string;
  plateNumber: string;
  status: string;
}

interface ViewJobProps {
  id: string | undefined;
}

const ViewJobs = ({ id }: ViewJobProps) => {
  const { api } = useData();
  const [jobs, setJobs] = useState<JobInterface[]>([]);
  useEffect(() => {
    const getJobs = async () => {
      const res = await axios.get(`${api}/mechanic/${id}`);
      setJobs(res.data.assignedJobs);
    };
    getJobs();
  }, []);

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Request</Th>
            <Th>Customer Name</Th>
            <Th>Car Model</Th>
            <Th>Plate Number</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {jobs.map((job, i) => (
            <Tr key={i}>
              <Td>
                <UnorderedList>
                  {job.workRequested.map((item: WorkRequest, i: number) => (
                    <ListItem key={i}>{item.request}</ListItem>
                  ))}
                </UnorderedList>
              </Td>
              <Td>{job.customerName}</Td>
              <Td>{job.carModel}</Td>
              <Td>{job.plateNumber}</Td>
              <Td>
                <Badge
                  variant="solid"
                  colorScheme={
                    job.status === "Pending"
                      ? "yellow"
                      : job.status === "In Progress"
                      ? "blue"
                      : "green"
                  }
                >
                  {job.status}
                </Badge>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ViewJobs;
