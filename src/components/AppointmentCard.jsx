import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, FileText, Edit, Check, X, Trash } from 'lucide-react';
import { Button } from './ui/button';
import StatusBadge from './ui/status-badge';

const AppointmentCard = ({ appointment, onEdit, onConfirm, onCancel, onComplete, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 shadow-lg"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{appointment.patientName}</h3>
            <StatusBadge status={appointment.status} />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-gray-300">
          <Calendar className="w-4 h-4 text-blue-400" />
          <span className="text-sm">{appointment.date}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-300">
          <Clock className="w-4 h-4 text-teal-400" />
          <span className="text-sm">{appointment.time}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-300">
          <FileText className="w-4 h-4 text-purple-400" />
          <span className="text-sm">{appointment.reason}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-700">
        {onEdit && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(appointment)}
            className="flex-1 hover:bg-blue-500/10 hover:text-blue-400"
          >
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Button>
        )}
        {onConfirm && appointment.status !== 'confirmed' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onConfirm(appointment)}
            className="flex-1 hover:bg-green-500/10 hover:text-green-400"
          >
            <Check className="w-4 h-4 mr-1" />
            Confirm
          </Button>
        )}
        {onComplete && appointment.status !== 'completed' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onComplete(appointment)}
            className="flex-1 hover:bg-blue-500/10 hover:text-blue-400"
          >
            <Check className="w-4 h-4 mr-1" />
            Complete
          </Button>
        )}
        {onCancel && appointment.status !== 'cancelled' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCancel(appointment)}
            className="flex-1 hover:bg-red-500/10 hover:text-red-400"
          >
            <X className="w-4 h-4 mr-1" />
            Cancel
          </Button>
        )}
        {onDelete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(appointment)}
            className="hover:bg-red-500/10 hover:text-red-400"
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default AppointmentCard;
