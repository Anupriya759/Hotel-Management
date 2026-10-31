import React from 'react';
import { useHotel } from '../../context/HotelContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toastMessage, setToastMessage } = useHotel();

  if (!toastMessage) return null;

  const isSuccess = toastMessage.type === 'success';
  const isWarning = toastMessage.type === 'warning';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-in slide-in-from-bottom-5 duration-200">
      <div className={`p-4 rounded-2xl shadow-2xl border flex items-start gap-3 backdrop-blur-md ${
        isSuccess
          ? 'bg-slate-900/95 border-emerald-500/50 text-white'
          : isWarning
          ? 'bg-slate-900/95 border-amber-500/50 text-white'
          : 'bg-slate-900/95 border-blue-500/50 text-white'
      }`}>
        <div className="mt-0.5 shrink-0">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          {isWarning && <AlertTriangle className="w-5 h-5 text-amber-400" />}
          {!isSuccess && !isWarning && <Info className="w-5 h-5 text-blue-400" />}
        </div>
        <div className="flex-1 pr-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {isSuccess ? 'Success Notification' : isWarning ? 'System Notice' : 'PMS Activity'}
          </p>
          <p className="text-sm font-medium text-slate-100 mt-0.5">{toastMessage.message}</p>
        </div>
        <button
          onClick={() => setToastMessage(null)}
          className="text-slate-400 hover:text-white p-1 rounded-lg transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
