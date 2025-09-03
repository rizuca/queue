import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function StaticArrayQueue() {
  const MAX_SIZE = 5;
  const [queue, setQueue] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [front, setFront] = useState(0);
  const [rear, setRear] = useState(-1);

  const enqueue = () => {
    if (inputValue.trim() === '') return;
    const value = parseInt(inputValue);
    if (isNaN(value)) return;
    
    if (queue.length >= MAX_SIZE) {
      alert('Queue is full!');
      return;
    }
    
    const newQueue = [...queue, value];
    setQueue(newQueue);
    setRear(rear + 1);
    setInputValue('');
  };

  const dequeue = () => {
    if (queue.length === 0) {
      alert('Queue is empty!');
      return;
    }
    
    const newQueue = queue.slice(1);
    setQueue(newQueue);
    if (newQueue.length === 0) {
      setFront(0);
      setRear(-1);
    }
  };

  const reset = () => {
    setQueue([]);
    setFront(0);
    setRear(-1);
    setInputValue('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Static Array Queue</CardTitle>
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
          <Button onClick={enqueue} disabled={queue.length >= MAX_SIZE}>
            Enqueue
          </Button>
          <Button onClick={dequeue} disabled={queue.length === 0}>
            Dequeue
          </Button>
          <Button onClick={reset} variant="outline">
            Reset
          </Button>
        </div>
        
        <div className="space-y-2">
          <p>Queue Size: {queue.length}/{MAX_SIZE}</p>
          <p>Front Index: {queue.length > 0 ? front : 'N/A'}</p>
          <p>Rear Index: {queue.length > 0 ? rear : 'N/A'}</p>
        </div>

        <div className="border rounded-lg p-4">
          <p className="mb-2">Queue (FIFO - First In, First Out):</p>
          <div className="flex gap-1 min-h-[60px] items-center">
            {Array.from({ length: MAX_SIZE }, (_, index) => (
              <div
                key={index}
                className={`w-12 h-12 border-2 rounded flex items-center justify-center ${
                  index < queue.length
                    ? 'bg-blue-100 border-blue-300'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                {index < queue.length ? queue[index] : ''}
              </div>
            ))}
          </div>
          <div className="flex gap-1 mt-1">
            {Array.from({ length: MAX_SIZE }, (_, index) => (
              <div key={index} className="w-12 text-center text-xs text-gray-500">
                [{index}]
              </div>
            ))}
          </div>
        </div>

        <div className="text-sm space-y-1">
          <p><strong>Cara Kerja:</strong></p>
          <p>• Enqueue: Menambah elemen di belakang (rear)</p>
          <p>• Dequeue: Menghapus elemen di depan (front)</p>
          <p>• FIFO: Yang pertama masuk, pertama keluar</p>
        </div>
      </CardContent>
    </Card>
  );
}