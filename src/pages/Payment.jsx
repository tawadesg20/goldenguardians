import React from 'react';
import { usePayment } from '../components/payment/PaymentContext';
import PricingPlans from '../components/subscription/PricingPlans';
import Footer from '../components/Footer';

const Payment = () => {
  const { currentPlan, trialEndsAt } = usePayment();

  return (
    <div className="min-h-screen bg-[#faedcd]">
      {/* Current Plan Status */}
      {currentPlan && (
        <div className="bg-white py-4 px-6 mb-8">
          <div className="max-w-7xl mx-auto">
            <p className="text-[#8B4513]">
              Current Plan: <span className="font-semibold capitalize">{currentPlan}</span>
              {trialEndsAt && (
                <span className="ml-2">
                  (Trial ends on {new Date(trialEndsAt).toLocaleDateString()})
                </span>
              )}
            </p>
          </div>
        </div>
      )}

      {/* Pricing Plans */}
      <PricingPlans />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Payment;