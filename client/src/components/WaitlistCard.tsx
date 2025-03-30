import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { emailSchema } from '@shared/schema';
import { useMutation } from '@tanstack/react-query';
import { addToWaitlist } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import KledeLogo from './KledeLogo';
import { z } from 'zod';
import { CheckCircle } from 'lucide-react';

type EmailFormValues = z.infer<typeof emailSchema>;

const WaitlistCard: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
  } = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    }
  });
  
  const mutation = useMutation({
    mutationFn: (data: EmailFormValues) => {
      return addToWaitlist(data.email);
    },
    onSuccess: () => {
      setIsSuccess(true);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to join waitlist. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  const onSubmit = (data: EmailFormValues) => {
    mutation.mutate(data);
  };
  
  return (
    <div className="w-full max-w-md bg-transparent">
      <KledeLogo />
      
      {!isSuccess ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
          <h1 className="text-center text-2xl font-medium text-white mb-6">
            Join the waitlist for exclusive access to our upcoming collection
          </h1>
          
          <div>
            <div className="relative">
              <input 
                type="email" 
                className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-white focus:border-transparent outline-none transition-all`}
                placeholder="Enter your email"
                {...register('email')}
                disabled={mutation.isPending}
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-white text-black py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black disabled:opacity-70"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <span className="flex justify-center space-x-1">
                <span className="loading-dot w-1.5 h-1.5 bg-black rounded-full"></span>
                <span className="loading-dot w-1.5 h-1.5 bg-black rounded-full"></span>
                <span className="loading-dot w-1.5 h-1.5 bg-black rounded-full"></span>
              </span>
            ) : (
              "Join Waitlist"
            )}
          </button>
        </form>
      ) : (
        <div className="text-center py-4 animate-fade-in mt-8">
          <CheckCircle className="mx-auto h-12 w-12 text-green-400" />
          <h2 className="mt-3 text-xl font-medium text-white">You're on the list!</h2>
          <p className="mt-2 text-gray-300">We'll notify you when we launch.</p>
        </div>
      )}
    </div>
  );
};

export default WaitlistCard;
