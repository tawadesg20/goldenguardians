import React from 'react';
import { Check } from 'lucide-react';

const PricingPlans = () => {
  const plans = [
    {
      name: 'Trial',
      price: 'Free',
      duration: '30 days',
      features: [
        'Basic companionship services',
        '2 visits per week',
        'Emergency support',
        'Basic events access'
      ]
    },
    {
      name: 'Basic',
      price: '₹499',
      duration: 'per month',
      features: [
        'All trial features',
        '4 visits per week',
        'Activity planning',
        '24/7 support line',
        'Priority event booking'
      ]
    },
    {
      name: 'Premium',
      price: '₹999',
      duration: 'per month',
      features: [
        'All basic features',
        'Daily visits available',
        'Specialized activities',
        'Priority matching',
        'Dedicated coordinator',
        'VIP event access'
      ]
    }
  ];

  return (
    <div className="py-12 bg-[#fefae0]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#8B4513] text-center mb-8">
          Choose Your Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div key={plan.name} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-[#8B4513] mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold text-[#8B4513] mb-1">{plan.price}</div>
              <div className="text-[#A0522D] mb-6">{plan.duration}</div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-[#8B4513]">
                    <Check className="w-5 h-5 mr-2 text-[#8B4513]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full py-2 bg-[#8B4513] text-white rounded-md hover:bg-[#A0522D] transition-colors">
                {plan.name === 'Trial' ? 'Start Free Trial' : 'Subscribe Now'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;