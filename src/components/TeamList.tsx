import { employees } from "../data/mockData";

const TeamList = () =>  {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Наша команда</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {employees.map((emp) => (
          <div
            key={emp.id}
            className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {emp.position}
            </h2>
            <p className="text-gray-500 mb-2">{emp.name}</p>
            <p className="text-gray-600 mb-4">
              <span className="font-medium">Что делает:</span> {emp.duties}
            </p>

            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {emp.responsibilities.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
 
export default TeamList;