import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/Button"

const DrugListTable = ({ drugList, onDeleteHandler }) => {
  return (
    <Table >
      <TableCaption>Table: Drug List</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead scope="col"> # </TableHead>
          <TableHead scope="col"> Drug Name </TableHead>
            <TableHead scope="col"> Action </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {drugList.map((drug, ind) => (
          <TableRow key={drug.id}>
            <TableHead scope="row">{ind + 1}</TableHead>
            <TableCell>{drug.name}</TableCell>
            <TableCell>
              <Button
                variant="outline"
                className="btn btn-danger"
                onClick={() => onDeleteHandler(drug.id)}
              >
              Delete

              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DrugListTable;
