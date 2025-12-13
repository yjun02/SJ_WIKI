import React, { useState } from 'react';
import { Card } from '../ui/Card';

export function FragmentationCalculator() {
  const [packetSize, setPacketSize] = useState(4000);
  const [mtu, setMtu] = useState(1500);

  const calculateFragments = () => {
    const headerSize = 20;
    const dataSize = packetSize - headerSize;
    const maxDataPerFragment = Math.floor((mtu - headerSize) / 8) * 8;
    
    let fragments = [];
    let offset = 0;
    let remaining = dataSize;

    let id = 1;
    while (remaining > 0) {
      const currentDataSize = Math.min(remaining, maxDataPerFragment);
      remaining -= currentDataSize;
      const mf = remaining > 0 ? 1 : 0;
      
      fragments.push({
        id: id++,
        length: currentDataSize + headerSize,
        dataLength: currentDataSize,
        offset: offset / 8,
        mf: mf
      });

      offset += currentDataSize;
    }

    return fragments;
  };

  const fragments = calculateFragments();

  return (
    <Card className="my-8 border-l-4 border-l-emerald-500">
      <h3 className="text-xl font-bold text-emerald-400 mb-4">IP Fragmentation Simulator</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Total Packet Size (Bytes)</label>
          <input 
            type="number" 
            value={packetSize}
            onChange={(e) => setPacketSize(Number(e.target.value))}
            className="w-full bg-[#0d0d0d] border border-gray-700 rounded p-2 text-gray-200 focus:border-emerald-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">MTU (Bytes)</label>
          <input 
            type="number" 
            value={mtu}
            onChange={(e) => setMtu(Number(e.target.value))}
            className="w-full bg-[#0d0d0d] border border-gray-700 rounded p-2 text-gray-200 focus:border-emerald-500 outline-none"
          />
        </div>
      </div>

      <div className="space-y-3">
        {fragments.map((frag) => (
          <div key={frag.id} className="flex items-center gap-4 bg-[#0d0d0d] p-3 rounded border border-gray-800">
             <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-sm">
               {frag.id}
             </div>
             <div className="flex-1 grid grid-cols-4 gap-2 text-sm">
               <div>
                 <span className="text-gray-500 block text-xs">Length</span>
                 <span className="font-mono text-gray-200">{frag.length}</span>
               </div>
               <div>
                 <span className="text-gray-500 block text-xs">ID</span>
                 <span className="font-mono text-gray-200">x</span>
               </div>
               <div>
                 <span className="text-gray-500 block text-xs">MF</span>
                 <span className={frag.mf ? "text-red-400 font-bold" : "text-green-400 font-bold"}>{frag.mf}</span>
               </div>
               <div>
                 <span className="text-gray-500 block text-xs">Offset</span>
                 <span className="font-mono text-gray-200">{frag.offset}</span>
               </div>
             </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-xs text-gray-500">
        * Header size is assumed to be 20 bytes. Offset is calculated as "Data Start Index / 8".
      </div>
    </Card>
  );
}
