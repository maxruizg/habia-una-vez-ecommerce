import { useState } from "react";
import { Form, useRevalidator } from "react-router";
import type { Route } from "./+types/admin.calendario";
import {
  getBlockedDates,
  getBookings,
  addBlockedDate,
  removeBlockedDate,
} from "~/lib/data.server";
import { BookingCalendar } from "~/components/booking/BookingCalendar";
import { Modal } from "~/components/ui/Modal";
import { Input } from "~/components/ui/Input";
import { Button } from "~/components/ui/Button";
import { formatDate } from "~/lib/utils";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Calendario | Admin" }];
}

export async function loader({}: Route.LoaderArgs) {
  const blockedDates = getBlockedDates();
  const bookings = getBookings();
  const bookedDates = bookings
    .filter((b) => b.status !== "cancelada")
    .map((b) => b.eventDate);

  return { blockedDates: blockedDates.map((d) => d.date), bookedDates };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "block") {
    const date = formData.get("date") as string;
    const reason = formData.get("reason") as string;
    addBlockedDate(date, reason || undefined);
  }

  if (intent === "unblock") {
    const date = formData.get("date") as string;
    removeBlockedDate(date);
  }

  return { success: true };
}

export default function AdminCalendario({ loaderData }: Route.ComponentProps) {
  const { blockedDates, bookedDates } = loaderData;
  const revalidator = useRevalidator();
  const [blockModalDate, setBlockModalDate] = useState<string | null>(null);
  const [unblockDate, setUnblockDate] = useState<string | null>(null);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-slate-800 mb-6">Calendario</h1>
      <p className="text-slate-600 font-body mb-6">
        Haz clic en una fecha disponible para bloquearla, o en una bloqueada para desbloquearla.
      </p>

      <div className="max-w-xl">
        <BookingCalendar
          blockedDates={blockedDates}
          bookedDates={bookedDates}
          adminMode
          onSelectDate={() => {}}
          onBlockDate={(date) => setBlockModalDate(date)}
          onUnblockDate={(date) => setUnblockDate(date)}
        />
      </div>

      {/* Block modal */}
      <Modal
        isOpen={!!blockModalDate}
        onClose={() => setBlockModalDate(null)}
        title="Bloquear fecha"
      >
        {blockModalDate && (
          <Form
            method="post"
            onSubmit={() => {
              setBlockModalDate(null);
              setTimeout(() => revalidator.revalidate(), 100);
            }}
          >
            <input type="hidden" name="intent" value="block" />
            <input type="hidden" name="date" value={blockModalDate} />

            <p className="font-body text-slate-700 mb-4">
              Bloquear <strong>{formatDate(blockModalDate)}</strong>
            </p>

            <Input
              label="Razon (opcional)"
              name="reason"
              placeholder="Mantenimiento, evento privado, etc."
              className="mb-4"
            />

            <div className="flex gap-3 justify-end">
              <Button variant="ghost" type="button" onClick={() => setBlockModalDate(null)}>
                Cancelar
              </Button>
              <Button variant="danger" type="submit">
                Bloquear
              </Button>
            </div>
          </Form>
        )}
      </Modal>

      {/* Unblock modal */}
      <Modal
        isOpen={!!unblockDate}
        onClose={() => setUnblockDate(null)}
        title="Desbloquear fecha"
      >
        {unblockDate && (
          <Form
            method="post"
            onSubmit={() => {
              setUnblockDate(null);
              setTimeout(() => revalidator.revalidate(), 100);
            }}
          >
            <input type="hidden" name="intent" value="unblock" />
            <input type="hidden" name="date" value={unblockDate} />

            <p className="font-body text-slate-700 mb-4">
              Desbloquear <strong>{formatDate(unblockDate)}</strong>?
            </p>

            <div className="flex gap-3 justify-end">
              <Button variant="ghost" type="button" onClick={() => setUnblockDate(null)}>
                Cancelar
              </Button>
              <Button type="submit">
                Desbloquear
              </Button>
            </div>
          </Form>
        )}
      </Modal>
    </div>
  );
}
