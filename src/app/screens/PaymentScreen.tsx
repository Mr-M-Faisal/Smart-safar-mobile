import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AppLayout } from '../components/AppLayout';
import { ArrowLeft, Check, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';

export function PaymentScreen() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('easypaisa');
  
  const paymentMethods = [
    {
      id: 'easypaisa',
      name: 'EasyPaisa',
      logo: '💳',
      description: 'Pay using EasyPaisa wallet'
    },
    {
      id: 'jazzcash',
      name: 'JazzCash',
      logo: '📱',
      description: 'Pay using JazzCash wallet'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      logo: '🏦',
      description: 'Direct bank transfer'
    }
  ];
  
  return (
    <AppLayout showBottomNav={false}>
      {/* Header */}
      <div className="bg-[#0F6E56] px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/seat-booking')} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white font-semibold text-lg">Payment</h1>
          <div className="w-6" />
        </div>
      </div>
      
      <div className="p-6">
        {/* Booking Summary */}
        <div className="bg-[#F4F4F2] rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Booking Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Route</span>
              <span className="font-medium">Route 4 (D-Ground → Satiana)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Seat</span>
              <span className="font-medium">B-7 (Window)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Bus</span>
              <span className="font-medium">4-B</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Departure</span>
              <span className="font-medium">Today, 9:00 AM</span>
            </div>
          </div>
        </div>
        
        {/* Payment Methods */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Select Payment Method</h3>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full p-4 rounded-xl border-2 transition-all ${
                  selectedMethod === method.id
                    ? 'border-[#0F6E56] bg-[#0F6E56]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{method.logo}</div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-900">{method.name}</p>
                    <p className="text-xs text-gray-500">{method.description}</p>
                  </div>
                  {selectedMethod === method.id && (
                    <div className="w-6 h-6 bg-[#0F6E56] rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Amount Breakdown */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Amount Breakdown</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Ticket Price</span>
              <span className="font-medium">PKR 950</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Service Fee</span>
              <span className="font-medium">PKR 20</span>
            </div>
            <div className="border-t border-gray-200 my-2" />
            <div className="flex justify-between">
              <span className="font-semibold text-gray-900">Total Amount</span>
              <span className="font-bold text-xl text-[#0F6E56]">PKR 970</span>
            </div>
          </div>
        </div>
        
        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 text-gray-500 mb-6">
          <Shield className="w-4 h-4" />
          <span className="text-xs">Secure payment powered by 256-bit SSL encryption</span>
        </div>
        
        {/* Pay Button */}
        <Button
          onClick={() => navigate('/confirmation')}
          className="w-full bg-[#0F6E56] hover:bg-[#0F6E56]/90 text-white rounded-xl h-12"
        >
          Pay PKR 970 Now
        </Button>
        
        <p className="text-xs text-center text-gray-500 mt-4">
          By proceeding, you agree to our Terms & Conditions
        </p>
      </div>
    </AppLayout>
  );
}
