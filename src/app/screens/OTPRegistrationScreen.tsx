import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AppLayout } from '../components/AppLayout';
import { ArrowLeft, Phone } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../components/ui/input-otp';

export function OTPRegistrationScreen() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(45);
  
  const handlePhoneSubmit = () => {
    if (phoneNumber.length >= 10) {
      setStep('otp');
      // Start countdown
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };
  
  const handleOTPVerify = () => {
    if (otp.length === 4) {
      navigate('/profile');
    }
  };
  
  return (
    <AppLayout showBottomNav={false}>
      <div className="min-h-[calc(100vh-11rem)]">
        {/* Header */}
        <div className="bg-[#0F6E56] px-4 py-4">
          <button onClick={() => step === 'otp' ? setStep('phone') : navigate('/home')} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 flex flex-col min-h-[calc(100vh-11rem-4rem)]">
          {step === 'phone' ? (
            <>
              {/* Phone Step */}
              <div className="flex-1">
                <div className="mb-8 mt-8">
                  <div className="bg-[#0F6E56]/10 rounded-full p-6 w-20 h-20 flex items-center justify-center mb-6">
                    <Phone className="w-10 h-10 text-[#0F6E56]" />
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">
                    Welcome to smartSafar
                  </h1>
                  <p className="text-gray-600">
                    Enter your mobile number to get started
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number
                    </label>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-2 bg-[#F4F4F2] px-4 rounded-xl border-2 border-gray-200">
                        <span className="text-2xl">🇵🇰</span>
                        <span className="font-medium text-gray-700">+92</span>
                      </div>
                      <Input
                        type="tel"
                        placeholder="3XX XXXXXXX"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="flex-1 h-14 text-lg border-2 rounded-xl"
                        maxLength={10}
                      />
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500">
                    We'll send you a verification code to this number
                  </p>
                </div>
              </div>
              
              <Button
                onClick={handlePhoneSubmit}
                disabled={phoneNumber.length < 10}
                className="w-full bg-[#0F6E56] hover:bg-[#0F6E56]/90 text-white rounded-xl h-12 mt-auto"
              >
                Continue
              </Button>
            </>
          ) : (
            <>
              {/* OTP Step */}
              <div className="flex-1">
                <div className="mb-8 mt-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">
                    Verify your number
                  </h1>
                  <p className="text-gray-600">
                    Enter the 4-digit code sent to
                  </p>
                  <p className="text-[#0F6E56] font-semibold">
                    +92 {phoneNumber}
                  </p>
                </div>
                
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Verification Code
                  </label>
                  <InputOTP
                    maxLength={4}
                    value={otp}
                    onChange={setOtp}
                  >
                    <InputOTPGroup className="gap-3">
                      <InputOTPSlot 
                        index={0} 
                        className="w-16 h-16 text-2xl border-2 border-gray-300 rounded-xl"
                      />
                      <InputOTPSlot 
                        index={1} 
                        className="w-16 h-16 text-2xl border-2 border-gray-300 rounded-xl"
                      />
                      <InputOTPSlot 
                        index={2} 
                        className="w-16 h-16 text-2xl border-2 border-gray-300 rounded-xl"
                      />
                      <InputOTPSlot 
                        index={3} 
                        className="w-16 h-16 text-2xl border-2 border-gray-300 rounded-xl"
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                
                <div className="text-center">
                  {countdown > 0 ? (
                    <p className="text-sm text-gray-500">
                      Resend code in{' '}
                      <span className="font-semibold text-[#0F6E56]">
                        0:{countdown.toString().padStart(2, '0')}
                      </span>
                    </p>
                  ) : (
                    <button className="text-sm font-semibold text-[#0F6E56]">
                      Resend Code
                    </button>
                  )}
                </div>
              </div>
              
              <Button
                onClick={handleOTPVerify}
                disabled={otp.length !== 4}
                className="w-full bg-[#0F6E56] hover:bg-[#0F6E56]/90 text-white rounded-xl h-12 mt-auto"
              >
                Verify
              </Button>
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
