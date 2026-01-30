import { goals } from "@/data/goals";

export default function Goals() {
  return (
    <section
      id="cele"
      className="section-padding bg-gray-50"
      aria-labelledby="cele-heading"
    >
      <div className="container-custom">
        <h2
          id="cele-heading"
          className="text-3xl md:text-4xl font-bold text-secondary mb-12 text-center"
        >
          Nasze cele
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="text-4xl mb-4 text-primary" aria-hidden="true">
                {goal.icon}
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-3">
                {goal.title}
              </h3>
              <p className="text-gray-700">{goal.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
