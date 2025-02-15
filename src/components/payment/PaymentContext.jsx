import React, { createContext, useContext, useState } from 'react';

// Define the initial payment state
const initialPaymentState = {
  currentPlan: null,
  trialEndsAt: null
};

// Create the PaymentContext
const PaymentContext = createContext(null);

// Create the PaymentProvider component
export const PaymentProvider = ({ children }) => {
  const [paymentState, setPaymentState] = useState(initialPaymentState);

  const startTrial = async () => {
    const trialEnd = new Date();
    trialEnd.setDate(trialEnd.getDate() + 30);

    setPaymentState({
      currentPlan: 'trial',
      trialEndsAt: trialEnd
    });
  };

  const upgradePlan = async (plan) => {
    setPaymentState({
      currentPlan: plan,
      trialEndsAt: null
    });
  };

  const cancelSubscription = async () => {
    setPaymentState({
      currentPlan: null,
      trialEndsAt: null
    });
  };

  return React.createElement(
    PaymentContext.Provider,
    { value: { ...paymentState, startTrial, upgradePlan, cancelSubscription } },
    children
  );
};

// Custom hook to use the PaymentContext
export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};
