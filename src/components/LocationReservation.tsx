import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Calendar, Check, Users, Sparkles, Download } from 'lucide-react';
import { CAFE_INFO } from '../data/menuData';
import { ReservationData } from '../types/waffle';

interface LocationReservationProps {
  onReservationComplete?: (res: ReservationData) => void;
}

export const LocationReservation: React.FC<LocationReservationProps> = ({
  onReservationComplete,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '10:30 AM',
    guests: 2,
    seatingArea: 'cozy-indoor' as 'cozy-indoor' | 'sunlit-patio' | 'chef-counter',
    specialNotes: '',
  });

  const [confirmedReservation, setConfirmedReservation] = useState<ReservationData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newRes: ReservationData = {
        id: `MG-RES-${Math.floor(1000 + Math.random() * 9000)}`,
        guestName: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        guests: formData.guests,
        seatingArea: formData.seatingArea,
        specialNotes: formData.specialNotes,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };

      setConfirmedReservation(newRes);
      setIsSubmitting(false);
      if (onReservationComplete) {
        onReservationComplete(newRes);
      }
    }, 600);
  };

  const handleResetForm = () => {
    setConfirmedReservation(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: new Date().toISOString().split('T')[0],
      time: '10:30 AM',
      guests: 2,
      seatingArea: 'cozy-indoor',
      specialNotes: '',
    });
  };

  return (
    <section id="location" className="py-16 sm:py-24 bg-[#F5EFE6] border-t border-[#EADBCC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs text-[#7A6E63] font-medium mb-2">
            <span>Bakery Counter & Cafe</span>
            <span aria-hidden="true">·</span>
            <span>Table Reservations</span>
            <span aria-hidden="true">·</span>
            <span>Walk-ins Always Welcome</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#24211E] tracking-tight">
            Visit Our Bakery or Reserve a Table
          </h2>
          <p className="mt-2 text-base text-[#5C534B]">
            Stop by for freshly pressed takeaway waffles and craft espresso, or reserve a table for our weekend Belgian brunch.
          </p>
        </div>

        {/* 2-Column Split: Info & Reservation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Hours, Location & Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address & Contact Box */}
            <div className="bg-white rounded-2xl border border-[#EADBCC] p-6 shadow-xs space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#FAF7F2] text-[#B85D19] border border-[#EADBCC]/60 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-[#24211E] text-base">Flagship Waffle House</h3>
                  <p className="text-xs text-[#5C534B] mt-1 leading-relaxed">
                    {CAFE_INFO.address}
                  </p>
                  <p className="text-[11px] text-[#7A6E63] mt-1">
                    Validated parking garage on Market St · 2 mins from Metro Central
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-[#EADBCC]/70">
                <div className="p-2 rounded-lg bg-[#FAF7F2] text-[#B85D19] border border-[#EADBCC]/60 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-[#24211E] text-xs">Direct Line & Catering Orders</h4>
                  <p className="text-xs font-mono text-[#5C534B] mt-0.5">{CAFE_INFO.phone}</p>
                  <p className="text-xs text-[#7A6E63]">{CAFE_INFO.email}</p>
                </div>
              </div>
            </div>

            {/* Operating Hours Box */}
            <div className="bg-white rounded-2xl border border-[#EADBCC] p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-4 text-[#24211E] font-display font-bold text-base">
                <Clock className="w-4 h-4 text-[#B85D19]" />
                <span>Bakery & Oven Hours</span>
              </div>

              <div className="space-y-3 text-xs">
                {CAFE_INFO.hours.map((schedule, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1.5 border-b border-[#EADBCC]/50 last:border-none">
                    <span className="text-[#5C534B] font-medium">{schedule.days}</span>
                    <span className="font-mono text-[#24211E] font-semibold tabular-nums">{schedule.time}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-[#EADBCC] flex items-center gap-2 text-xs text-[#7A6E63]">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Currently Open & Baking Fresh Batches</span>
              </div>
            </div>

            {/* Quick Cafe Etiquette Note */}
            <div className="p-4 rounded-xl bg-[#EFE9DF] border border-[#EADBCC] text-xs text-[#5C534B]">
              <span className="font-semibold text-[#24211E] block mb-1">Bakery Note:</span>
              Takeaway orders can also be placed directly at our walk-up bronze counter window. For weekend brunch parties over 6, reservations are highly recommended.
            </div>

          </div>

          {/* Right Column: Table Reservation Form or Confirmation Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-[#EADBCC] p-6 sm:p-8 shadow-md">
              
              {confirmedReservation ? (
                /* Reservation Success Pass */
                <div className="space-y-6 text-center py-4">
                  <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-800 mx-auto">
                    <Check className="w-7 h-7" />
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                      Reservation Confirmed
                    </span>
                    <h3 className="font-display text-2xl font-bold text-[#24211E] mt-1">
                      We'll have a table waiting for you, {confirmedReservation.guestName}!
                    </h3>
                    <p className="text-xs text-[#7A6E63] mt-1 font-mono">
                      Booking Reference: {confirmedReservation.id}
                    </p>
                  </div>

                  {/* Summary ticket */}
                  <div className="bg-[#FAF7F2] border border-[#EADBCC] rounded-xl p-5 text-left text-xs space-y-2 max-w-md mx-auto">
                    <div className="flex justify-between">
                      <span className="text-[#7A6E63]">Date & Time:</span>
                      <span className="font-semibold text-[#24211E] font-mono tabular-nums">
                        {confirmedReservation.date} at {confirmedReservation.time}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A6E63]">Party Size:</span>
                      <span className="font-semibold text-[#24211E]">
                        {confirmedReservation.guests} {confirmedReservation.guests === 1 ? 'Guest' : 'Guests'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A6E63]">Seating Area:</span>
                      <span className="font-semibold text-[#24211E] capitalize">
                        {confirmedReservation.seatingArea.replace('-', ' ')}
                      </span>
                    </div>
                    {confirmedReservation.specialNotes && (
                      <div className="flex justify-between pt-2 border-t border-[#EADBCC]/60">
                        <span className="text-[#7A6E63]">Notes:</span>
                        <span className="text-[#5C534B] italic">{confirmedReservation.specialNotes}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-[#5C534B] max-w-sm mx-auto">
                    A confirmation SMS & calendar invite have been sent to {confirmedReservation.phone}.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => alert(`Calendar event added for ${confirmedReservation.date} at ${confirmedReservation.time}`)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-[#24211E] hover:bg-[#38332F] rounded-lg shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Add to Calendar (.ics)</span>
                    </button>
                    <button
                      onClick={handleResetForm}
                      className="px-4 py-2.5 text-xs font-medium text-[#5C534B] hover:text-[#24211E] bg-[#FAF7F2] border border-[#EADBCC] rounded-lg"
                    >
                      Book Another Table
                    </button>
                  </div>
                </div>
              ) : (
                /* Reservation Input Form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-[#EADBCC] pb-4">
                    <h3 className="font-display text-xl font-bold text-[#24211E]">
                      Table Reservation Request
                    </h3>
                    <p className="text-xs text-[#7A6E63] mt-1">
                      No deposit required. Instant confirmation for breakfast, brunch, or dessert sittings.
                    </p>
                  </div>

                  {/* Name and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#24211E] uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Camille Laurent"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#EADBCC] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B85D19]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#24211E] uppercase tracking-wider mb-1">
                        Mobile Phone (for SMS status) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#EADBCC] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B85D19]"
                      />
                    </div>
                  </div>

                  {/* Email & Guests */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#24211E] uppercase tracking-wider mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="camille@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#EADBCC] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B85D19]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#24211E] uppercase tracking-wider mb-1">
                        Number of Guests
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#EADBCC] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B85D19]"
                      >
                        <option value="1">1 Person (Solo Counter)</option>
                        <option value="2">2 Guests (Table for Two)</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests (Family Table)</option>
                        <option value="5">5 Guests</option>
                        <option value="6">6 Guests</option>
                        <option value="8">8+ Guests (Celebration)</option>
                      </select>
                    </div>
                  </div>

                  {/* Date & Time slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#24211E] uppercase tracking-wider mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#EADBCC] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B85D19]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#24211E] uppercase tracking-wider mb-1">
                        Preferred Sitting Time
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#EADBCC] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B85D19]"
                      >
                        <option value="08:30 AM">08:30 AM (Early Baker's Rise)</option>
                        <option value="09:30 AM">09:30 AM (Morning Coffee)</option>
                        <option value="10:30 AM">10:30 AM (Peak Brunch)</option>
                        <option value="11:30 AM">11:30 AM (Peak Brunch)</option>
                        <option value="01:00 PM">01:00 PM (Afternoon Sweet)</option>
                        <option value="02:30 PM">02:30 PM (Tea & Waffle Hour)</option>
                        <option value="04:00 PM">04:00 PM (Late Afternoon)</option>
                        <option value="05:30 PM">05:30 PM (Evening Savor)</option>
                      </select>
                    </div>
                  </div>

                  {/* Seating preference */}
                  <div>
                    <label className="block text-xs font-semibold text-[#24211E] uppercase tracking-wider mb-2">
                      Seating Preference
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, seatingArea: 'cozy-indoor' })}
                        className={`p-2.5 text-xs rounded-lg border text-center transition-colors ${
                          formData.seatingArea === 'cozy-indoor'
                            ? 'border-[#B85D19] bg-[#FBF5EE] text-[#24211E] font-semibold'
                            : 'border-[#EADBCC] bg-[#FAF7F2] text-[#5C534B]'
                        }`}
                      >
                        Cozy Indoor
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, seatingArea: 'sunlit-patio' })}
                        className={`p-2.5 text-xs rounded-lg border text-center transition-colors ${
                          formData.seatingArea === 'sunlit-patio'
                            ? 'border-[#B85D19] bg-[#FBF5EE] text-[#24211E] font-semibold'
                            : 'border-[#EADBCC] bg-[#FAF7F2] text-[#5C534B]'
                        }`}
                      >
                        Sunlit Patio
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, seatingArea: 'chef-counter' })}
                        className={`p-2.5 text-xs rounded-lg border text-center transition-colors ${
                          formData.seatingArea === 'chef-counter'
                            ? 'border-[#B85D19] bg-[#FBF5EE] text-[#24211E] font-semibold'
                            : 'border-[#EADBCC] bg-[#FAF7F2] text-[#5C534B]'
                        }`}
                      >
                        Iron Counter
                      </button>
                    </div>
                  </div>

                  {/* Special requests */}
                  <div>
                    <label className="block text-xs font-semibold text-[#24211E] uppercase tracking-wider mb-1">
                      Dietary Notes or Celebrations (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Birthday celebration, gluten sensitivity, high chair needed..."
                      value={formData.specialNotes}
                      onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#EADBCC] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B85D19]"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-4 text-xs font-semibold text-white bg-[#24211E] hover:bg-[#B85D19] rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>Reserving Table...</span>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4 text-[#F5C28C]" />
                          <span>Confirm Table Reservation</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
