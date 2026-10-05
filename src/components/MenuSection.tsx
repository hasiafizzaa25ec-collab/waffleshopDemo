import React, { useState, useMemo } from 'react';
import { Plus, Search, Check, Sparkles, SlidersHorizontal, X } from 'lucide-react';
import { WaffleItem, WaffleCategory, ToppingOption, CartItem } from '../types/waffle';
import { MENU_ITEMS, DRIZZLE_OPTIONS, FRUIT_OPTIONS, CREAM_OPTIONS } from '../data/menuData';

interface MenuSectionProps {
  onAddToCart: (item: WaffleItem, selectedToppings?: ToppingOption[], notes?: string) => void;
  onOpenCustomBuilder: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onAddToCart,
  onOpenCustomBuilder,
}) => {
  const [activeCategory, setActiveCategory] = useState<WaffleCategory>('all');
  const [selectedDietary, setSelectedDietary] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Customization modal state
  const [selectedItemForModal, setSelectedItemForModal] = useState<WaffleItem | null>(null);
  const [modalToppings, setModalToppings] = useState<ToppingOption[]>([]);
  const [modalNotes, setModalNotes] = useState('');
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);

  // Filtered menu logic
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Dietary filter match
      if (selectedDietary !== 'all' && !item.dietary.includes(selectedDietary)) {
        return false;
      }
      // Search keyword match
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCategory = item.subCategory?.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCategory) {
          return false;
        }
      }
      return true;
    });
  }, [activeCategory, selectedDietary, searchQuery]);

  const handleQuickAdd = (item: WaffleItem) => {
    onAddToCart(item);
    setQuickAddedId(item.id);
    setTimeout(() => {
      setQuickAddedId(null);
    }, 1200);
  };

  const handleOpenCustomize = (item: WaffleItem) => {
    setSelectedItemForModal(item);
    setModalToppings([]);
    setModalNotes('');
  };

  const toggleModalTopping = (topping: ToppingOption) => {
    if (modalToppings.some((t) => t.id === topping.id)) {
      setModalToppings(modalToppings.filter((t) => t.id !== topping.id));
    } else {
      setModalToppings([...modalToppings, topping]);
    }
  };

  const handleConfirmModalAdd = () => {
    if (selectedItemForModal) {
      onAddToCart(selectedItemForModal, modalToppings, modalNotes);
      setSelectedItemForModal(null);
    }
  };

  const modalToppingsTotal = modalToppings.reduce((sum, t) => sum + t.price, 0);
  const modalGrandTotal = (selectedItemForModal?.price || 0) + modalToppingsTotal;

  return (
    <section id="menu" className="py-16 sm:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs text-[#7A6E63] font-medium mb-2">
            <span>Our Bakery Counter</span>
            <span aria-hidden="true">·</span>
            <span>Made Fresh Daily</span>
            <span aria-hidden="true">·</span>
            <span>Liege & Brussels Traditions</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#24211E] tracking-tight">
            The Artisanal Waffle Collection
          </h2>
          <p className="mt-2 text-base text-[#5C534B]">
            From our pearl-caramelized Liege brioche to featherlight Brussels squares and gourmet savory pairings. Every waffle is baked to order.
          </p>
        </div>

        {/* Filter Bar & Search Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 border-b border-[#EADBCC]">
          
          {/* Segmented Category Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EFE9DF] rounded-xl">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-white text-[#24211E] shadow-xs'
                  : 'text-[#5C534B] hover:text-[#24211E]'
              }`}
            >
              All Items ({MENU_ITEMS.length})
            </button>
            <button
              onClick={() => setActiveCategory('liege')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeCategory === 'liege'
                  ? 'bg-white text-[#24211E] shadow-xs'
                  : 'text-[#5C534B] hover:text-[#24211E]'
              }`}
            >
              Liege Pearl Waffles
            </button>
            <button
              onClick={() => setActiveCategory('brussels')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeCategory === 'brussels'
                  ? 'bg-white text-[#24211E] shadow-xs'
                  : 'text-[#5C534B] hover:text-[#24211E]'
              }`}
            >
              Brussels Crisp
            </button>
            <button
              onClick={() => setActiveCategory('savory')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeCategory === 'savory'
                  ? 'bg-white text-[#24211E] shadow-xs'
                  : 'text-[#5C534B] hover:text-[#24211E]'
              }`}
            >
              Savory Creations
            </button>
            <button
              onClick={() => setActiveCategory('drinks')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeCategory === 'drinks'
                  ? 'bg-white text-[#24211E] shadow-xs'
                  : 'text-[#5C534B] hover:text-[#24211E]'
              }`}
            >
              Espresso & Sips
            </button>
          </div>

          {/* Right Tools: Dietary toggles & Search Input */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-[#7A6E63] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search flavors, chocolate..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#EADBCC] rounded-lg text-[#24211E] placeholder-[#8C8075] focus:outline-none focus:ring-1 focus:ring-[#B85D19] focus:border-[#B85D19]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#7A6E63] hover:text-[#24211E]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Dietary Filter Dropdown / Buttons */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[#7A6E63] hidden sm:inline">Dietary:</span>
              <button
                onClick={() => setSelectedDietary('all')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  selectedDietary === 'all'
                    ? 'bg-[#24211E] text-white'
                    : 'bg-white text-[#5C534B] border border-[#EADBCC] hover:bg-[#EFE9DF]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedDietary('Vegetarian')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  selectedDietary === 'Vegetarian'
                    ? 'bg-[#24211E] text-white'
                    : 'bg-white text-[#5C534B] border border-[#EADBCC] hover:bg-[#EFE9DF]'
                }`}
              >
                Vegetarian
              </button>
              <button
                onClick={() => setSelectedDietary('Nut-Free')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  selectedDietary === 'Nut-Free'
                    ? 'bg-[#24211E] text-white'
                    : 'bg-white text-[#5C534B] border border-[#EADBCC] hover:bg-[#EFE9DF]'
                }`}
              >
                Nut-Free
              </button>
            </div>

          </div>

        </div>

        {/* Product Cards Grid: 3-column layout adhering strictly to Retail Guidelines */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-[#EADBCC] mt-8 p-8">
            <p className="font-display text-lg text-[#24211E]">No menu items found</p>
            <p className="text-xs text-[#7A6E63] mt-1">Try clearing your search query or dietary filters.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedDietary('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-[#B85D19] bg-[#FAF7F2] border border-[#EADBCC] rounded-lg hover:bg-[#EFE9DF]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {filteredItems.map((item) => {
              const isAdded = quickAddedId === item.id;

              return (
                <article
                  key={item.id}
                  className="group bg-white rounded-2xl border border-[#EADBCC] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                >
                  {/* Image takes 65%-70% of upper card on neutral surface */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF7F2] border-b border-[#EADBCC]/60">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Subtle 1-line tag if signature (Anti-slop: max 1 tag, no pill clusters) */}
                    {item.badge && (
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] font-semibold text-[#B85D19] shadow-xs">
                        {item.badge}
                      </div>
                    )}

                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-mono px-2 py-0.5 rounded">
                      {item.prepTime}
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Clean unboxed metadata with subtle typographic separators */}
                      <div className="flex items-center gap-2 text-xs text-[#7A6E63] mb-1.5 font-medium">
                        <span className="uppercase tracking-wider text-[11px]">{item.subCategory || item.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.calories} kcal</span>
                        {item.dietary.length > 0 && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{item.dietary[0]}</span>
                          </>
                        )}
                      </div>

                      {/* Item Name */}
                      <h3 className="font-display text-lg font-bold text-[#24211E] group-hover:text-[#B85D19] transition-colors line-clamp-1">
                        {item.name}
                      </h3>

                      {/* Description */}
                      <p className="mt-2 text-xs text-[#5C534B] leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Price and Action Row */}
                    <div className="mt-5 pt-4 border-t border-[#EADBCC]/70 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] text-[#7A6E63] block">Price</span>
                        <span className="font-mono text-lg font-bold text-[#24211E] tabular-nums">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Customize button */}
                        <button
                          onClick={() => handleOpenCustomize(item)}
                          className="px-3 py-2 text-xs font-medium text-[#5C534B] hover:text-[#24211E] bg-[#FAF7F2] hover:bg-[#EFE9DF] border border-[#EADBCC] rounded-lg transition-colors"
                          title="Add extra toppings & customizations"
                        >
                          Customize
                        </button>

                        {/* Quick Add Button */}
                        <button
                          onClick={() => handleQuickAdd(item)}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                            isAdded
                              ? 'bg-emerald-700 text-white'
                              : 'bg-[#24211E] text-white hover:bg-[#B85D19]'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Interactive Custom Waffle Banner link */}
        <div className="mt-12 bg-white rounded-2xl border border-[#EADBCC] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
          <div>
            <span className="text-xs font-semibold text-[#B85D19] uppercase tracking-wider">Custom Creation</span>
            <h3 className="font-display text-2xl font-bold text-[#24211E] mt-1">Want to design your own waffle masterpiece?</h3>
            <p className="text-xs sm:text-sm text-[#5C534B] mt-1 max-w-xl">
              Choose your dough base, warm Belgian drizzles, fresh seasonal berries, toasted crunches, and artisan chantilly cream.
            </p>
          </div>
          <button
            onClick={onOpenCustomBuilder}
            className="px-5 py-3 text-xs font-semibold text-white bg-[#B85D19] hover:bg-[#9E4D12] rounded-lg shadow-xs transition-colors whitespace-nowrap"
          >
            Open Waffle Customizer
          </button>
        </div>

      </div>

      {/* Item Customization Modal */}
      {selectedItemForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-[#EADBCC] max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#EADBCC] pb-4">
              <div>
                <span className="text-xs text-[#7A6E63] font-medium">Personalize Your Order</span>
                <h3 className="font-display text-xl font-bold text-[#24211E] mt-0.5">
                  {selectedItemForModal.name}
                </h3>
                <p className="font-mono text-sm font-semibold text-[#B85D19] mt-1 tabular-nums">
                  Base Price: ${selectedItemForModal.price.toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => setSelectedItemForModal(null)}
                className="p-1 text-[#7A6E63] hover:text-[#24211E] rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Topping choices */}
            <div className="py-4 space-y-5">
              
              {/* Drizzles */}
              <div>
                <label className="block text-xs font-bold text-[#24211E] uppercase tracking-wider mb-2">
                  Warm Drizzle Add-ons
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {DRIZZLE_OPTIONS.slice(0, 4).map((drizzle) => {
                    const isSelected = modalToppings.some((t) => t.id === drizzle.id);
                    return (
                      <button
                        key={drizzle.id}
                        type="button"
                        onClick={() => toggleModalTopping(drizzle)}
                        className={`p-2.5 text-left rounded-lg border text-xs flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'border-[#B85D19] bg-[#FBF5EE] text-[#24211E] font-medium'
                            : 'border-[#EADBCC] hover:bg-[#FAF7F2] text-[#5C534B]'
                        }`}
                      >
                        <span className="truncate pr-1">{drizzle.name}</span>
                        <span className="font-mono text-[#7A6E63] tabular-nums shrink-0">
                          +${drizzle.price.toFixed(2)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Fresh Fruit Add-ons */}
              <div>
                <label className="block text-xs font-bold text-[#24211E] uppercase tracking-wider mb-2">
                  Fresh Farm Berries & Fruit
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {FRUIT_OPTIONS.map((fruit) => {
                    const isSelected = modalToppings.some((t) => t.id === fruit.id);
                    return (
                      <button
                        key={fruit.id}
                        type="button"
                        onClick={() => toggleModalTopping(fruit)}
                        className={`p-2.5 text-left rounded-lg border text-xs flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'border-[#B85D19] bg-[#FBF5EE] text-[#24211E] font-medium'
                            : 'border-[#EADBCC] hover:bg-[#FAF7F2] text-[#5C534B]'
                        }`}
                      >
                        <span className="truncate pr-1">{fruit.name}</span>
                        <span className="font-mono text-[#7A6E63] tabular-nums shrink-0">
                          +${fruit.price.toFixed(2)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Creams & Gelato */}
              <div>
                <label className="block text-xs font-bold text-[#24211E] uppercase tracking-wider mb-2">
                  Whipped Creams & Gelato
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CREAM_OPTIONS.slice(0, 3).map((cream) => {
                    const isSelected = modalToppings.some((t) => t.id === cream.id);
                    return (
                      <button
                        key={cream.id}
                        type="button"
                        onClick={() => toggleModalTopping(cream)}
                        className={`p-2.5 text-left rounded-lg border text-xs flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'border-[#B85D19] bg-[#FBF5EE] text-[#24211E] font-medium'
                            : 'border-[#EADBCC] hover:bg-[#FAF7F2] text-[#5C534B]'
                        }`}
                      >
                        <span className="truncate pr-1">{cream.name}</span>
                        <span className="font-mono text-[#7A6E63] tabular-nums shrink-0">
                          +${cream.price.toFixed(2)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Special notes */}
              <div>
                <label className="block text-xs font-bold text-[#24211E] uppercase tracking-wider mb-1.5">
                  Special Preparation Notes
                </label>
                <input
                  type="text"
                  placeholder="e.g. Extra crispy, syrup on side, allergy note..."
                  value={modalNotes}
                  onChange={(e) => setModalNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#EADBCC] rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#B85D19]"
                />
              </div>

            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-[#EADBCC] flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#7A6E63] block">Item Total</span>
                <span className="font-mono text-xl font-bold text-[#24211E] tabular-nums">
                  ${modalGrandTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedItemForModal(null)}
                  className="px-4 py-2 text-xs font-semibold text-[#5C534B] hover:text-[#24211E] bg-[#EFE9DF] rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmModalAdd}
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#24211E] hover:bg-[#B85D19] rounded-lg shadow-sm transition-colors"
                >
                  Add to Order
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
