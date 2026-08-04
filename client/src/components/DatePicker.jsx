import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import "react-day-picker/dist/style.css";

function DatePicker({
  selected,
  onSelect,
  placeholder = "Pick a date",
  minDate,
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-left flex items-center justify-between hover:border-gray-400 transition-colors"
        >
          <span className={selected ? "text-gray-900" : "text-gray-500"}>
            {selected ? format(selected, "PPP") : placeholder}
          </span>
          <CalendarIcon className="w-5 h-5 text-gray-400" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50"
          sideOffset={5}
          align="start"
        >
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(date) => {
              onSelect(date);
              setOpen(false);
            }}
            disabled={{ before: minDate || new Date() }}
            className="rdp-custom"
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default DatePicker;
