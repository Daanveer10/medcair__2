import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, PhoneOff, Pause as PhonePause, PhoneForwarded, User } from 'lucide-react';
import { Button } from './ui/button';
import StatusBadge from './ui/status-badge';

const CallCard = ({ call, onAnswer, onHold, onTransfer, onEnd }) => {
  const [duration, setDuration] = useState(call.duration || 0);

  useEffect(() => {
    let interval;
    if (call.status === 'connected') {
      interval = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [call.status]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50 hover:border-teal-500/50 transition-all duration-300 shadow-lg"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-teal-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{call.patientName}</h3>
            <p className="text-sm text-gray-400">{call.phone}</p>
          </div>
        </div>
        <StatusBadge status={call.status} />
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl font-mono text-teal-400">{formatDuration(duration)}</span>
        <span className="text-sm text-gray-400">
          {new Date(call.timestamp).toLocaleTimeString()}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {call.status === 'ringing' && (
          <>
            <Button
              onClick={() => onAnswer(call)}
              className="bg-green-500 hover:bg-green-600"
            >
              <Phone className="w-4 h-4 mr-2" />
              Answer
            </Button>
            <Button
              onClick={() => onEnd(call)}
              variant="destructive"
            >
              <PhoneOff className="w-4 h-4 mr-2" />
              Decline
            </Button>
          </>
        )}
        {call.status === 'connected' && (
          <>
            <Button
              onClick={() => onHold(call)}
              variant="outline"
              className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/10"
            >
              <PhonePause className="w-4 h-4 mr-2" />
              Hold
            </Button>
            <Button
              onClick={() => onTransfer(call)}
              variant="outline"
              className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
            >
              <PhoneForwarded className="w-4 h-4 mr-2" />
              Transfer
            </Button>
            <Button
              onClick={() => onEnd(call)}
              variant="destructive"
              className="col-span-2"
            >
              <PhoneOff className="w-4 h-4 mr-2" />
              End Call
            </Button>
          </>
        )}
        {call.status === 'on hold' && (
          <>
            <Button
              onClick={() => onAnswer(call)}
              className="bg-green-500 hover:bg-green-600"
            >
              <Phone className="w-4 h-4 mr-2" />
              Resume
            </Button>
            <Button
              onClick={() => onEnd(call)}
              variant="destructive"
            >
              <PhoneOff className="w-4 h-4 mr-2" />
              End Call
            </Button>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default CallCard;
