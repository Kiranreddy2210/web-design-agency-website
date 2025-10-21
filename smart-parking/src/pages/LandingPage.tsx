import { Link } from 'react-router-dom';

export function LandingPage() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">Find, book, and pay for parking in seconds</h1>
            <p className="mt-4 text-gray-600">Real-time availability, secure payments, and smart navigation. Manage parking seamlessly.</p>
            <div className="mt-6 flex gap-3">
              <Link to="/search" className="px-5 py-3 bg-blue-600 text-white rounded-md">Find Parking Near Me</Link>
              <Link to="/about" className="px-5 py-3 border rounded-md">Learn more</Link>
            </div>
          </div>
          <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
            <div className="text-gray-500">Interactive Map Preview</div>
          </div>
        </div>
      </div>
    </section>
  );
}
