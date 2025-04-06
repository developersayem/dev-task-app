import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PrioritySelectorProps {
  setLabel: (label: string) => void;
}

const LabelSelectorCom: React.FC<PrioritySelectorProps> = ({ setLabel }) => {
  const label = [
    { title: "Bug", value: "bug" },
    { title: "Feature", value: "feature" },
    { title: "Documentation", value: "documentation" }, // Fixed capitalization issue
  ];

  return (
    <Select onValueChange={setLabel}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Priority" />
      </SelectTrigger>
      <SelectContent>
        {label.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LabelSelectorCom;
