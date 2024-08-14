import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const InteractionRow = ({ ind, interaction }) => {
  const colorMapping = {
    Major: "danger",
    Moderate: "warning",
    Minor: "success",
    Unknown: "light",
  };

  // hex color codes
  // Major: #dc3545
  // Moderate: #ffc107
  // Minor: #28a745
  // Unknown: #f8f9fa

  const hexColorMapping = {
    Major: "#dc3545CC",
    Moderate: "#ffc107CC",
    Minor: "#28a745CC",
    Unknown: "#f8f9faCC",
  };

  return (
    <TableRow className={`table-${colorMapping[interaction.Level]}`}>
      <TableHead scope="row">{ind + 1}</TableHead>
      <TableCell>{interaction.Drug_A}</TableCell>
      <TableCell>{interaction.Drug_B}</TableCell>
      {/* <TableCell>{interaction.Level}</TableCell> */}
      <TableCell style={{ backgroundColor: hexColorMapping[interaction.Level]  }}
      
       className={` ${interaction.Level === "Unknown" || interaction.Level === "Moderate" ? "text-black" : ""}`}>{interaction.Level}</TableCell>
    </TableRow>
  );
};

export default InteractionRow;
