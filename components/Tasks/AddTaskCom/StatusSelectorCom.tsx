import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StatusSelectorProps {
  setStatus: (status: string) => void;
}

const StatusSelectorCom: React.FC<StatusSelectorProps> = ({ setStatus }) => {
  const statusOptions = [
    { title: "Backlog", value: "backlog" },
    { title: "Todo", value: "todo" },
    { title: "In Progress", value: "in progress" },
    { title: "Done", value: "done" },
  ];

  return (
    <Select onValueChange={setStatus}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Status" />
      </SelectTrigger>
      <SelectContent>
        {statusOptions.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default StatusSelectorCom;
