import React from 'react';
import { BeakerIcon, ChartBarIcon, CubeIcon } from '@heroicons/react/24/outline';

const LandingPage = ({ onLogin }) => {
  const features = [
    {
      name: 'Explore Pear Varieties',
      description: 'Discover a comprehensive catalog of pear varieties from around the world, complete with flavor profiles and origins.',
      icon: CubeIcon,
    },
    {
      name: 'Log Your Harvests',
      description: 'Easily track your pear harvests with details like quantity, date, and quality ratings. Keep your records organized in one place.',
      icon: ChartBarIcon,
    },
    {
      name: 'Gain Insights',
      description: 'Analyze your harvest data over time to understand your orchard\'s productivity and make informed decisions.',
      icon: BeakerIcon,
    },
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="text-2xl font-bold text-green-700">Pearfect</span>
            </a>
          </div>
          <div className="flex lg:flex-1 lg:justify-end">
            <button
              onClick={onLogin}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700 mr-6"
            >
              Demo Login <span aria-hidden="true">&rarr;</span>
            </button>
            <a href="/admin" target="_blank" className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700">
              Admin Panel
            </a>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero section */}
        <div className="relative isolate pt-14">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#a7f3d0] to-[#34d399] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="py-24 sm:py-32 lg:pb-40">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  The Ultimate Pear Companion
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Track your harvests, explore detailed variety information, and manage your orchard data seamlessly. Pearfect is the essential tool for every pear grower.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <button
                    onClick={onLogin}
                    className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  >
                    Try Demo
                  </button>
                  <a href="#features" className="text-sm font-semibold leading-6 text-gray-900">
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features section */}
        <div id="features" className="bg-gray-50 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-green-600">Everything You Need</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                A Better Way to Manage Your Pears
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                From cataloging to harvesting, our platform provides the tools you need for success.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-16">
                    <dt className="text-base font-semibold leading-7 text-gray-900">
                      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      {feature.name}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white">
          <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
            <p className="text-center text-xs leading-5 text-gray-500">
              &copy; {new Date().getFullYear()} Pearfect. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default LandingPage;
