// 고객 정보 타입 정의
import { CustomerTier } from './tierColors';

export interface Customer {
  id: string;
  customer_name: string;
  email?: string;
  phone?: string;
  mobile?: string;
  address?: string;
  company?: string;
  position?: string;
  tier?: CustomerTier;
  comment?: string;
  address_company?: string;
  lat?: string;
  lng?: string;
  lat_company?: string;
  lng_company?: string;
  created_at: string;
  updated_at: string;
} 