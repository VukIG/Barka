import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import "react-day-picker/dist/style.css";

function DatePicker({ selected, onSelect, placeholder = "Pick a date", minDate }) {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
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
    </Popover.Root>
  );
}

export default DatePicker;