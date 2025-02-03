import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PrioritySelectorProps {
  setPriority: (priority: string) => void;
}

const PrioritySelectorCom: React.FC<PrioritySelectorProps> = ({
  setPriority,
}) => {
  const priorities = [
    { title: "Low", value: "low" },
    { title: "Medium", value: "medium" },
    { title: "High", value: "high" }, // Fixed capitalization issue
  ];

  return (
    <Select onValueChange={setPriority}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Priority" />
      </SelectTrigger>
      <SelectContent>
        {priorities.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default PrioritySelectorCom;
