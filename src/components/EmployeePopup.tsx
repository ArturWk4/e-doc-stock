import React from "react";
import { Dialog } from "@headlessui/react";

type Employee = {
  id: number;
  name: string;
  email: string;
  position: string;
  duties: string;
  responsibilities: string[];
  documentsCount: number;
};

type Props = {
  employee: Employee | null;
  onClose: () => void;
};

export default function EmployeePopup({ employee, onClose }: Props) {
  if (!employee) return null;

  return (
    <Dialog open={!!employee} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-2xl p-6 max-w-md w-full shadow-lg">
          <Dialog.Title className="text-xl font-semibold mb-4">{employee.name}</Dialog.Title>

          <p className="mb-2"><span className="font-medium">Email:</span> {employee.email}</p>
          <p className="mb-2"><span className="font-medium">Должность:</span> {employee.position}</p>
          <p className="mb-2"><span className="font-medium">Обязанности:</span> {employee.duties}</p>
          <p className="mb-2"><span className="font-medium">Документов добавил:</span> {employee.documentsCount}</p>

          <h3 className="font-semibold mt-4 mb-2">Ответственности</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
            {employee.responsibilities.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 mt-2"
          >
            Закрыть
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
