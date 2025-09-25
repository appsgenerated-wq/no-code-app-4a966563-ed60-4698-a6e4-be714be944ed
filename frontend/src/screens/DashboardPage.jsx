import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRightOnRectangleIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const DashboardPage = ({ user, onLogout, manifest }) => {
  const [varieties, setVarieties] = useState([]);
  const [harvests, setHarvests] = useState([]);
  const [newHarvest, setNewHarvest] = useState({
    pearVarietyId: '',
    harvestDate: new Date().toISOString().split('T')[0],
    quantity: '',
    qualityRating: 3,
    notes: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchVarieties = useCallback(async () => {
    try {
      const response = await manifest.from('pearvarieties').find();
      setVarieties(response.data);
    } catch (err) {
      console.error('Error fetching pear varieties:', err);
      setError('Could not load pear varieties.');
    }
  }, [manifest]);

  const fetchHarvests = useCallback(async () => {
    if (!user) return;
    try {
      const response = await manifest.from('harvests').find({
        filter: { farmer: { id: user.id } },
        include: ['pearVariety'],
        sort: { harvestDate: 'desc' },
      });
      setHarvests(response.data);
    } catch (err) {
      console.error('Error fetching harvests:', err);
      setError('Could not load your harvests.');
    }
  }, [manifest, user]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchVarieties(), fetchHarvests()]);
      setLoading(false);
    };
    loadData();
  }, [fetchVarieties, fetchHarvests]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHarvest({ ...newHarvest, [name]: value });
  };

  const handleCreateHarvest = async (e) => {
    e.preventDefault();
    if (!newHarvest.pearVarietyId || !newHarvest.quantity) {
      alert('Please select a variety and enter a quantity.');
      return;
    }
    try {
      const created = await manifest.from('harvests').create({
        ...newHarvest,
        quantity: parseFloat(newHarvest.quantity),
        qualityRating: parseInt(newHarvest.qualityRating, 10),
      });
      // Refetch harvests to get the newly created one with relations
      fetchHarvests();
      setNewHarvest({
        pearVarietyId: '',
        harvestDate: new Date().toISOString().split('T')[0],
        quantity: '',
        qualityRating: 3,
        notes: '',
      });
    } catch (err) {
      console.error('Error creating harvest:', err);
      setError('Failed to create harvest. Please check your input.');
    }
  };

  const handleDeleteHarvest = async (harvestId) => {
    if (window.confirm('Are you sure you want to delete this harvest?')) {
      try {
        await manifest.from('harvests').delete(harvestId);
        setHarvests(harvests.filter(h => h.id !== harvestId));
      } catch (err) {
        console.error('Error deleting harvest:', err);
        setError('Failed to delete harvest.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex items-center">
              <span className="text-xl font-bold text-green-700">Pearfect Dashboard</span>
            </div>
            <div className="flex items-center">
                <p className='text-sm text-gray-600 mr-4 hidden sm:block'>Welcome, {user.name}!</p>
                <a href="/admin" target="_blank" className="mr-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200">Admin</a>
                <button onClick={onLogout} className="inline-flex items-center text-sm text-gray-500 hover:text-gray-800">
                    <ArrowRightOnRectangleIcon className="h-6 w-6" />
                </button>
            </div>
          </div>
        </div>
      </header>

      <main className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {error && <div className="rounded-md bg-red-50 p-4 mb-6"><p className="text-sm font-medium text-red-800">{error}</p></div>}

          {/* Add Harvest Form */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Log a New Harvest</h2>
            <form onSubmit={handleCreateHarvest} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <label htmlFor="pearVarietyId" className="block text-sm font-medium text-gray-700">Pear Variety</label>
                <select id="pearVarietyId" name="pearVarietyId" value={newHarvest.pearVarietyId} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm">
                  <option value="" disabled>Select a variety</option>
                  {varieties.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                </select>
              </div>
              <div className="md:col-span-1">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity (kg)</label>
                <input type="number" name="quantity" id="quantity" value={newHarvest.quantity} onChange={handleInputChange} required step="0.1" min="0" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
              </div>
               <div className="md:col-span-1">
                <label htmlFor="harvestDate" className="block text-sm font-medium text-gray-700">Harvest Date</label>
                <input type="date" name="harvestDate" id="harvestDate" value={newHarvest.harvestDate} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
              </div>
              <div className="md:col-span-3">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
                 <textarea name="notes" id="notes" value={newHarvest.notes} onChange={handleInputChange} rows={2} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"></textarea>
              </div>
              <div className="md:col-span-3 text-right">
                <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                  Add Harvest
                </button>
              </div>
            </form>
          </div>

          {/* Harvests List */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Your Harvests</h2>
            <div className="overflow-x-auto">
              {loading ? <p>Loading harvests...</p> : harvests.length === 0 ? <p className="text-gray-500">No harvests logged yet.</p> : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variety</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {harvests.map(h => (
                      <tr key={h.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{h.pearVariety?.name || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(h.harvestDate).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{h.quantity} kg</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => handleDeleteHarvest(h.id)} className="text-red-600 hover:text-red-900"><TrashIcon className="h-5 w-5"/></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Pear Varieties Catalog */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Pear Variety Catalog</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? <p>Loading varieties...</p> : varieties.map(v => (
                <div key={v.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <img className="h-48 w-full object-cover" src={v.image?.thumbnail?.url || 'https://placehold.co/400x300'} alt={v.name} />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900">{v.name}</h3>
                    <p className="text-sm text-gray-600 capitalize"><span className="font-medium">Flavor:</span> {v.flavorProfile}</p>
                    <p className="text-sm text-gray-600"><span className="font-medium">Origin:</span> {v.origin}</p>
                    <p className="text-sm text-gray-500 mt-2">{v.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
