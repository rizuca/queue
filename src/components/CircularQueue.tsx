import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function CircularQueue() {
  const MAX_SIZE = 6;
  const [queue, setQueue] = useState<(number | null)[]>(Array(MAX_SIZE).fill(null));
  const [front, setFront] = useState(0);
  const [rear, setRear] = useState(-1);
  const [size, setSize] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const enqueue = () => {
    if (inputValue.trim() === '') return;
    const value = parseInt(inputValue);
    if (isNaN(value)) return;
    
    if (size >= MAX_SIZE) {
      alert('Queue is full!');
      return;
    }
    
    const newRear = (rear + 1) % MAX_SIZE;
    const newQueue = [...queue];
    newQueue[newRear] = value;
    
    setQueue(newQueue);
    setRear(newRear);
    setSize(size + 1);
    setInputValue('');
  };

  const dequeue = () => {
    if (size === 0) {
      alert('Queue is empty!');
      return;
    }
    
    const newQueue = [...queue];
    newQueue[front] = null;
    
    setQueue(newQueue);
    setFront((front + 1) % MAX_SIZE);
    setSize(size - 1);
  };

  const reset = () => {
    setQueue(Array(MAX_SIZE).fill(null));
    setFront(0);
    setRear(-1);
    setSize(0);
    setInputValue('');
  };

  const isFull = () => size >= MAX_SIZE;
  const isEmpty = () => size === 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Circular Queue</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter number"
            onKeyDown={(e) => e.key === 'Enter' && enqueue()}
          />
          <Button onClick={enqueue} disabled={isFull()}>
            Enqueue
          </Button>
          <Button onClick={dequeue} disabled={isEmpty()}>
            Dequeue
          </Button>
          <Button onClick={reset} variant="outline">
            Reset
          </Button>
        </div>
        
        <div className="space-y-2">
          <p>Queue Size: {size}/{MAX_SIZE}</p>
          <p>Front Index: {isEmpty() ? 'N/A' : front}</p>
          <p>Rear Index: {isEmpty() ? 'N/A' : rear}</p>
          <p>Status: {isEmpty() ? 'Empty' : isFull() ? 'Full' : 'Active'}</p>
        </div>

        <div className="border rounded-lg p-4">
          <p className="mb-2">Circular Queue (FIFO):</p>
          
          {/* Linear View */}
          <div className="mb-6">
            <p className="text-sm mb-2">Linear View:</p>
            <div className="flex gap-1 justify-center">
              {Array.from({ length: MAX_SIZE }, (_, index) => (
                <div
                  key={index}
                  className={`w-14 h-14 border-2 rounded flex flex-col items-center justify-center ${
                    queue[index] !== null
                      ? 'bg-purple-100 border-purple-300'
                      : 'bg-gray-50 border-gray-200'
                  } ${
                    index === front && !isEmpty() ? 'ring-4 ring-blue-300' : ''
                  } ${
                    index === rear && !isEmpty() ? 'ring-4 ring-red-300' : ''
                  }`}
                >
                  <div className="font-bold">{queue[index] ?? ''}</div>
                  <div className="text-xs">[{index}]</div>
                </div>
              ))}
            </div>
          </div>

          {/* Circular View */}
          <div className="relative flex justify-center">
            <p className="text-sm mb-2 absolute -top-6">Circular View:</p>
            <div className="relative w-48 h-48">
              {/* Circle positions - arranged clockwise starting from top */}
              {Array.from({ length: MAX_SIZE }, (_, index) => {
                const angle = (index * 60) - 90; // Start from top, 60 degrees apart
                const radian = (angle * Math.PI) / 180;
                const radius = 80;
                const x = Math.cos(radian) * radius + 96; // 96 = half of container width
                const y = Math.sin(radian) * radius + 96; // 96 = half of container height
                
                return (
                  <div
                    key={index}
                    className={`absolute w-16 h-16 border-2 rounded-full flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 ${
                      queue[index] !== null
                        ? 'bg-purple-100 border-purple-300'
                        : 'bg-gray-50 border-gray-200'
                    } ${
                      index === front && !isEmpty() ? 'ring-4 ring-blue-300' : ''
                    } ${
                      index === rear && !isEmpty() ? 'ring-4 ring-red-300' : ''
                    }`}
                    style={{
                      left: `${x}px`,
                      top: `${y}px`,
                    }}
                  >
                    <div className="font-bold">{queue[index] ?? ''}</div>
                    <div className="text-xs">[{index}]</div>
                  </div>
                );
              })}
              
              {/* Center indicator */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-xs text-gray-500">Circular</div>
                <div className="text-xs text-gray-500">Queue</div>
              </div>
              
              {/* Arrow showing direction */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg width="120" height="120" className="absolute -top-15 -left-15">
                  <defs>
                    <marker
                      id="arrowhead"
                      markerWidth="10"
                      markerHeight="7"
                      refX="9"
                      refY="3.5"
                      orient="auto"
                    >
                      <polygon
                        points="0 0, 10 3.5, 0 7"
                        fill="#9CA3AF"
                      />
                    </marker>
                  </defs>
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#9CA3AF"
                    strokeWidth="1"
                    strokeDasharray="4,4"
                    markerEnd="url(#arrowhead)"
                    className="opacity-50"
                  />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-full ring-4 ring-blue-300"></div>
              <span>Front Pointer</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-full ring-4 ring-red-300"></div>
              <span>Rear Pointer</span>
            </div>
          </div>
        </div>

        <div className="text-sm space-y-1">
          <p><strong>Cara Kerja:</strong></p>
          <p>• Array melingkar: setelah index terakhir kembali ke index 0</p>
          <p>• Enqueue: rear = (rear + 1) % MAX_SIZE</p>
          <p>• Dequeue: front = (front + 1) % MAX_SIZE</p>
          <p>• Efisien dalam penggunaan memory</p>
        </div>
      </CardContent>
    </Card>
  );
}