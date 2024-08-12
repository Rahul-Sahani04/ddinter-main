import InteractionRow from "./InteractionRow";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


const InteractionTable = ({ interactionTable }) => {
  return (
    <Table className="table">
    <TableCaption>Table: Drug Interactions</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead scope="col"> # </TableHead>
          <TableHead scope="col"> Drug 1 </TableHead>
          <TableHead scope="col"> Drug 2 </TableHead>
          <TableHead scope="col"> Level </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {interactionTable.map((interaction, ind) => (
          <InteractionRow key={ind} ind={ind} interaction={interaction} />
        ))}
      </TableBody>
    </Table>
  );
};

export default InteractionTable;
