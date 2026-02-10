import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "~/lib/utils";

interface BookingCalendarProps {
  selectedDate?: string;
  onSelectDate: (date: string) => void;
  blockedDates: string[];
  bookedDates?: string[];
  adminMode?: boolean;
  onBlockDate?: (date: string) => void;
  onUnblockDate?: (date: string) => void;
}

const DAY_NAMES = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];
const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Convert to Monday=0
}

function formatDateStr(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function BookingCalendar({
  selectedDate,
  onSelectDate,
  blockedDates,
  bookedDates = [],
  adminMode = false,
  onBlockDate,
  onUnblockDate,
}: BookingCalendarProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const todayStr = formatDateStr(today.getFullYear(), today.getMonth(), today.getDate());

  function prevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  }

  function nextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  }

  const canGoPrev = adminMode || currentYear > today.getFullYear() || currentMonth > today.getMonth();

  function handleDayClick(dateStr: string, isBlocked: boolean, isPast: boolean, isBooked: boolean) {
    if (adminMode) {
      if (isBlocked && onUnblockDate) {
        onUnblockDate(dateStr);
      } else if (!isBlocked && !isBooked && onBlockDate) {
        onBlockDate(dateStr);
      }
      return;
    }

    if (isPast || isBlocked || isBooked) return;
    onSelectDate(dateStr);
  }

  return (
    <div className="magic-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          disabled={!canGoPrev}
          className="p-2 rounded-lg hover:bg-enchant-50 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="font-heading text-lg font-bold text-slate-800">
          {MONTH_NAMES[currentMonth]} {currentYear}
        </h3>
        <button
          onClick={nextMonth}
          className="p-2 rounded-lg hover:bg-enchant-50 text-slate-600 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAY_NAMES.map((name) => (
          <div key={name} className="text-center text-xs font-heading font-semibold text-slate-500 py-2">
            {name}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty slots before first day */}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Day cells */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = formatDateStr(currentYear, currentMonth, day);
          const isPast = dateStr < todayStr;
          const isToday = dateStr === todayStr;
          const isSelected = dateStr === selectedDate;
          const isBlocked = blockedDates.includes(dateStr);
          const isBooked = bookedDates.includes(dateStr);
          const isAvailable = !isPast && !isBlocked && !isBooked;

          return (
            <button
              key={day}
              onClick={() => handleDayClick(dateStr, isBlocked, isPast, isBooked)}
              disabled={!adminMode && !isAvailable}
              className={cn(
                "aspect-square flex items-center justify-center rounded-lg text-sm font-body relative transition-all",
                isPast && "text-slate-300 cursor-not-allowed",
                isToday && !isSelected && "ring-2 ring-gold-400",
                isBlocked && "bg-danger-50 text-danger-500 cursor-not-allowed",
                isBlocked && adminMode && "cursor-pointer hover:bg-danger-100",
                isBooked && "bg-magic-100 text-magic-600",
                isBooked && adminMode && "cursor-default",
                isAvailable && !isSelected && "hover:bg-enchant-50 text-slate-700 cursor-pointer",
                isSelected && "bg-enchant-500 text-white font-bold shadow-md",
                !isPast && !isBlocked && !isBooked && !isSelected && adminMode && "cursor-pointer hover:bg-enchant-50",
              )}
            >
              {day}
              {isAvailable && !isSelected && !adminMode && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-enchant-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 justify-center text-xs font-body text-slate-600">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-enchant-50 border border-enchant-300" />
          Disponible
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-danger-50 border border-danger-300" />
          Bloqueado
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-magic-100 border border-magic-300" />
          Reservado
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-enchant-500" />
          Seleccionado
        </div>
      </div>
    </div>
  );
}
