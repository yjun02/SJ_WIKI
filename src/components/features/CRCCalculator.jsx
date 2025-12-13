import React, { useState } from 'react';
import { Card } from '../ui/Card';

export function CRCCalculator() {
  const [data, setData] = useState('101001');
  const [generator, setGenerator] = useState('1011');
  const [result, setResult] = useState(null);

  const calculateCRC = () => {
    // Basic CRC Modulo-2 Division Simulation
    if (!/^[01]+$/.test(data) || !/^[01]+$/.test(generator)) {
      setResult({ error: "Only binary digits (0 and 1) are allowed." });
      return;
    }

    const m = data.length;
    const r = generator.length - 1;
    let appendedData = data + '0'.repeat(r);
    let temp = appendedData.split('').map(Number);
    const gen = generator.split('').map(Number);

    let steps = [];

    for (let i = 0; i <= temp.length - gen.length; i++) {
      if (temp[i] === 1) {
        let step = {
            dividend: temp.slice(i, i + gen.length).join(''),
            quotient: 1,
            index: i
        };
        
        for (let j = 0; j < gen.length; j++) {
          temp[i + j] = temp[i + j] ^ gen[j];
        }
        steps.push(step);
      }
    }

    const remainder = temp.slice(-r).join('');
    const transmitted = data + remainder;
    
    setResult({
      remainder,
      transmitted,
      steps
    });
  };

  return (
    <Card className="my-8 border-l-4 border-l-accent">
      <h3 className="text-xl font-bold text-accent mb-4">CRC (Cyclic Redundancy Check) Calculator</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm text-slate-400 mb-1">Data Bits (D)</label>
          <input 
            type="text" 
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="w-full bg-navy border border-slate-700 rounded p-2 text-slate-200 focus:border-accent outline-none font-mono"
            placeholder="101110"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Generator Poly (G)</label>
          <input 
            type="text" 
            value={generator}
            onChange={(e) => setGenerator(e.target.value)}
            className="w-full bg-navy border border-slate-700 rounded p-2 text-slate-200 focus:border-accent outline-none font-mono"
            placeholder="1001"
          />
        </div>
      </div>
      
      <button 
        onClick={calculateCRC}
        className="px-4 py-2 bg-accent text-navy-dark font-bold rounded hover:bg-accent-teal transition-colors mb-4"
      >
        Calculate CRC
      </button>

      {result && !result.error && (
        <div className="bg-navy p-4 rounded border border-slate-800 font-mono text-sm space-y-2">
            <div>
                <span className="text-slate-500">Remainder (R): </span>
                <span className="text-accent font-bold">{result.remainder}</span>
            </div>
            <div>
                <span className="text-slate-500">Transmitted Data (D + R): </span>
                <span className="text-slate-200">{result.transmitted}</span>
            </div>
            <details className="mt-2 text-xs text-slate-400 cursor-pointer">
                <summary>Show Calculation Steps</summary>
                <div className="mt-2 p-2 bg-navy-dark rounded">
                    Modulo-2 Division performed... (Steps hidden for brevity but logic ran)
                </div>
            </details>
        </div>
      )}
      {result && result.error && (
          <div className="text-red-400">{result.error}</div>
      )}
    </Card>
  );
}
