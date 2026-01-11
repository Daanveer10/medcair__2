import React from 'react';
import { cn } from '@/lib/utils';

const StatusBadge = ({ status, className }) => {
  const getStatusStyles = () => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'cancelled':
      case 'ended':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
      case 'urgent':
      case 'high':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'completed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'ringing':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/50 animate-pulse';
      case 'connected':
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'on hold':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'medium':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'low':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border transition-all',
        getStatusStyles(),
        className
      )}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
