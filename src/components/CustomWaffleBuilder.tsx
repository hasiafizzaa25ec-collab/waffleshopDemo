import React, { useState, useMemo } from 'react';
import { Sparkles, Check, Plus, RefreshCw, ShoppingBag } from 'lucide-react';
import { CustomWaffleCreation, ToppingOption } from '../types/waffle';
import {
  DOUGH_BASES,
  DRIZZLE_OPTIONS,
  FRUIT_OPTIONS,
  CRUNCH_OPTIONS,
  CREAM_OPTIONS,
} from '../data/menuData';

interface CustomWaffleBuilderProps {
  onAddCustomWaffle: (customWaffle: CustomWaffleCreation) => void;
}

export const CustomWaffleBuilder: React.FC<CustomWaffleBuilderProps> = ({
  onAddCustomWaffle,
}) => {
  // Step 1: Base Dough
  const [selectedDoughId, setSelectedDoughId] = useState(DOUGH_BASES[0].id);

  // Step 2-5: Toppings
  const [selectedDrizzles, setSelectedDrizzles] = useState<ToppingOption[]>([DRIZZLE_OPTIONS[0]]);
  const [selectedFruits, setSelectedFruits] = useState<ToppingOption[]>([FRUIT_OPTIONS[0]]);
  const [selectedCrunches, setSelectedCrunches] = useState<ToppingOption[]>([CRUNCH_OPTIONS[0]]);
  const [selectedCreams, setSelectedCreams] = useState<ToppingOption[]>([CREAM_OPTIONS[0]]);
  const [customName, setCustomName] = useState('My Signature Waffle');
  const [customNotes, setCustomNotes] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const selectedDough = DOUGH_BASES.find((d) => d.id === selectedDoughId) || DOUGH_BASES[0];

  // Toggle selection helpers
  const toggleSelection = (
    list: ToppingOption[],
    setList: React.Dispatch<React.SetStateAction<ToppingOption[]>>,
    item: ToppingOption
  ) => {
    if (list.some((i) => i.id === item.id)) {
      setList(list.filter((i) => i.id !== item.id));
    } else {
      setList([...list, item]);
    }
  };

  // Preset Inspirations
  const applyPreset = (presetName: string) => {
    if (presetName === 'liege-chocolate-hazelnut') {
      setSelectedDoughId('dough-liege-brioche');
      setSelectedDrizzles([DRIZZLE_OPTIONS[0]]); // 70% Dark chocolate
      setSelectedFruits([FRUIT_OPTIONS[0]]); // Strawberries
      setSelectedCrunches([CRUNCH_OPTIONS[0]]); // Hazelnuts
      setSelectedCreams([CREAM_OPTIONS[0]]); // Chantilly
      setCustomName('Liege Dark Noir & Hazelnut');
    } else if (presetName === 'brussels-berry-cloud') {
      setSelectedDoughId('dough-brussels-crisp');
      setSelectedDrizzles([DRIZZLE_OPTIONS[2], DRIZZLE_OPTIONS[4]]); // Maple & Raspberry
      setSelectedFruits([FRUIT_OPTIONS[0], FRUIT_OPTIONS[1]]); // Strawberries & Blueberries
      setSelectedCrunches([CRUNCH_OPTIONS[1]]); // Biscoff
      setSelectedCreams([CREAM_OPTIONS[1]]); // Orange blossom mascarpone
      setCustomName('Brussels Wild Berry Cloud');
    } else if (presetName === 'salted-caramel-bacon') {
      setSelectedDoughId('dough-liege-brioche');
      setSelectedDrizzles([DRIZZLE_OPTIONS[1]]); // Salted caramel
      setSelectedFruits([FRUIT_OPTIONS[2]]); // Bananas
      setSelectedCrunches([CRUNCH_OPTIONS[4]]); // Smoked Bacon
      setSelectedCreams([CREAM_OPTIONS[3]]); // Honey Butter
      setCustomName('Sweet & Savory Bacon Crunch');
    }
  };

  // Calculations
  const unitPrice = useMemo(() => {
    const drizzlesCost = selectedDrizzles.reduce((s, i) => s + i.price, 0);
    const fruitsCost = selectedFruits.reduce((s, i) => s + i.price, 0);
    const crunchesCost = selectedCrunches.reduce((s, i) => s + i.price, 0);
    const creamsCost = selectedCreams.reduce((s, i) => s + i.price, 0);
    return selectedDough.price + drizzlesCost + fruitsCost + crunchesCost + creamsCost;
  }, [selectedDough, selectedDrizzles, selectedFruits, selectedCrunches, selectedCreams]);

  const totalCalories = useMemo(() => {
    const drizzlesCal = selectedDrizzles.reduce((s, i) => s + i.calories, 0);
    const fruitsCal = selectedFruits.reduce((s, i) => s + i.calories, 0);
    const crunchesCal = selectedCrunches.reduce((s, i) => s + i.calories, 0);
    const creamsCal = selectedCreams.reduce((s, i) => s + i.calories, 0);
    return selectedDough.calories + drizzlesCal + fruitsCal + crunchesCal + creamsCal;
  }, [selectedDough, selectedDrizzles, selectedFruits, selectedCrunches, selectedCreams]);

  const handleAddCustom = () => {
    const customCreation: CustomWaffleCreation = {
      id: `custom-${Date.now()}`,
      baseDough: selectedDough,
      drizzles: selectedDrizzles,
      fruits: selectedFruits,
      crunches: selectedCrunches,
      creams: selectedCreams,
      notes: customNotes || customName,
      quantity,
      totalPrice: unitPrice * quantity,
    };

    onAddCustomWaffle(customCreation);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1500);
  };

  const handleReset = () => {
    setSelectedDoughId(DOUGH_BASES[0].id);
    setSelectedDrizzles([]);
    setSelectedFruits([]);
    setSelectedCrunches([]);
    setSelectedCreams([]);
    setCustomName('My Custom Creation');
    setCustomNotes('');
  };

  return (
    <section id="custom-builder" className="py-16 sm:py-24 bg-[#F5EFE6] border-y border-[#EADBCC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#7A6E63] font-medium mb-2">
              <span>Interactive Atelier</span>
              <span aria-hidden="true">·</span>
              <span>Baked to Your Exact Taste</span>
              <span aria-hidden="true">·</span>
              <span>Small Batch Belgian Recipe</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#24211E] tracking-tight">
              The Custom Waffle Bar
            </h2>
            <p className="mt-2 text-base text-[#5C534B] max-w-2xl">
              Build your custom artisan waffle layer by layer. From 48-hour fermented brioche dough to decadent warm chocolates, fresh hand-sliced fruits, and velvety creams.
            </p>
          </div>

          {/* Quick preset selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#7A6E63] font-medium">Inspirations:</span>
            <button
              onClick={() => applyPreset('liege-chocolate-hazelnut')}
              className="px-2.5 py-1 bg-white border border-[#EADBCC] rounded-lg text-[#24211E] hover:border-[#B85D19] transition-colors"
            >
              Classic Noir
            </button>
            <button
              onClick={() => applyPreset('brussels-berry-cloud')}
              className="px-2.5 py-1 bg-white border border-[#EADBCC] rounded-lg text-[#24211E] hover:border-[#B85D19] transition-colors"
            >
              Berry Cloud
            </button>
            <button
              onClick={() => applyPreset('salted-caramel-bacon')}
              className="px-2.5 py-1 bg-white border border-[#EADBCC] rounded-lg text-[#24211E] hover:border-[#B85D19] transition-colors"
            >
              Sweet & Savory
            </button>
          </div>
        </div>

        {/* Builder Studio Grid: Controls on Left, Tactile Preview on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Multi-Step Customization Options */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Base Dough */}
            <div className="bg-white rounded-2xl border border-[#EADBCC] p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-[#B85D19] uppercase tracking-wider">
                  Step 1 · Choose Base Dough
                </span>
                <span className="text-xs text-[#7A6E63]">Required (1)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {DOUGH_BASES.map((dough) => {
                  const isSelected = selectedDoughId === dough.id;
                  return (
                    <button
                      key={dough.id}
                      type="button"
                      onClick={() => setSelectedDoughId(dough.id)}
                      className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                        isSelected
                          ? 'border-[#B85D19] bg-[#FBF5EE] ring-1 ring-[#B85D19]'
                          : 'border-[#EADBCC] bg-[#FAF7F2] hover:bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-xs text-[#24211E]">{dough.name}</p>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#B85D19]" />}
                        </div>
                        <p className="text-[11px] text-[#7A6E63] mt-1.5 leading-snug">
                          {dough.description}
                        </p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-[#EADBCC]/50 flex items-center justify-between text-xs">
                        <span className="font-mono text-[#24211E] font-bold tabular-nums">
                          ${dough.price.toFixed(2)}
                        </span>
                        <span className="text-[11px] text-[#7A6E63]">{dough.calories} cal</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Warm Drizzles */}
            <div className="bg-white rounded-2xl border border-[#EADBCC] p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-[#B85D19] uppercase tracking-wider">
                  Step 2 · Warm Belgian Drizzles & Syrups
                </span>
                <span className="text-xs text-[#7A6E63]">{selectedDrizzles.length} selected</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {DRIZZLE_OPTIONS.map((item) => {
                  const isSelected = selectedDrizzles.some((d) => d.id === item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleSelection(selectedDrizzles, setSelectedDrizzles, item)}
                      className={`p-2.5 rounded-lg border text-left flex items-center justify-between text-xs transition-colors ${
                        isSelected
                          ? 'border-[#B85D19] bg-[#FBF5EE] font-medium text-[#24211E]'
                          : 'border-[#EADBCC] bg-[#FAF7F2] text-[#5C534B] hover:bg-white'
                      }`}
                    >
                      <span className="truncate pr-1">{item.name}</span>
                      <span className="font-mono text-[#7A6E63] tabular-nums shrink-0">
                        +${item.price.toFixed(2)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Fresh Fruits */}
            <div className="bg-white rounded-2xl border border-[#EADBCC] p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-[#B85D19] uppercase tracking-wider">
                  Step 3 · Fresh Hand-Cut Fruits & Berries
                </span>
                <span className="text-xs text-[#7A6E63]">{selectedFruits.length} selected</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {FRUIT_OPTIONS.map((item) => {
                  const isSelected = selectedFruits.some((f) => f.id === item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleSelection(selectedFruits, setSelectedFruits, item)}
                      className={`p-2.5 rounded-lg border text-left flex items-center justify-between text-xs transition-colors ${
                        isSelected
                          ? 'border-[#B85D19] bg-[#FBF5EE] font-medium text-[#24211E]'
                          : 'border-[#EADBCC] bg-[#FAF7F2] text-[#5C534B] hover:bg-white'
                      }`}
                    >
                      <span className="truncate pr-1">{item.name}</span>
                      <span className="font-mono text-[#7A6E63] tabular-nums shrink-0">
                        +${item.price.toFixed(2)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Crunches */}
            <div className="bg-white rounded-2xl border border-[#EADBCC] p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-[#B85D19] uppercase tracking-wider">
                  Step 4 · Roasted Crunches & Crumbles
                </span>
                <span className="text-xs text-[#7A6E63]">{selectedCrunches.length} selected</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CRUNCH_OPTIONS.map((item) => {
                  const isSelected = selectedCrunches.some((c) => c.id === item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleSelection(selectedCrunches, setSelectedCrunches, item)}
                      className={`p-2.5 rounded-lg border text-left flex items-center justify-between text-xs transition-colors ${
                        isSelected
                          ? 'border-[#B85D19] bg-[#FBF5EE] font-medium text-[#24211E]'
                          : 'border-[#EADBCC] bg-[#FAF7F2] text-[#5C534B] hover:bg-white'
                      }`}
                    >
                      <span className="truncate pr-1">{item.name}</span>
                      <span className="font-mono text-[#7A6E63] tabular-nums shrink-0">
                        +${item.price.toFixed(2)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Whipped Creams & Gelato */}
            <div className="bg-white rounded-2xl border border-[#EADBCC] p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-[#B85D19] uppercase tracking-wider">
                  Step 5 · Velvety Creams & Artisan Gelato
                </span>
                <span className="text-xs text-[#7A6E63]">{selectedCreams.length} selected</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CREAM_OPTIONS.map((item) => {
                  const isSelected = selectedCreams.some((c) => c.id === item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleSelection(selectedCreams, setSelectedCreams, item)}
                      className={`p-2.5 rounded-lg border text-left flex items-center justify-between text-xs transition-colors ${
                        isSelected
                          ? 'border-[#B85D19] bg-[#FBF5EE] font-medium text-[#24211E]'
                          : 'border-[#EADBCC] bg-[#FAF7F2] text-[#5C534B] hover:bg-white'
                      }`}
                    >
                      <span className="truncate pr-1">{item.name}</span>
                      <span className="font-mono text-[#7A6E63] tabular-nums shrink-0">
                        +${item.price.toFixed(2)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Tactile Creation Summary & Live Plate Preview */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-white rounded-2xl border border-[#EADBCC] p-6 sm:p-7 shadow-lg">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#EADBCC]">
                <div>
                  <span className="text-xs font-semibold text-[#B85D19] uppercase tracking-wider">
                    Creation Summary
                  </span>
                  <h3 className="font-display text-xl font-bold text-[#24211E] mt-0.5">
                    {customName}
                  </h3>
                </div>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 text-xs text-[#7A6E63] hover:text-[#24211E] py-1 px-2 rounded hover:bg-[#FAF7F2]"
                  title="Reset customizer to default"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Tactile Visual Plate Representation */}
              <div className="my-6 p-6 rounded-2xl bg-[#FAF7F2] border border-[#EADBCC]/80 flex flex-col items-center justify-center text-center relative overflow-hidden">
                
                {/* Waffle base graphic representation */}
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl bg-amber-200 border-4 border-amber-400/80 shadow-inner relative flex items-center justify-center p-2">
                  {/* Grid pattern mimicking waffle iron lattice */}
                  <div className="w-full h-full grid grid-cols-4 grid-rows-4 gap-1 opacity-60">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} className="bg-amber-500/30 rounded-xs border border-amber-600/30 shadow-xs" />
                    ))}
                  </div>

                  {/* Overlays reflecting selected toppings */}
                  {selectedDrizzles.length > 0 && (
                    <div className="absolute inset-x-2 top-2 h-2 rounded-full bg-[#3B2516]/80 blur-[1px] rotate-12" />
                  )}
                  {selectedFruits.length > 0 && (
                    <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-rose-500 shadow-sm" />
                  )}
                  {selectedCreams.length > 0 && (
                    <div className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-amber-50 shadow-md border border-amber-100 flex items-center justify-center text-[10px] text-amber-800 font-bold">
                      Cream
                    </div>
                  )}
                  {selectedCrunches.length > 0 && (
                    <div className="absolute bottom-3 left-4 flex gap-1">
                      <div className="w-2 h-2 rounded-xs bg-amber-800" />
                      <div className="w-2 h-2 rounded-xs bg-amber-700" />
                    </div>
                  )}
                </div>

                <p className="mt-4 font-display font-medium text-[#24211E] text-sm">
                  {selectedDough.name}
                </p>
                <div className="text-xs text-[#7A6E63] mt-1 space-x-1">
                  <span>{selectedDrizzles.length + selectedFruits.length + selectedCrunches.length + selectedCreams.length} Layered Toppings</span>
                  <span>·</span>
                  <span className="font-mono tabular-nums">{totalCalories} Calories</span>
                </div>
              </div>

              {/* Itemized Ingredient List */}
              <div className="space-y-2 py-2 text-xs border-b border-[#EADBCC] max-h-48 overflow-y-auto">
                <div className="flex justify-between text-[#24211E] font-medium">
                  <span>{selectedDough.name}</span>
                  <span className="font-mono tabular-nums">${selectedDough.price.toFixed(2)}</span>
                </div>
                {selectedDrizzles.map((d) => (
                  <div key={d.id} className="flex justify-between text-[#5C534B]">
                    <span>Drizzle: {d.name}</span>
                    <span className="font-mono tabular-nums">+${d.price.toFixed(2)}</span>
                  </div>
                ))}
                {selectedFruits.map((f) => (
                  <div key={f.id} className="flex justify-between text-[#5C534B]">
                    <span>Fruit: {f.name}</span>
                    <span className="font-mono tabular-nums">+${f.price.toFixed(2)}</span>
                  </div>
                ))}
                {selectedCrunches.map((c) => (
                  <div key={c.id} className="flex justify-between text-[#5C534B]">
                    <span>Crunch: {c.name}</span>
                    <span className="font-mono tabular-nums">+${c.price.toFixed(2)}</span>
                  </div>
                ))}
                {selectedCreams.map((cr) => (
                  <div key={cr.id} className="flex justify-between text-[#5C534B]">
                    <span>Cream/Gelato: {cr.name}</span>
                    <span className="font-mono tabular-nums">+${cr.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Custom notes input */}
              <div className="mt-4">
                <label className="block text-[11px] font-semibold text-[#7A6E63] uppercase tracking-wider mb-1">
                  Name Your Creation or Special Instructions
                </label>
                <input
                  type="text"
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="e.g. Maya's Sunday Breakfast Waffle..."
                  className="w-full px-3 py-1.5 text-xs bg-[#FAF7F2] border border-[#EADBCC] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B85D19]"
                />
              </div>

              {/* Quantity Stepper & Add to Cart Action */}
              <div className="mt-6 pt-4 border-t border-[#EADBCC]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#7A6E63]">Qty:</span>
                    <div className="flex items-center border border-[#EADBCC] rounded-lg bg-[#FAF7F2]">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-2 py-1 text-xs text-[#5C534B] hover:text-[#24211E]"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-mono font-bold tabular-nums">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-2 py-1 text-xs text-[#5C534B] hover:text-[#24211E]"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-[#7A6E63] block">Total Amount</span>
                    <span className="font-mono text-2xl font-bold text-[#24211E] tabular-nums">
                      ${(unitPrice * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleAddCustom}
                  className={`w-full py-3 px-4 text-xs font-semibold rounded-lg shadow-sm flex items-center justify-center gap-2 transition-all ${
                    justAdded
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#B85D19] hover:bg-[#9E4D12] text-white hover:translate-y-[-1px]'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Custom Waffle Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#F5C28C]" />
                      <span>Add Custom Creation to Bag</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
