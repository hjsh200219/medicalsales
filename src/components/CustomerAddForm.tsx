import React, { useState } from 'react';
import CustomerForm, { CustomerFormData } from './CustomerForm';

// 고객 추가 폼 컴포넌트
type CustomerAddFormProps = {
  onCancel: () => void;
  onSuccess: () => void;
};

export default function CustomerAddForm({ onCancel, onSuccess }: CustomerAddFormProps) {
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

      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '고객 등록에 실패했습니다');
      }

      onSuccess();
    } catch (err) {
      console.error('Error adding customer:', err);
      setError(err instanceof Error ? err.message : '고객 등록에 실패했습니다');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CustomerForm
      onCancel={onCancel}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      error={error}
      title="고객 등록"
      submitButtonText="저장하기"
    />
  );
} 