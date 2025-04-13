import React, { useState } from 'react';
import { Customer } from '@/types/customer';
import CustomerForm, { CustomerFormData } from '@/components/Customer/CustomerForm';

// 고객 수정 폼 컴포넌트
type CustomerEditFormProps = {
  customer: Customer;
  onCancel: () => void;
  onSuccess: () => void;
};

export default function CustomerEditForm({ customer, onCancel, onSuccess }: CustomerEditFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: CustomerFormData) => {
    if (!formData.customer_name.trim()) {
      setError('고객명은 필수 항목입니다');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const response = await fetch(`/api/customers/${customer.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '고객 정보 수정에 실패했습니다');
      }

      onSuccess();
    } catch (err) {
      console.error('Error updating customer:', err);
      setError(err instanceof Error ? err.message : '고객 정보 수정에 실패했습니다');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CustomerForm
      initialData={customer}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      error={error}
      title="고객 정보 수정"
      submitButtonText="저장하기"
    />
  );
} 